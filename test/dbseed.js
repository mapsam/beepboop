'use strict';

const { MongoClient, ObjectID } = require('mongodb');
const moment = require('moment');
const { LoremIpsum } = require('lorem-ipsum');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
}, 'plain', '\n\n');

lorem.generateWords(1);
lorem.generateSentences(5);
lorem.generateParagraphs(7);

const main = async() => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGODB_DB);

    // get user ID from db:main:collection:accounts
    const users = await db.collection('users').find({}).toArray();
    if (!users.length) throw new Error(`Could not find entries in "users" table in ${process.env.MONGODB_URI}`);
    if (users.length > 1) throw new Error('Found more than one user. /test/dbseed.js only works with a single user.');
    console.log(`> seeding data for user ${users[0].name}, id: ${users[0]._id}`);

    // // clear db:main:collection:days
    try {
      await db.collection('days').drop();
    } catch (err) {}

    // // load db:main:collection:days
    await db.createCollection('days');
    const bulk = db.collection('days').initializeUnorderedBulkOp();
    for (let i = 0; i < 365; i++) {
      const d = moment().subtract(i, 'days');
      const day = {
        userId: users[0]._id,
        year: d.year(),
        month: d.month() + 1,
        day: d.date(),
        weekday: d.day(),
        text: lorem.generateParagraphs(2)
      };
      bulk.insert(day);
    }

    console.log(`> adding 365 items to db`);
    await bulk.execute();
    console.log('> done!');
    return;

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();

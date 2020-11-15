import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGODB_URI
} = process.env;

const options = {
  providers: [
    Providers.Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    })
  ],
  database: MONGODB_URI,
  callbacks: {
    session: async (session, user) => {
      session.userId = user.id;
      return Promise.resolve(session)
    }
  }
};

export default (req, res) => NextAuth(req, res, options);
import { daysInMonth, monthName, monthNumbers } from '../utils/date.js';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const DayFilters = props => {
  const router = useRouter();

  const years = [
    '2021',
    '2020',
    // TODO: determine available years by account creation date
  ];

  const d = new Date();
  const [ year, setYear ] = useState(+router.query.year || d.getFullYear());
  const [ month, setMonth ] = useState(+router.query.month || d.getMonth() + 1);
  const [ day, setDay ] = useState(+router.query.day || -1);
  const [ days, setDays ] = useState(daysInMonth(year, month));

  const dayOptions = [];
  for (let d = 1; d <= days; d++) {
    if (day === d) {
      dayOptions.push(<option selected>{d}</option>);
    } else {
      dayOptions.push(<option>{d}</option>);
    }
  }

  function changeYear(e) {
    e.preventDefault();
    setYear(+e.target.value);
    setDays(daysInMonth(+e.target.value, month));
  }

  function changeMonth(e) {
    e.preventDefault();
    setMonth(+e.target.value);
    setDays(daysInMonth(year, +e.target.value));
  }

  function changeDay(e) {
    e.preventDefault();
    setDay(+e.target.value);
  }

  function submitFilters(e) {
    e.preventDefault();

    const comp = new URLSearchParams();
    const q = {};
    if (year > 0) comp.set('year', year);
    if (month > 0) comp.set('month', month);
    if (day > 0) comp.set('day', day);

    // router.push does not work here since
    // the pathname is already /days
    window.location = `/days?${comp.toString()}`;
  }

  return (
    <div className="mb-6 p-2">
      <form>
          <div className="control mb-2">
            <div className="select is-fullwidth">
              <select onChange={changeYear}>
                <option value="-1">All years</option>
                {years.map((y) => {
                  if (y == year) {
                    return <option selected>{y}</option>
                  } else {
                    return <option>{y}</option>
                  }
                })}
              </select>
            </div>
          </div>

          <div className="control mb-2">
            <div
              className="select is-fullwidth">
              <select onChange={changeMonth}>
                <option value="-1">All months</option>
                {monthNumbers.map((m) => {
                  if (m === month) {
                    return <option selected value={m}>{monthName(m)}</option>
                  } else {
                    return <option value={m}>{monthName(m)}</option>
                  }
                })}
              </select>
            </div>
          </div>

          <div className="control mb-2">
            <div
              className="select is-fullwidth">
              <select onChange={changeDay}>
                <option value="-1">All days</option>
                {dayOptions}
              </select>
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-warning is-pulled-right" onClick={submitFilters}>&#10004;</button>
          </div>
      </form>
    </div>
  );
};

export default DayFilters;
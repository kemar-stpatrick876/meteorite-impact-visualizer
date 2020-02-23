import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './History.scss';

const mapStateToProps = state => {
  const { history } = state;
  return { history };
};
function History(props) {
  const { history } = props;
  let bodyContent = (
    <tr className="history-table__row history-table__row--no-records">
      <td colSpan="4">
        There are currently no history records <span>&#9785;</span>.
      </td>
    </tr>
  );
  console.log(history);
  if (history.length > 0) {
    bodyContent = history.map(record => {
      const { id, timestamp, original, updated } = record;
      return (
        <tr className="history-table__row" key={id}>
          <td>
            {moment(timestamp)
              .format('MM/DD/YY h:mm a')
              .toString()}
          </td>
          <td>{id}</td>
          <td>{original}</td>
          <td>{updated}</td>
        </tr>
      );
    });
  }
  return (
    <div className="App__page App__page--history">
      <div className="App__page__title">History</div>
      <table className="history-table">
        <thead>
          <tr>
            <th>@timestamp</th>
            <th>id</th>
            <th>Original</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>{bodyContent}</tbody>
      </table>
    </div>
  );
}

export default connect(mapStateToProps)(History);

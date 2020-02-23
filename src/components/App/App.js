import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.scss';
import { Header } from '../Header';
import ImpactMap from '../ImpactMap/ImpactMap';
import History from '../../containers/History/History';
import DataEditor from '../../containers/DataEditor/DataEditor';

const RouteNotAvailable = ({ location }) => (
  <div className="App__page App__page--not-available">
    <span>
      Invalid path: <em>{location.pathname}</em>, this page does not exist.
    </span>
  </div>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/map" />} />
          <Route path="/map" exact component={ImpactMap} />
          <Route path="/history" exact component={History} />
          <Route path="/edit/meteorite/:id" component={DataEditor} />
          <Route component={RouteNotAvailable} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

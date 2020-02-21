import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import { Header } from '../Header';
import ImpactMap from '../../views/ImpactMap/ImpactMap';
import History from '../../views/History/History';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/map">
            <ImpactMap />
          </Route>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

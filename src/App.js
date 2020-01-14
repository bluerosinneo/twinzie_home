import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Kwitter from './components/kwitter/Kwitter';
import './App.css';

function App() {
  return (
    <div>
      {/* <Navigation />
      <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/messages" component={Welcome} />
      </Switch> */}
      <Kwitter />
    </div>
  );
}

export default App;

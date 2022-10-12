import React from "react";
import './App.css';
import Posts from "./Posts";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DetailView from "./DetailView";

class App extends React.Component {


  render() {
    return (
      <div className="app">
        <Router>
          <Route exact path={['/', '/:id/detail']}>
            <h1 className="title"> Lizard Global Assessment - Posts </h1>
            <Route exact path="/" component={Posts} />
            <Route exact path="/:id/detail" component={DetailView} />
          </Route>
        </Router>
      </div>
    );
  }
}


export default App;

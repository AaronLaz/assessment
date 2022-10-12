import React from "react";
import './App.css';
import Posts from "./Posts";

class App extends React.Component {


  render() {
    return (
      <div className="app">
        <h1 className="title"> Lizard Global Assessment - Posts </h1>
        <Posts />
      </div>
    );
  }
}


export default App;

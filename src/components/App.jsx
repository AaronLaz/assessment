import React from "react";
import './App.css';
import {useEffect} from "react";

class App extends React.Component{

  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
        items: [],
        DataisLoaded: false
    };
}
// fetching data from api
    componentDidMount() {
      fetch(
"https://localhost:3000/api/posts")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
  }

render() {
  const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;
        console.log(items);
return <div>{

    }</div>;
}
}
  

export default App;

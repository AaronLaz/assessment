import React from "react";
import './App.css';
import dateFormat from 'dateformat';

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
return (
  <div className = "App">
            {/* Rudimentary display, todo: add component */}
            <h1> Lizard Global Assessment - Posts </h1>  {
                items.posts.map((item) => ( 
                <ol key = { item.id } >
                    <pre>
                      Title: { item.title }
                    </pre>
                    <pre>
                      Author: { item.author.name } 
                    </pre>
                    <pre>
                      {/* Date format to improve readability */}
                      Publish date: { dateFormat(item.publishDate, "mmmm dS yyyy") } 
                    </pre>      
                    <pre>
                      {/* Display categories in a list */}
                      Categories: { 
                    item.categories.map((category) => (
                      <ul key = { category.id } >
                        {category.name}
                        </ul>
                      ))
                    } 
                    </pre>
                    {/* Summary might not be necessary in the list, might add to detail page */}
                    {/* <pre>
                      Summary: { item.summary }
                    </pre>               */}
                    </ol>
                ))
            }
        </div>
);
}
}
  

export default App;

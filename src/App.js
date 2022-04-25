import React  from 'react';


class App extends React.Component {

  constructor(props){
  super(props);
  this.state = {
    items: [],
    isLoaded: false
  } 
}

componentDidMount() {

  fetch('http//jsonplaceholder.typicode.com/uesrs')
  .then(res => res.json())
  .then(json => {
    this.setState({
      items: json,
      isLoaded: true,
  })

}).catch((err) => {
  console.log(err);
})
}

render() {
  var { isLoaded, items } = this.state;

  if (!isLoaded) {
    return<div>Loading...</div>;
  }
  else {

  
  return (
    <div className="App">
      <ul>
        {items.map(item => (
          <li key={item.id}>
            Name:{item.name} Email:{item.email}
          </li>
        ))}
      </ul>
      
    </div>
  );
}
}
}

export default App;
import React, { Component } from 'react'
import fetch from 'isomorphic-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Initialized");
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default App;

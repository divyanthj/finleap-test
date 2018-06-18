import React, { Component } from 'react'
import axios from 'axios';
import api from '../data/api-keys'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues : []
    };
  }

  componentDidMount() {
    console.log("Initialized");
    axios.get('https://api.foursquare.com/v2/venues/explore', {
      method: 'GET',
      params: {
        client_id: api.id,
        client_secret: api.secret,
        ll: '40.7243,-74.0018',
        near: "Bangalore",
        query: 'lunch',
        v: '20180323',
        limit: 3
      }
    }).then((res) => {
      this.makeData(res.data.response.groups[0].items);
    })
  }

  makeData(data) {
    console.log("Making relevant data", data);
    let venues = [];
    data.forEach((item) => {
      venues.push({
        name: item.venue.name,
        category: item.venue.categories[0].name,
        rating: 5.0,
        url : ''
      })
    });
    this.setState({
      venues: venues
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default App;

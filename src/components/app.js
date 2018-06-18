import React, { Component } from 'react'
import axios from 'axios';
import api from '../data/api-keys'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues : [],
      participants: [],
      address: ''
    };
  }

  componentDidMount() {
    console.log("Initialized");
    this.fetchData();
  }

  fetchData() {
    if(this.state.address.length > 0) {
      axios.get('https://api.foursquare.com/v2/venues/explore', {
        method: 'GET',
        params: {
          client_id: api.id,
          client_secret: api.secret,
          ll: '40.7243,-74.0018',
          near: this.state.address,
          query: 'lunch',
          v: '20180323',
          limit: 3
        }
      }).then((res) => {
        this.makeData(res.data.response.groups[0].items);
      })
    }

  }

  handleInputChange(event) {
    this.setState({address: event.target.value})
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
        <div class="lunchplace">
          <h2>Lunchplace</h2>
          <div class='ui input'>
            <input placeholder='Address' class='ui input' value={this.state.address}  onChange={this.handleInputChange.bind(this)}/>
          </div>
          <button onClick={this.fetchData.bind(this)} class='ui button'>Get Venues</button>
          <table>
          </table>
        </div>
      )
    }

  }
}

export default App;

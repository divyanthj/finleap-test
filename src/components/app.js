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
    let form = <div className="lunchplace">
      <h2>Lunchplace</h2>
      <div className='ui input'>
        <input placeholder='Address' className='ui input' value={this.state.address}  onChange={this.handleInputChange.bind(this)}/>
      </div>
      <button onClick={this.fetchData.bind(this)} className='ui button'>Get Venues</button>
    </div>;


    let table =
    <table className='ui celled table'>
      <tr>
        <td>Participants</td>
        {this.state.venues.map((item) => {
          console.log("Venue", item);
          return (<td>
                    <h5>{item.name}</h5>
                      <div><label>{item.category}</label></div>
                      <div><label>5</label></div>
                  </td>)
        })}
      </tr>
      {
        this.state.participants.map((item) => {
          return(<tr>
              <td>{participant}</td>
              {this.state.venues.map((item) => {
                console.log("Venue", item);
                return (<td>
                          <input type='radio' name='item.name'/>
                        </td>)
              })}
            </tr>)
        })
      }
    </table>;

    return (<div>
      {form}
      {table}
    </div>)
  }
}

export default App;

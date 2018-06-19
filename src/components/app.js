import React, { Component } from 'react'
import axios from 'axios';
import api from '../data/api-keys'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues : [],
      participants: [],
      address: '',
      newParticipant: ''
    };
  }

  componentDidMount() {
    this.fetchData();
    this.initiateChoices();
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

  initiateChoices() {
    this.state.venues.forEach((venue) => {
      this.state.choices[venue.name] = 0;
    })
  }

  handleInputChange(item, event) {
    let obj = {};
    obj[item] = event.target.value
    this.setState(obj);
  }

  handleSelect(event) {
    console.log("Selected", event.target.value, event.target.name);
  }

  addParticipant() {
    let participants = this.state.participants;
    participants.push({
      name: this.state.newParticipant,
      choice: ''
    });
    this.setState({
      participants: participants,
      newParticipant: ''
    })
  }

  makeData(data) {
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
        <input placeholder='Address' className='ui input' value={this.state.address}  onChange={this.handleInputChange.bind(this, 'address')}/>
      </div>
      <button onClick={this.fetchData.bind(this)} className='ui button'>Get Venues</button>
    </div>;


    let table = (this.state.venues.length > 0) ?
    <table className='ui celled table'>
      <tr>
        <td>Participants</td>
        {this.state.venues.map((item) => {
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
              <td>{item.name}</td>
              {this.state.venues.map((venue) => {
                return (<td>
                          <input type='radio' name={item.name} onChange={this.handleSelect.bind(this)}/>
                        </td>)
              })}
            </tr>)
        })
      }
      <tr>
        <div className='ui input small'>
          <input placeholder='Participant Name' value={this.state.newParticipant} onChange={this.handleInputChange.bind(this, 'newParticipant')}/>
        </div>
        <button className='ui small button' onClick={this.addParticipant.bind(this)} >Add Participant</button>
      </tr>
    </table> : null;

    return (<div>
      {form}
      {table}
    </div>)
  }
}

export default App;

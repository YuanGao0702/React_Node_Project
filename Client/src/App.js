import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {users: []}
  weather = {}
  componentDidMount() {
    //this.download()
    //this.getAllUsers()
    this.getWeather()
  }
  getWeather=()=>{
    fetch('/weather')
      .then(res => res.json())
      .then(weather => {
        this.weather = weather
      });
  }
  getAllUsers=()=>{
    fetch('/allusers')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  download=()=>{
    fetch('/pic')
      .then(res =>{
        res.blob().then( blob =>{
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.getElementById('a_id');
          let filename = 'Google.jpg';
          a.href = blobUrl;
          a.download = filename;
          //a.click();
          //window.URL.revokeObjectURL(blobUrl);
        })
      })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      //alert("Enter Pressed!")
      var input1 = document.getElementById('input1').value;
      if(input1=="summer"){
          document.getElementById('text1').innerHTML = this.weather.Weather;
      }
    }
  }
  render() {

    return (
      <div className="App">
        <a id="a_id" onclick={this.download()}><img src="/pic"></img></a>
        <p><input type = "text" id = "input1" onKeyPress={this._handleKeyPress}></input></p>
        <p id ="text1"></p>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }


}

export default App;

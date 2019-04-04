import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {users: []}
  weatherJson = {}
  componentDidMount() {
    //this.download()
    //this.getAllUsers()
    this.getWeather()
    //this.download()
    // this.buttonClicked()
    this.download()
  }

  getWeather=()=>{
    fetch('/weather')
      .then(res => res.json())
      .then(data => {
        this.weatherJson = data
        document.getElementById('text1').innerHTML = this.weatherJson.Weather;
      });
  }
  getAllUsers=()=>{
    fetch('/allusers')
      .then(res => res.json())
      .then(users => this.setState({ users })
    )
  }
  download=()=>{
    fetch('/pic')
      .then(res =>{
        res.blob().then( blob =>{
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.getElementById('a_id');
          let filename = 'funny.gif';
          a.href = blobUrl;
          a.download = filename;
        })
      })
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      var input1 = document.getElementById('input1').value;
      if(input1=="summer"){
        this.buttonClicked()
      }
    }
  }
  buttonClicked=()=> {
      var x = document.getElementById('text1')
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
  }

  render() {

    return (
      <div className="App">
        <a id="a_id" onclick={this.download}><img src="/pic"></img></a>
        <p><input type = "text" id = "input1" onKeyPress={this._handleKeyPress}></input></p>
        <p id ="text1" style={{display:"none"}}></p>
        <button onClick={this.buttonClicked}>Weather</button>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }


}

export default App;

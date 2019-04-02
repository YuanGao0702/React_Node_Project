import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {users: []}
  file = ""
  componentDidMount() {
    fetch('/allusers')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    //this.download()

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
      document.getElementById('text1').innerHTML = input1;
    }
  }
  render() {

    return (
      <div className="App">
        <a id="a_id" onclick={this.download()}><img src="/pic"></img></a>
        <input type = "text" id = "input1" onKeyPress={this._handleKeyPress}></input>
        <p id ="text1"></p>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }


}

export default App;

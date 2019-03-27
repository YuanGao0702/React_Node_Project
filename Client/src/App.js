import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {users: []}
  file = ''
  componentDidMount() {
    fetch('/allusers')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    fetch('/pic')
      .then(res =>{
        res.blob().then( blob =>{
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.getElementById('a_id');
          let filename = 'file.jpg';
          a.href = blobUrl;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
        })
      })
  }
  render() {

    return (
      <div className="App">
        <a id='a_id'></a>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;

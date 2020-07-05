import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      alertmsg: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('https://novaappointmentbackend.herokuapp.com/users/add', user)
      .then(res => {
     
        this.setState({ alertmsg: res.data });
        console.log(this.state.alertmsg)
      });

    this.setState({
      username: ''
    })
  }

  render() {

    let alert= '';
    if(this.state.alertmsg){
      alert = <div className="alert alert-info alert-dismissible fade show"
        role="alert">
        <strong>{this.state.alertmsg}</strong>
      </div>
    }else {
      alert = '';
    }


    return (

      <div>
        {alert}
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
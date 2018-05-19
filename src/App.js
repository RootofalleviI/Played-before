import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book')
      .then(res => {
        this.setState({ books: res.data });
        console.log(this.state.books);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">
              Pieces Played Before &nbsp;
            </h2>
          </div>
          <div class="panel-body">
          <h5><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Create New Entry </Link></h5>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Composer</th>
                  <th>Opus</th>
                  <th>Key</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(book =>
                  <tr>
                    <td><Link to={`/show/${book._id}`}>{book.title}</Link></td>
                    <td>{book.composer}</td>
                    <td>{book.opus}</td>
                    <td>{book.key}</td>
                    <td>{book.category}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div class="right">
          {localStorage.getItem('jwtToken') &&
            <button class="btn btn-primary" onClick={this.logout}>Logout</button> 
          } &nbsp;
      </div>
      </div>
      
    );
  }
}

export default App;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      opus: '',
      title: '',
      composer: '',
      key: '',
      category: '',
      memo: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { opus, title, composer, key, category, memo } = this.state;

    axios.post('/api/book', { opus, title, composer, key, category, memo })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { opus, title, composer, key, category, memo } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD NEW PIECE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Back to Main View </Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="opus">OPUS:</label>
                <input type="text" class="form-control" name="opus" value={opus} onChange={this.onChange} placeholder="OPUS" />
              </div>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title of the piece" />
              </div>
              <div class="form-group">
                <label for="composer">Composer:</label>
                <input type="text" class="form-control" name="composer" value={composer} onChange={this.onChange} placeholder="Composer" />
              </div>
              <div class="form-group">
                <label for="key">Key:</label>
                <input type="text" class="form-control" name="key" value={key} onChange={this.onChange} placeholder="Key signature" />
              </div>
              <div class="form-group">
                <label for="category">category:</label>
                <input type="text" class="form-control" name="category" value={category} onChange={this.onChange} placeholder="category published" />
              </div>
              <div class="form-group">
                <label for="memo">Memo:</label>
                <textArea class="form-control" name="memo" onChange={this.onChange} placeholder="Anything special about this piece?" cols="80" rows="3">{memo}</textArea>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

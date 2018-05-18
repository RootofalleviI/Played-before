import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      piece: {}
    };
  }

  componentDidMount() {
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ piece: res.data });
        console.log(this.state.piece);
      });
  }

  onChange = (e) => {
    const state = this.state.piece
    state[e.target.name] = e.target.value;
    this.setState({piece:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { opus, title, composer, key, category, memo } = this.state.piece;

    axios.put('/api/book/'+this.props.match.params.id, { opus, title, composer, key, category, memo })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT PIECE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.piece._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> List of Pieces </Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="opus">opus:</label>
                <input type="text" class="form-control" name="opus" value={this.state.piece.opus} onChange={this.onChange} placeholder="OPUS" />
              </div>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.piece.title} onChange={this.onChange} placeholder="Title of the piece" />
              </div>
              <div class="form-group">
                <label for="composer">Composer:</label>
                <input type="text" class="form-control" name="composer" value={this.state.piece.composer} onChange={this.onChange} placeholder="Composer" />
              </div>
              <div class="form-group">
                <label for="key">Key:</label>
                <input type="text" class="form-control" name="key" value={this.state.piece.key} onChange={this.onChange} placeholder="Key" />
              </div>
              <div class="form-group">
                <label for="category">category</label>
                <input type="text" class="form-control" name="category" value={this.state.piece.category} onChange={this.onChange} placeholder="category published" />
              </div>
              <div class="form-group">
                <label for="memo">Memo:</label>
                <input type="text" class="form-control" name="memo" value={this.state.piece.memo} onChange={this.onChange} placeholder="Anything special about this piece?" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

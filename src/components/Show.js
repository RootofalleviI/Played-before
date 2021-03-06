import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

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

  delete(id){
    console.log(id);
    axios.delete('/api/book/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.piece.title}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> List of Pieces </Link></h4>
            <dl>
              <dt>opus:</dt>
              <dd>{this.state.piece.opus}</dd>
              <dt>composer:</dt>
              <dd>{this.state.piece.composer}</dd>
              <dt>key:</dt>
              <dd>{this.state.piece.key}</dd>
              <dt>category:</dt>
              <dd>{this.state.piece.category}</dd>
              <dt>memo:</dt>
              <dd>{this.state.piece.memo}</dd>
            </dl>
            <Link to={`/edit/${this.state.piece._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.piece._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;

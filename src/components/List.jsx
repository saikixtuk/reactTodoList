import React, { Component } from 'react';
import firebase from "firebase";
import "firebase/storage";

let style = { maxWidth: '700px' };
let btn = { cursor: 'pointer' };


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <ul className="siimple-list">
        {this.props.todos.map((todo, i) => {
            return <li key={i} className="siimple-list-item siimple--bg-white" style={style}>{todo[1]} <span className="siimple-tag siimple-tag--error siimple-hover" style={btn} onClick={() => this.props.handleRemove(i, todo[0])}>Delete</span></li>
        })}
      </ul>
    )
  }

}

export default List;
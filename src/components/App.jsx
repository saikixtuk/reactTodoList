import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import firebase from "firebase/app"
import "firebase/firestore"
import {firebaseConfig} from "./firebase";


if (!firebase.apps.length) {
  // firebaseの初期化
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: []
    };
    this.getFireData();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // データ保存
  handleAdd(e) {
    e.preventDefault();
    if (e.target.title.value != '') { 
      let now = firebase.firestore.Timestamp.now(); 
      console.log(now);

      db.collection("content").add({
        text: e.target.title.value,
        timestamp: now
      })
        .catch((error) => {
          console.log(error);
        });
      // フォームから受け取ったデータをオブジェクトに挿入して、stateのtodo配列に追加
      this.state.todo.push({ title: e.target.title.value });
      // setStateを使ってstateを上書き
      this.setState({ todo: this.state.todo });
      // inputのvalueを空に
      e.target.title.value = '';
      this.getFireData();
    }else{
      alert('Please enter the letters.')
    }
  }

  // データ削除
  handleRemove(i, e) {
    console.log(e);
    db.collection("content").doc(e).delete().then(() => {
    // todo配列からi番目から1つ目のデータを除外
    this.state.todo.splice(i, 1);
    // setStateでtodo配列を上書き
    this.setState({ todo: this.state.todo });
      alert.log("削除しました");
    })
    .catch((error) => {
      console.log(`削除に失敗しました (${error})`);
    });
  }


    // Firebaseからのデータ取得
    getFireData() {
      // Firebaseの初期化
      var buff = [];
      var db = firebase.firestore();
      console.log(db);
      db.collection("content")
      .orderBy('timestamp', 'desc')
      .get().then((query) => {
        query.forEach((doc) => {
          var data = doc.data();
          buff.push([doc.id, data.text]);
          this.setState({
            todo: buff
          })
        });
      })
        .catch((error) => {
          console.log(error)
          console.log(`データの取得に失敗しました`);
        });
    }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <h1 className="siimple-box-title siimple--color-white">React Todo App</h1>
        <Form handleAdd={this.handleAdd} />
        <div className="siimple-rule"></div>
        <List todos={this.state.todo} handleRemove={this.handleRemove} />
      </div>
    );
  }
}

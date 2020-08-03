import React from 'react';

import {PostComponent} from './posts/index.js'

import './App.css';

function App(props) {
  const username = props.username
  const personal = props.personal
  const canPost = props.canPost
  return (
    <div className="App">
      <header className="App-header">
        <PostComponent username={username} personal={personal} canPost={canPost} />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="feed">
        <div className="new-post">
          <form>
            <textarea placeholder="¿Qué estás pensando?" />
            <input type="submit" value="Twittear" />
          </form>          
        </div>
        <div className="tweet-container">
          
        </div>
      </div>
      <div className="right-sidebar">
          <h4>Tendencias</h4>
      </div>
    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import openSocket from 'socket.io-client';
import './App.css';

function App() {
  let [connectedClients, setConnectedClients] = useState(0);
  let [tweet, setTweet] = useState('');
  let [feed, setFeed] = useState([]);

  useEffect(() => {
    const socket = openSocket.connect('http://localhost:8080');
    socket.on('new_connection', data => {
      console.log(data.clients);
      setConnectedClients(data.clients);
    });
    socket.on('feed', data => {
      setFeed(data.tweets);
    });
  }, []);

  const sendTweet = () => {
    fetch('http://localhost:8080/tweet', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tweet: tweet
      })
    }).then(response => response.json()).then(results => console.log(results)).catch(error => console.log(error));
  }

  return (
    <div className="App">
      <div className="feed">
        <div className="new-post">
          <form onSubmit={(e) => {e.preventDefault(); sendTweet(); }}>
            <textarea placeholder="¿Qué estás pensando?" onChange={ (e) => setTweet(e.target.value) }/>
            <input type="submit" value="Twittear" />
          </form>          
        </div>
        <div className="tweet-container">
          {          
            feed.map( tweet => (
                <div className="tweet">
                  <input value={tweet} />
                  <div className="tweet-options">
                    <button onClick={() => console.log("función para guardar cambios")}>Guardar</button>
                    <button>Eliminar</button>
                  </div>
                </div>
              ) 
            )
          }
        </div>
      </div>
      <div className="right-sidebar">
          <h4>Tendencias</h4>
      </div>
      <h3>Clientes conectados: {connectedClients}</h3>
    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import openSocket from 'socket.io-client';
import './App.css';

function App() {
  let [connectedClients, setConnectedClients] = useState(0);
  let [tweet, setTweet] = useState('');
  let [feed, setFeed] = useState([]);

  useEffect(() => {
    const socket = openSocket.connect('https://vrtz1.sse.codesandbox.io');
    socket.on('new_connection', data => {
      console.log(data.clients);
      setConnectedClients(data.clients);
    });
    socket.on('feed', data => {
      setFeed(data.tweets);
    });
  }, []);

  const sendTweet = () => {
    fetch('https://vrtz1.sse.codesandbox.io/tweet', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tweet: tweet
      })
    }).then(response => response.json()).then(results => console.log(results)).catch(error => console.log(error));
  }

  const updateTweet = (indice) => {
    fetch(`https://vrtz1.sse.codesandbox.io/tweet/${indice}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tweet: feed[indice]
      })
    }).then(response => response.json()).then(results => console.log(results)).catch(error => console.log(error));
  }

  const deleteTweet = (e, index) => {
    // console.log(index)
    let id = index
    fetch(`https://vrtz1.sse.codesandbox.io/tweet/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return response.json()
    })    
    .then(results =>{ 
      console.log(results)
    })
    .catch(error => console.log(error));
   
  }


  const editTweet = (newTweet, indice) => {
    let tweetsArray = [...feed];
    console.log(tweetsArray);
    tweetsArray[indice] = newTweet;
    setFeed(tweetsArray);
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
            feed.map( (tweet, indice) => (
                <div className="tweet">
                  <input value={tweet} onChange={(e) => editTweet(e.target.value, indice)}/>
                  <div className="tweet-options">
                    <button onClick={() => updateTweet(indice)}>Guardar</button>
                    <button onClick={(e) => deleteTweet(e, indice)}>Eliminar</button>
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

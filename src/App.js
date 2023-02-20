import './App.css';
import React, { useState, useEffect } from "react";


function App() {
  // variables for pop-up modal
  const [show, setShow] = useState(false);
  const [eventInfo, setEventInfo] = useState(null); // tbd
  // main data retrieval
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData (url) {
    await fetch(url)
    .then(res => { // error handling
      if (res.ok) return res.json();
      throw res;
    })
    .then(data => { // 
      console.log(data);
      setEventData(data);
    })
    .catch(err => console.log("Error fetching data: ", err))
    .finally(() => setLoading(false))
  }

  useEffect(() => { getData('https://api.hackthenorth.com/v3/events') }, []); // default value

  const showModal = (event) => {
    setEventInfo(event);
    setShow(true);
    console.log("Switched");
  };

  const exitModal = () => setShow(false);
  
  return ( 
    <div className="App">
      <header className="App-header">
        {!loading && <p>{eventData[0].name}</p>}
      </header>
    </div>
  );
}

/*<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */

export default App;

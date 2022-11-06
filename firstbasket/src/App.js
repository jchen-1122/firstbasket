import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const APIKEY = 'CHi8Hy5CEE4khd46XNYL23dCFX96oUdw6qOt1Dnh'
  const MARKETID = '142'

  // states
  const [events, setEvents] = useState();
  const [offers, setOffers] = useState();
  const [participants, setParticipants] = useState();
  const [selections, setSelections] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // fetch events
      const eventsUrl = 'https://api.bettingpros.com/v3/events?sport=NBA&date=2022-11-05'
      const eventsData = await fetch(eventsUrl, {
        headers: {
          'X-Api-Key': APIKEY
        },
      });
      const eventsJson = await eventsData.json();
      console.log(eventsJson.events)
      setEvents(eventsJson.events)

      // parse events
      var eventsString = ''

      for (let i = 0; i < events.length; i++) {
        eventsString += events[i].id;
        if (i != events.length - 1) {
          eventsString += ':'
        }
      }
      
      // fetch offers
      const offersUrl = 'https://api.bettingpros.com/v3/offers?sport=NBA&market_id='+MARKETID+'&event_id='+eventsString+'&location=CA&live=true'
      const offersData = await fetch(offersUrl, {
        headers: {
          'X-Api-Key': APIKEY
        },
      });
      const offersJson = await offersData.json();
      console.log(offersJson.offers)
      setOffers(offersJson.offers)
    }
  
    fetchData().catch(console.error);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <ul>
          {
            events.map(function(event){
              return <li> {event.id} as the {event.sport} </li>
            })
          }
        </ul> */}
      </header>
    </div>
  );
}

export default App;

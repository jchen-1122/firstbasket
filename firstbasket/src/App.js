import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const APIKEY = 'CHi8Hy5CEE4khd46XNYL23dCFX96oUdw6qOt1Dnh'
  const MARKETID = '142'

  // states
  const [events, setEvents] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
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
    }
  
    fetchEventsData().catch(console.error);
  }, [])

  const fetchOffersData = async () => {
    // parse events
    var eventsString = ''

    for (let i = 0; i < events.length; i++) {
      eventsString += events[i].id;
      if (i != events.length - 1) {
        eventsString += ':'
      }
    }

    console.log(eventsString)
    
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

  return (
    <div className="App">
      <header className="App-header">
        <p>Date PlaceHolder</p>
        <button onClick={fetchOffersData}>
          Get Odds
        </button>
        {events.map((event,eid)=>{
          return <div key={eid}>
            <h5>{event.visitor} @ {event.home}</h5>
            {offers.map((offer,oid) => {
              if (offer.event_id == event.id) {
                return <div key={oid}>
                  {offers.length != 0 ? offer.participants.map((participant,pid)=>{
                    return <div key={pid}>
                      <h6>{participant.name} 
                      {offer.selections.map((selection, sid) => {
                        if (selection.participant == participant.id) {
                          return " +" + selection.opening_line.cost
                        }
                      })}
                      </h6>
                    </div>
                  }) : <div></div>}
                </div>
              } else {
                return <div></div>
              }
            })}
          </div>
        })}
      </header>
    </div>
  );
}

export default App;

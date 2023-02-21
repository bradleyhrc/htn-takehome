import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import EventCard from './EventCard';

export default function Events() {
    // variables for pop-up modal
    const [show, setShow] = useState(false);
    const [eventInfo, setEventInfo] = useState(null); // tbd
    // main data retrieval
    const [eventData, setEventData] = useState([]);

    async function getData (url) {
        await fetch(url)
        .then(res => { // error handling
        if (res.ok) return res.json();
        throw res;
        })
        .then(data => { // 
        console.log(data);
        
        const temp = data.sort((a,b) => 
            a.start_time < b.start_time ? -1 : 1);
        console.log(data);

        setEventData(temp);
        })
        .catch(err => console.log("Error fetching data: ", err))
    }

    useEffect(() => { getData('https://api.hackthenorth.com/v3/events') }, []); // default value

    const showModal = (event) => {
        setEventInfo(event);
        setShow(true);
        console.log("Switched");
    };

    const exitModal = () => setShow(false);

    return (
        <div className='grid'>
        <Card.Group itemsPerRow={2} stackable>
            {eventData && eventData.map((event) => {
                return (
                    <EventCard key={event.id} event={event} />
                );
            })}
        </Card.Group>
        </div>
    )
}

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import EventCard from './EventCard';
import { useAuth0 } from '@auth0/auth0-react';
import SearchBar from './SearchBar';

import './Events.css';

export default function Events() {
    // variables for filter/search
    const [key, setKey] = useState('');
    const [filtered, setFiltered] = useState([]); // matches
    // main data retrieval
    const [eventData, setEventData] = useState([]);
    // 
    const { isAuthenticated } = useAuth0();

    const digits = ['1', '2', '3', '4', '5', '6', ]

    const matchKey = useCallback((k) => { // reduces re-renders for this function
        // case if key is an integer : for viewing related events
        if (parseInt(k)) {
            viewRelated(parseInt(k));
            return;
        } else if (k === '') {
            setKey('');
            setFiltered(eventData);
            return;
        }
        // k is a string
        const lowKey = k.toLowerCase();
        const matches = eventData.filter((item) => {
            return (item.name.toLowerCase().includes(lowKey));
        });
        setKey(k);
        setFiltered(matches);
    }, [eventData, key]); // dependencies

    // displays 
    const viewRelated = useCallback((id) => { // reduces re-renders for this function
        
        const matches = eventData.filter((item) => {
            return (item.related_events.includes(id) || item.id == id);
        });
        setKey(id);
        setFiltered(matches);
    }, [eventData, key]); // dependencies

    async function getData (url) {
        await fetch(url)
        .then(res => { // error handling
        if (res.ok) return res.json();
        throw res;
        })
        .then(data => {
        // sort in increasing order
        const temp = data.sort((a,b) => a.start_time < b.start_time ? -1 : 1);
        setEventData(temp);
        setFiltered(temp); // copy
        })
        .catch(err => console.log("Error fetching data: ", err))
    }

    useEffect(() => { getData('https://api.hackthenorth.com/v3/events') }, []); // default value

    return (
        <div>
            <div className='bar'>
            <SearchBar input={key} onChange={matchKey}/>
            </div>
            <Card.Group itemsPerRow={2} stackable>
                {filtered && filtered.map((event) => {
                    return (
                        // display only public events if not logged in
                        (isAuthenticated || event.permission === 'public') && 
                        <EventCard key={event.id} event={event} onClick={viewRelated} />
                    );
                })}
            </Card.Group>
        </div>
    )
}

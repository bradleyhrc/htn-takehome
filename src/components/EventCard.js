import React, { useState } from 'react';

import { Container, Header, Modal, Card, Label } from 'semantic-ui-react';

import './EventCard.css';

export default function EventCard({
    event: {
        id,
        name,
        event_type,
        permission,
        start_time,
        end_time,
        description,
        speakers,
        public_url,
        private_url,
        related_events
    }
}) {
    const [open, setOpen] = useState(false);

    // date time variables
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const v = new Date(start_time);
    const end = new Date(end_time);
    const date = v.toLocaleDateString('en-CA', options);
    const time = v.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    const finish = end.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    
    console.log(time);
    return (
        <Modal
            closeIcon
            open={open}
            size='small'
            trigger={
                <Card raised href="#">
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{speakers.length !== 0 && <>{speakers[0].name}</>} @ {time} on {date}</Card.Meta>
                        <Card.Description>{description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Label>#{event_type}</Label>
                        <Label>#{permission}</Label>
                    </Card.Content>
                </Card>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header as='h2'>
                {name}
                <Label>{event_type}</Label>
                <p className='eventMeta'>
                    {speakers.length !== 0 && <>{speakers[0].name} | </>}{time} – {finish} on {date}
                </p>
            </Header>
            <Modal.Content>
                <p className='modalDescr'>{description}</p>
            </Modal.Content>
        </Modal>
    )
}

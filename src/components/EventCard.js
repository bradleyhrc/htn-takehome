import React, { useState } from 'react';

import { Header, Modal, Card, Label, Icon } from 'semantic-ui-react';

import { useAuth0 } from '@auth0/auth0-react';

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
    }, onClick
}) {
    const { isAuthenticated } = useAuth0();
    const [open, setOpen] = useState(false);

    // date variables
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    const start = new Date(start_time);
    const end = new Date(end_time);

    const date = start.toLocaleDateString('en-CA', options);
    const time = start.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    const finish = end.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });

    const url = isAuthenticated ? private_url : public_url;
    
    return (
        <Modal
            closeIcon
            open={open}
            size='small'
            trigger={
                <Card raised>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{speakers.length !== 0 && <>{speakers[0].name}</>} @ {time} on {date}</Card.Meta>
                        <Card.Description>{description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Label color='teal'>#{event_type}</Label>
                        <Label color='grey'>#{permission}</Label>
                    </Card.Content>
                </Card>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header as='h2'>
                {name}
                <Label color='teal'>#{event_type}</Label>
                <Label color='grey'>#{permission}</Label>
                <p className='eventMeta'>
                    {speakers.length !== 0 && <>{speakers[0].name} | </>}{time} – {finish} on {date}
                </p>
            </Header>
            <Modal.Content>
                <p className='modalDescr'>{description}</p>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                    <Icon name='linkify' size='small' color='black' />
                    {url}
                </a>
                <button onClick={() => onClick(id)}></button>
            </Modal.Content>
        </Modal>
    )
}

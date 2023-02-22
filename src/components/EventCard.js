import React, { useState } from 'react';

import { Header, Modal, Card, Label, Icon, Grid, Button } from 'semantic-ui-react';

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
    }, 
    onClick
}) {
    const { isAuthenticated } = useAuth0();
    // modal open/close
    const [open, setOpen] = useState(false);

    // date format options
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    const start = new Date(start_time);
    const end = new Date(end_time);

    // date to display, time (start)-finish
    const date = start.toLocaleDateString('en-CA', options);
    const time = start.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    const finish = end.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });

    // url to display: public if not logged in, private otherwise
    const url = isAuthenticated ? private_url : public_url;

    // colour for label tags based on types
    let labelC2 = (permission === 'public') ? 'grey' : 'purple';
    let labelC1 = 'teal';

    if (event_type === 'activity') {
        labelC1 = 'pink';
    } else if (event_type === 'tech_talk') {
        labelC1 = 'olive';
    }
    
    // event info cards wrapped with modal link, to display full info
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
                        <Label color={labelC1}>#{event_type}</Label>
                        <Label color={labelC2}>#{permission}</Label>
                    </Card.Content>
                </Card>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header as='h2'>
                {id}: {name}
                <Label color={labelC1}>#{event_type}</Label>
                <Label color={labelC2}>#{permission}</Label>
                <p className='eventMeta'>
                    {speakers.length !== 0 && <>{speakers[0].name} | </>}{time} – {finish} on {date}
                </p>
            </Header>
            <Modal.Content>
                <p className='modalDescr'>{description}</p>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column floated='left' textAlign='left' width={12}>
                            <a className='link' href={url} target='_blank' rel='noopener noreferrer'>
                                <Icon name='linkify' size='small' color='black' />
                                {url}
                            </a>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right' width={4}>
                            <Button size='small' color='blue' onClick={() => {
                                onClick(id);
                                setOpen(false);
                            }}>
                                Related events
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Content>
        </Modal>
    )
}

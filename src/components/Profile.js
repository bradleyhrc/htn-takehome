import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Header, Grid } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import './Profile.css';

// Welcome Text + Login/Logout 
const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className='header'>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign='left' width={12}>
                        <Header as='h1'>
                            <span role="img" aria-label="Coding">🧑‍💻 </span>
                            Happy hacking, {isAuthenticated ? user.name : 'everyone'}!
                        </Header>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={4}>
                        {isAuthenticated && <LogoutButton />}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} className='subrow'>
                    <Grid.Column>
                        {!isAuthenticated && <LoginButton />}
                        {isAuthenticated && <Header className='subtitle' as='h2'>Learn about all the amazing events happening.</Header>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Profile;

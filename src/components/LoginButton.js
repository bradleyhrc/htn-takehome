import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Header } from 'semantic-ui-react';

import './LoginButton.css';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Header as='h3'>
            <Button className='login' compact size='medium' color='teal' onClick={() => loginWithRedirect()}>
            <Header as='h3'>Log in</Header>
            </Button>
            to view full list of events. 
        </Header>
    )
}

export default LoginButton;

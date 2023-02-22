import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Header } from 'semantic-ui-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Header as='h3' style={{opacity: '90%'}}>
            <Button compact size='medium' color='blue' onClick={() => loginWithRedirect()}>
            <div style={{fontSize: '16px'}}>Log in</div>
            </Button>
            to view full list of events. 
        </Header>
    );
};

export default LoginButton;

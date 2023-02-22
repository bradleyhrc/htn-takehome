import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'semantic-ui-react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button size='small' color='grey' onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>
            Log out
        </Button>
    )
}

export default LogoutButton;

import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Load = () => {
    return (
        <Dimmer active inverted>
            <Loader />
        </Dimmer>
    );
}

export default Load;

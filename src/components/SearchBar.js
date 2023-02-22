import React from 'react';
import { Form } from 'semantic-ui-react';

const SearchBar = ({ input, onChange }) => {
    return (
        <Form>
            <Form.Field>
                <Form.Input
                    placeholder='Search for an event...'
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                />
            </Form.Field>
        </Form>   
    );
};

export default SearchBar;

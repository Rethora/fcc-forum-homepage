const { Dimmer, Loader, Segment } = require('semantic-ui-react');

export const Loading = () => (
    <Segment style={{ width: '100vw', height: '100vh' }}>
        <Dimmer active>
            <Loader content='Loading' />
        </Dimmer>
    </Segment>
);
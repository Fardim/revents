import React from 'react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';

function App() {
    return (
        <div className="app">
            <NavBar />
            <Container className="main">
                <EventDashboard />
            </Container>
        </div>
    );
}

export default App;

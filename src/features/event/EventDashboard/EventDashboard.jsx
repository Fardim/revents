import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

class EventDashboard extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width={10}>
                        <h2>Left column</h2>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h2>Right column</h2>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default EventDashboard;
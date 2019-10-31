import React, { Component } from 'react';
import Table from './Table';
import Legend from './Legend';

class App extends Component {
    render() {
        return(
            <div>
                <h1 style={ { 
                    padding: '15px',
                    textAlign: 'center' 
                } }>John and Justin's NFL Over/Unders</h1>
                <Legend />
                <Table />
            </div>
            
        );
    }
}

export default App;
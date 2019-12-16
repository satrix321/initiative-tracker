import React from 'react';
import InitiativeTracker from './InitiativeTracker';

class App extends React.Component {
  render() {
    return (
      <div style={{margin: 'auto', maxWidth: 700}}>
        <InitiativeTracker></InitiativeTracker>
      </div>
    )
  }
}

export default App;

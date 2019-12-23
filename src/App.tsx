import React from 'react';
import InitiativeTracker from './InitiativeTracker';

class App extends React.Component {
  render() {
    return (
      <div style={{maxWidth: 700, margin: 'auto'}}>
        <InitiativeTracker></InitiativeTracker>
      </div>
    )
  }
}

export default App;

import React from 'react';

import { DndProvider } from 'react-dnd';
import DndBackend from 'react-dnd-html5-backend';

import InitiativeTracker from './InitiativeTracker';

const App: React.FC = () => {
  return (
    <div style={{maxWidth: 700, margin: 'auto'}}>
      <DndProvider backend={DndBackend}>
        <InitiativeTracker />
      </DndProvider>
    </div>
  );
}

export default App;

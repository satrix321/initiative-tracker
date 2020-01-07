import React from 'react';

import { DndProvider } from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';

import InitiativeTracker from './InitiativeTracker';

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend, // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};

const App: React.FC = () => {
  return (
    <div style={{maxWidth: 800, margin: 'auto'}}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <InitiativeTracker />
      </DndProvider>
    </div>
  );
}

export default App;

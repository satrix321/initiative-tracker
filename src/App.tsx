import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { DndProvider } from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';

import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';

import InitiativeTracker from './components/InitiativeTracker/InitiativeTracker';

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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${props => props.theme.fonts.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input, select, textarea {
    font-family: ${props => props.theme.fonts.input};
  }

  code {
    font-family: ${props => props.theme.fonts.mono};
  }
`;

const App: React.FC = () => {
  return (
    <div style={{maxWidth: 800, margin: 'auto'}}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <InitiativeTracker />
        </ThemeProvider>
      </DndProvider>
    </div>
  );
};

export default App;

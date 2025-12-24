import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { MantineProvider, createTheme } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';
import store from './store/store';
import { Provider } from 'react-redux';


const myColor: MantineColorsTuple = [
  '#eafbee',
  '#dbf2e0',
  '#b9e1c2',
  '#94d0a1',
  '#74c186',
  '#60b874',
  '#54b46a',
  '#449e59',
  '#398d4d',
  '#2a7a3f'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  primaryShade: { light: 6, dark: 6 },
  components: {
    
    Button: { defaultProps: { radius: 'md' } },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
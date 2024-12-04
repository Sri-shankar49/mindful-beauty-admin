import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// import { Provider } from 'react-redux';
// import { store } from './redux/store.ts';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'; // Assuming your store setup is in this path
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreSession } from './store/csrf';
import { csrfFetch } from './store/csrf';


const root = ReactDOM.createRoot(document.getElementById('root'));


function initializeApp() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState = {};
  const store = configureStore();

  if (currentUser) {
    initialState = {
      users: {
        [currentUser.id]: currentUser
      },
      session: {
        currentUserId: currentUser.id
      }
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.csrfFetch = csrfFetch;
  }
  
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
  );
}

restoreSession().then(initializeApp);

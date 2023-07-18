import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreSession } from './store/csrf';


const root = ReactDOM.createRoot(document.getElementById('root'));

function initializeApp() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState = {};

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

  const store = configureStore(initialState);

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
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

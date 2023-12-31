import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import sessionReducer from './session';

// const entitiesReducer = combineReducers({
//   users: userReducer
// })

// const rootReducer = combineReducers({
//   entities: entitiesReducer,
//   sessions: sessionReducer,
//   ui: uiReducer
// });
// THE ABOVE FOR ACTUAL FULLSTACK TO ENSURE APPROPRIATE KEY NESTING

const rootReducer = combineReducers({
  users: userReducer,
  session: sessionReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
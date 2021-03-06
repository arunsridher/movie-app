import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// //function logger(obj, next, action) -> obj has dispatch and getState
// //logger is called as a curry function -> logger(obj)(next)(action)
// const logger = function({dispatch, getState}){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE : ', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({dispatch, getState}) => (next) => (action) => {
  //middleware code
  if(typeof action !== 'function'){
    console.log('ACTION_TYPE : ', action.type);
  }
  next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   //middleware code
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

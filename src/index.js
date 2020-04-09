import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
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
  console.log('ACTION_TYPE : ', action.type);
  next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

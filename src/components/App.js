import React, { Component } from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MoviewCard from './MovieCard';
import movies from '../reducers';

class App extends Component {

  componentDidMount(){
    //Make api call

    const {store} = this.props;
    store.subscribe(() => {
      this.forceUpdate();
    });
    this.props.store.dispatch({
      type: 'ADD_MOVIES',
      movies: data,
    });
  }

  render(){
    const movies = this.props.store.getState();

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">
              Movies
            </div>
            <div className="tab">
              Favourites
            </div>
          </div>
          <div className="list">
            {movies.map((movie, index) =>(
              <MoviewCard movie={movie} key={`movies-${index}`}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default App;

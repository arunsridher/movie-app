import React, { Component } from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MoviewCard from './MovieCard';
// import movies from '../reducers';
import { addMovies, setShowFavourites } from '../actions';

class App extends Component {

  componentDidMount() {
    //Make api call
    const { store } = this.props;
    store.subscribe(() => {
      this.forceUpdate();
    });
    store.dispatch(addMovies(data));
    console.log('STATE', store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      //found movie
      return true;
    }
    return false;
  }

  onChangeTab(val) {
    const { store } = this.props;
    store.dispatch(setShowFavourites(val));
  }

  render() {
    const { movies, search } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>
              Movies
            </div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MoviewCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
        </div>
      </div>
    );
  }

}

export default App;

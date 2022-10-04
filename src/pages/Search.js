import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      // isLoading: false,
    };
  }

  activateSearchButton = () => {
    const { nameArtist } = this.state;
    const minLength = 2;
    return nameArtist.length >= minLength;
  };

  searchArtistName = (event) => {
    this.setState({
      nameArtist: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.searchArtistName }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ !this.activateSearchButton() }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;

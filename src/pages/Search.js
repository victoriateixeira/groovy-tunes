import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      nameArtist: '',
      isLoading: false,
      artistAlbums: [],
    };
  }

  activateSearchButton = () => {
    const { searchInput } = this.state;
    const minLength = 2;
    return searchInput.length >= minLength;
  };

  searchArtistName = (event) => {
    this.setState({
      searchInput: event.target.value,
      nameArtist: event.target.value,
    });
  };

  fetchArtist = async () => {
    const { searchInput } = this.state;
    this.setState(
      {
        isLoading: true,
      },
    );
    const albumsList = await searchAlbumsAPI(searchInput);
    this.setState({
      artistAlbums: albumsList,
      isLoading: false,
      searchInput: '',
    });
  };

  render() {
    const { isLoading, artistAlbums, searchInput, nameArtist } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <form>
            <label htmlFor="name-artist">
              <input
                id="name-artist"
                type="text"
                data-testid="search-artist-input"
                value={ searchInput }
                onChange={ this.searchArtistName }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ !this.activateSearchButton() }
              onClick={ this.fetchArtist }
            >
              Pesquisar
            </button>
          </form>
        </div>
        <div>
          {isLoading && <Loading />}

          { artistAlbums.length > 0 && !isLoading
          && (
            <div>
              <h3>
                {' '}
                Resultado de álbuns de:
                {' '}
                {nameArtist}
                {' '}
              </h3>
              <AlbumCard artistAlbums={ artistAlbums } />
            </div>
          )}
          {artistAlbums.length === 0 && !isLoading
          && <h3>Nenhum álbum foi encontrado</h3>}

        </div>
      </>
    );
  }
}

export default Search;

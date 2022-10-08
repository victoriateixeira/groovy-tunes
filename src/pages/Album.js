import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songsList: [],
      requestComplete: false,
      isLoading: false,
      // favSongsList: [],
    };
  }

  componentDidMount() {
    this.getSongsFromAlbum();
    this.fetchFavSongs();
  }

  getSongsFromAlbum = async () => {
    const { match: { params } } = this.props;
    const { id } = params;
    const results = await getMusics(id);
    const songsList = results.filter((song, index) => index > 0);
    this.setState({
      songsList,
      artistName: results[0].artistName,
      albumName: results[0].collectionName,
      requestComplete: true,
    });
    // console.log(songsList);
  };

  favoritesSong = async (event) => {
    const { songsList } = this.state;
    const favSongId = Number(event.target.id);
    const statusSong = event.target.checked;
    console.log(statusSong);
    this.setState({ isLoading: true });
    const favSong = songsList.filter((song) => song.trackId === favSongId)[0];
    // console.log(statusSong);
    // console.log(typeof favSong);
    if (statusSong) {
      await addSong(favSong);
      this.setState({
        isLoading: false,
      // favSongsList: [...prevState.favSongsList, favSong],
      });
    } else {
      await removeSong(favSong);
      this.setState({
        isLoading: false,
        // favSongsList: prevState.favSongsList.filter((song) => song !== favSong),
      });
    }
  };

  fetchFavSongs = async () => {
    this.setState({ isLoading: true });
    const favoriteSongsList = await getFavoriteSongs();
    const idTest = 80812034;
    console.log(favoriteSongsList);
    console.log(favoriteSongsList.some((fav) => fav.trackId === idTest));
    this.setState({
      favoriteSongsList,
      isLoading: false,
    });
  };

  render() {
    const {
      songsList,
      requestComplete,
      artistName, albumName,
      isLoading, favoriteSongsList } = this.state;
    return (
      <div data-testid="page-album">

        <Header />
        {
          isLoading && <Loading />
        }
        {
          requestComplete
        && (
          <div>

            <img
              src={ songsList[0].artworkUrl100 }
              alt={ songsList[0].collectionName }
            />
            <h2 data-testid="album-name">{albumName}</h2>
            <h3 data-testid="artist-name">{artistName}</h3>

            {songsList.map((song) => (<MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewURL={ song.previewURL }
              trackId={ song.trackId }
              favoritesSong={ this.favoritesSong }
              favoriteSongsList={ favoriteSongsList }

            />))}
          </div>
        )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }),
}.isRequired;
export default Album;

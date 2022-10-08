import React from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';
// import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: true,
    };
  }

  componentDidMount() {
    this.checksIfFavSong();
  }

  // favoritesSong = async () => {
  //   const { songObject } = this.props;
  //   this.setState(
  //     {
  //       isLoading: true,
  //     },
  //   );
  //   await addSong(songObject);
  //   this.setState({
  //     isLoading: true,
  //   });
  // };
  checksIfFavSong = () => {
    const { favoriteSongsList, trackId } = this.props;
    console.log(favoriteSongsList);
    if (favoriteSongsList) {
      const isFav = favoriteSongsList.some((favSong) => favSong.trackId === trackId);
      console.log(isFav);
      this.setState({
        checked: isFav,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
    // console.log(isFav);
  };

  handlesChecked = (event) => {
    const { favoritesSong } = this.props;
    this.setState(
      (prev) => ({
        checked: !prev.checked,
      }),
      () => favoritesSong(event),
    );
  };

  render() {
    const { trackName, previewURL, trackId } = this.props;
    const { checked } = this.state;
    // const { isLoading } = this.state;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewURL } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite" data-testid={ `checkbox-music-${trackId}` }>
          {' '}
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            onChange={ this.handlesChecked }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  favoritesSong: PropTypes.func.isRequired,
  favoriteSongsList: PropTypes.arrayOf().isRequired,
};

export default MusicCard;

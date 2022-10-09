import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.checksIfFavSong();
  }

  checksIfFavSong = async () => {
    const { song } = this.props;
    this.setState({ isLoading: true });
    const favoriteSongsList = await getFavoriteSongs();
    const isFav = favoriteSongsList.some((favSong) => favSong.trackId === song.trackId);

    this.setState({
      checked: isFav,
      isLoading: false,
    });
  };

  handlesSaveToFav = async (event) => {
    const { song } = this.props;
    this.setState({
      isLoading: true,
    });
    if (event.target.checked) {
      await addSong(song);
      this.setState({
        checked: true,
      });
    } else {
      await removeSong(song);
      this.setState({
        checked: false,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { song } = this.props;
    const { trackName, previewURL, trackId } = song;

    const { checked, isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
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
                onChange={ this.handlesSaveToFav }
                checked={ checked }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.PropTypes.shape().isRequired,

};

export default MusicCard;

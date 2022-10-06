import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songsList: [],
      requestComplete: false,
    };
  }

  componentDidMount() {
    this.getSongsFromAlbum();
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
    console.log(songsList);
  };

  render() {
    const { songsList, requestComplete, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">

        <Header />
        {requestComplete
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
            />))}
          </div>
        )}
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

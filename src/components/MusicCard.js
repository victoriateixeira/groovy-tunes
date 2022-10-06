import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  componentDidMount() {

  }

  render() {
    const { trackName, previewURL } = this.props;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
};

export default MusicCard;

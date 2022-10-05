import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { artistAlbums } = this.props;
    return (
      artistAlbums === [] ? 'Nenhum álbum foi encontrado'
        : (
          <div>
            {/* <h4>
              Resultado de álbuns de
              {artistAlbums[0].artistName}

            </h4> */}
            <div>
              {artistAlbums.map((album) => (
                <div key={ album.collectionId }>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  {album.collectionName}
                  {album.artistName}
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Search
                  </Link>
                </div>
              ))}

            </div>
          </div>
        )
    );
  }
}

AlbumCard.propTypes = {
  artistAlbums: PropTypes.arrayOf.isRequired,
};
export default AlbumCard;

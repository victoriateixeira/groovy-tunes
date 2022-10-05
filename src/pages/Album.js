import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  // getSongsFromAlbum = async () => {
  //   const songsList = await getMusics(searchInput);
  //   this.setState({
  //     artistAlbums: albumsList,
  //     isLoading: false,
  //     searchInput: '',
  //   });
  // };

  // componentDidMount(){

  // }
  render() {
    // const { match: { params } } = this.props;
    // const { id } = params;
    return (
      <div data-testid="page-album">

        <Header />

      </div>
    );
  }
}

// Album.propTypes = {
//   match: objectOf(
//     shape({
//       params: {
//         id: PropTypes.string,
//       },
//     }),
//   ).isRequired,
// };
export default Album;

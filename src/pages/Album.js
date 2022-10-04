import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    // const { match: { params } } = this.props;
    // const { id } = params;
    // return (
    //   id
    //   && (
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

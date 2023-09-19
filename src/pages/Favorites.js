import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favSongs: [],
    };
  }

  async componentDidMount() {
    await this.getFavSongs();
  }

  getFavSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    this.setState({
      favSongs: favoriteSongs,
      isLoading: false,
    });
  };

  updatesFav = (id) => {
    this.setState({
      isLoading: true,
    });
    const { favSongs } = this.state;
    const newFav = favSongs.filter((song) => song.trackId !== id);
    this.setState({
      favSongs: newFav,
      isLoading: false,
    });
  };

  render() {
    const { favSongs, isLoading } = this.state;
    return (

      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading />

          : favSongs.map((song) => (

            <MusicCard
              key={ song.trackId }
              song={ song }
              updatesFav={ this.updatesFav }
            />
          ))}

      </div>
    );
  }
}

export default Favorites;

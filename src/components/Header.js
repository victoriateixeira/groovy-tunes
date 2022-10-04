import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    this.setState({
      isLoading: true,
    });
    const username = await getUser();
    this.setState({
      isLoading: false,
      username: username.name,
    });
  };

  render() {
    const { isLoading, username } = this.state;
    return (
      <>
        <header data-testid="header-component">
          {isLoading ? <Loading />
            : (
              <div data-testid="header-user-name">
                {username}
              </div>

            )}
        </header>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </>
    );
  }
}

export default Header;

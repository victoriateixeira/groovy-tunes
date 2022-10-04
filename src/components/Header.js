import React from 'react';
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
        <header data-testid="header-component" />
        {isLoading ? <Loading />
          : (
            <div data-testid="header-user-name">
              {username}
            </div>
          )}
      </>
    );
  }
}

export default Header;

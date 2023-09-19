import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.retrieveUser();
  }

  retrieveUser = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    console.log(user);
    this.setState({
      user,
      isLoading: false,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    return (

      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
              <img src={ user.image } alt="" />
              <p>
                Name:
                {user.name}
              </p>
              <p>
                E-mail:

                {user.email}
              </p>
              <p>
                Description:
                {user.description}
              </p>
            </div>
          )}

      </div>
    );
  }
}

export default Profile;

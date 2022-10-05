import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      isLoading: false,
    };
  }

  activateButton = () => {
    const { nameLogin } = this.state;
    const minLength = 3;
    return nameLogin.length >= minLength;
  };

  handleNameChange = (event) => {
    this.setState({
      nameLogin: event.target.value,
    });
  };

  fetchSaveName = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    this.setState(
      {
        isLoading: true,
      },
    );
    await createUser({ name: nameLogin });
    history.push('/search');
  };

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div data-testid="page-login">
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  id="name"
                  data-testid="login-name-input"
                  onChange={ this.handleNameChange }
                />
              </label>
              <button
                type="button"
                disabled={ !this.activateButton() }
                data-testid="login-submit-button"
                onClick={ this.fetchSaveName }
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Login;

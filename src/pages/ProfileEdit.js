import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { updateUser, getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isLoading: false,
      shouldRedirect: false,
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
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      isLoading: false,
    });
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  isSaveButtonDisabled = () => {
    const { name, email, description, image } = this.state;
    const validatesEmail = /\S+@\S+\.\S+/.test(email);
    const validatesName = name.length > 0;
    const validatesDescription = description.length > 0;
    const validatesImage = image.length > 0;
    return validatesDescription && validatesEmail && validatesImage && validatesName;
  };

  onSaveButtonClick = async (event) => {
    event.preventDefault();
    // const navigate = useNavigate();
    this.setState({
      isLoading: true,
    });
    const { name, email, description, image } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({
      isLoading: false,
      shouldRedirect: true,
    });
  };

  render() {
    const { name, email, description, image, isLoading, shouldRedirect } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading />
          : (
            <form>
              <label htmlFor="image">
                Profile photo
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-image"
                  placeholder="insira um link"
                />
              </label>
              <label htmlFor="username">
                Name
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={ name }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-name"
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-email"
                />
              </label>
              <label htmlFor="description">
                Description
                <input
                  type="textarea"
                  name="description"
                  id="description"
                  value={ description }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-description"
                />
              </label>
              <button
                type="submit"
                id="button"
                data-testid="edit-button-save"
                disabled={ !this.isSaveButtonDisabled() }
                onClick={ this.onSaveButtonClick }
              >
                Salvar
              </button>
            </form>
          )}

      </div>
    );
  }
}

export default ProfileEdit;

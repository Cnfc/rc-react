import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';

/** Registration form with built-in validation */
class RegistrationForm extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {},
    submitted: false
  }

  onChange = (e) => {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }

  passwordQuality(password) {
    if (!password) return null;
    if (password.length >= this.props.minPassswordLength) return 100;
    const persentOfMinLength = parseInt(password.length / this.props.minPassswordLength * 100, 10)
    return persentOfMinLength;
  }

  validate({ email, password }) {
    const errors = {};
    const { minPassswordLength } = this.props;
    if (!email) errors.email = "Email required.";
    if (!password.length < minPassswordLength) errors.password = `Password must be at least ${minPassswordLength} characters.`;
    this.setState({ errors })
  }

  onSubmit = () => {
    const { user } = this.state;
    const formIsValid = this.validate(user);
    if (formIsValid) {
      this.props.onSubmit(user);
      this.setState({ submitted: true });
    }
  }



  render() {
    const { errors, submitted } = this.state;
    const { email, password } = this.state.user;

    return (
      submitted ?
        <h2>{this.props.confirmationMessage}</h2> :
        <form>

          <TextInput
            htmlId="registration-form-email"
            name="email"
            onChange={this.onChange}
            label="Email"
            value={email}
            error={error.email}
            required
          />

          <PasswordInput
            htmlId="registration-form-password"
            name="password"
            value={password}
            onChange={this.onChange}
            quality={this.passwordQuality(password)}
            showVisibilityToggle
            maxLength={50}
            error={errors.password}

          />
          <input type="submit" value="Register" onClick={this.onSubmit} />
        </form>
    );
  }
}

export default RegistrationForm;
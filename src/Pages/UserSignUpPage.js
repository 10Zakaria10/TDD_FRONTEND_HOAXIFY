import React from "react";
import Input from '../component/Input';

export class UserSignUpPage extends React.Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    repeatPassword: "",
    pendingApiCall: false,
    errors : {},
    passwordConfirmed : true
  };

  onChangeDisplayName = (event) => {
    const errors = {...this.state.errors};
    delete errors.displayName;
    this.setState({ 
      displayName: event.target.value ,
      errors });
  };
  onChangeUsername = (event) => {
    const errors = {...this.state.errors};
    delete errors.username;
    this.setState({ 
      username: event.target.value,
      errors
     });
  };
  onChangePassword = (event) => {
    const passwordConfirmed = event.target.value === this.state.repeatPassword;
    const errors = {...this.state.errors};
    errors.repeatPassword = passwordConfirmed ? '' : 'Does not match the password';
    delete errors.password;
    this.setState({
       password: event.target.value ,
       passwordConfirmed,
       errors
    });
  };
  onChangeRepeatPassword = (event) => {
    const passwordConfirmed = event.target.value === this.state.password;
    const errors = {...this.state.errors};
    errors.repeatPassword = passwordConfirmed ? '' : 'Does not match the password';
    this.setState({ 
      repeatPassword: event.target.value,
      passwordConfirmed,
      errors
     });
  };

  onClickSignUp = () => {
    const user = {
      username: this.state.username,
      displayName: this.state.displayName,
      password: this.state.password,
    };
    this.setState({ pendingApiCall: true });
    this.props.actions.postSignUp(user).then( response =>{
      this.setState({ pendingApiCall: false });
    })
    .catch(apiError => {
      let errors = {...apiError};
      if(apiError.response.data && apiError.response.data.validationErrors){
        errors = {...apiError.response.data.validationErrors};
      }
      this.setState({ pendingApiCall: false , errors});
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Sign Up</h1>
        <div className="col-12 mb-3">
          <Input
            label = 'Display name'
            className="form-control"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
            hasErrors = {this.state.errors.displayName && true}
            error = {this.state.errors.displayName}
          ></Input>
        </div>
        <div className="col-12 mb-3">
          <Input
            label = 'Username'
            className="form-control"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            hasErrors = {this.state.errors.username && true}
            error = {this.state.errors.username}
          ></Input>
        </div>
        <div className="col-12 mb-3">
          <Input
            label ='Password'
            className="form-control"
            placeholder="Your password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            hasErrors = {this.state.errors.password && true}
            error = {this.state.errors.password}
          ></Input>
        </div>
        <div className="col-12 mb-3">
          <Input
            label ='Repeat password'
            className="form-control"
            placeholder="Repeat your password"
            type="password"
            value={this.state.repeatPassword}
            onChange={this.onChangeRepeatPassword}
            hasErrors = {this.state.errors.repeatPassword && true}
            error = {this.state.errors.repeatPassword}
          ></Input>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={this.onClickSignUp}
            disabled={this.state.pendingApiCall || !this.state.passwordConfirmed}
          >
            {this.state.pendingApiCall && (
              <div className="spinner-border text-light spinner-border-sm mr-sm-1">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            Sign up
          </button>
        </div>
      </div>
    );
  }
}

UserSignUpPage.defaultProps = {
  actions: {
    postSignUp: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
};

export default UserSignUpPage;

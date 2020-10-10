import React from "react";

export class UserSignUpPage extends React.Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    repeatPassword: "",
    pendingApiCall: false,
  };

  onChangeDisplayName = (event) => {
    this.setState({ displayName: event.target.value });
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeRepeatPassword = (event) => {
    this.setState({ repeatPassword: event.target.value });
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
    .catch(error => {
      this.setState({ pendingApiCall: false });
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Sign Up</h1>
        <div className="col-12 mb-3">
          <label>Display name</label>
          <input
            className="form-control"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <label>Username</label>
          <input
            className="form-control"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Your password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <label>Repeat password</label>

          <input
            className="form-control"
            placeholder="Repeat your password"
            type="password"
            value={this.state.repeatPassword}
            onChange={this.onChangeRepeatPassword}
          ></input>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={this.onClickSignUp}
            disabled={this.state.pendingApiCall}
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

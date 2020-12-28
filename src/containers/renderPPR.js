import React from "react";

export default class renderPPR extends React.Component {
  render() {
    const error = 'zak';
    return this.props.children(error);
  }
}

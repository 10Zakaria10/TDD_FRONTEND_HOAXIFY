import React from "react";
import PPR from './renderPPR';

class MiniFormik extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {},
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState((prevState) => ({
        touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur : this.handleBlur
    });
  }
}

export default class Reservation extends React.Component {
  render() {
    return (
        <div>
<PPR>
    {msg => <div>zak and the {msg}</div>}
</PPR>
        
      <MiniFormik
        initialValues={{
          isGoing: true,
          numberOfGuests: 2,
        }}
      >
        {(props) => {
          const { values, handleChange, handleBlur, touched, errors } = props;
          return (
            <form>
              <label>
                Participe :
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={values.isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <br />
              <label>
                Nombre d'invités :
                <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <pre>{JSON.stringify(props,null,2)}</pre>
              </label>
            </form>
          );
        }}
      </MiniFormik>
      </div>
    );
  }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {FormName: '',
                    FormAddress: ''
                  };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      console.log(this.state);
      alert('Submited');
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Nome:
            <input type="text" name="FormName" value={this.state.FormName} onChange={this.handleChange} />
          </label>
          <label>
            Endereço:
            <input type="text" name="FormAddress" value={this.state.FormAddress} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  ReactDOM.render(
    <Form />,
    document.getElementById('root')
  );
  export default Form;
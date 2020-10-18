import React, { Component } from "react";
import ReactDOM from "react-dom";


function renderResponse(response) {
  ReactDOM.render( <h1> {response['fulfillmentText']}</h1>, document.getElementById("response"));

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "São paulo",
      rooms: 2,
      bathroom: 2,
      parkings: 1,
      floor: 8,
      animal: "sim",
      furniture: "não",
      hoa: 400,
      tax: 30,
      fire: 10,
      area: 80,
      data: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    var requestData = require('./data.json');
    requestData['queryResult']['parameters'] = this.state;
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    };
    console.log(JSON.stringify(requestData))
    // componentDidMount();
    try {
      fetch('http://127.0.0.1:5000/rentalparameters', requestOptions)
        .then(response => response.json())
        .then(json => renderResponse(json));

      }
      catch (error) {
        console.error(error);}

    console.log(this.state.data);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Cidade:
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Quartos:
          <input
            type="number"
            name="rooms"
            value={this.state.rooms}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Banheiros:
          <input
            type="number"
            name="bathroom"
            value={this.state.bathroom}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Vagas de estacionamento:
          <input
            type="number"
            name="parkings"
            value={this.state.parkings}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Quantidade de andares:
          <input
            type="number"
            name="floor"
            value={this.state.floor}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Permite animais:
          <input
            type="text"
            name="animal"
            value={this.state.animal}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Mobilhado :
          <input
            type="text"
            name="furniture"
            value={this.state.furniture}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          HOA:
          <input
            type="number"
            name="hoa"
            value={this.state.hoa}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Tax:
          <input
            type="number"
            name="tax"
            value={this.state.tax}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Proteção a incendio:
          <input
            type="number"
            name="fire"
            value={this.state.fire}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Área:
          <input
            type="number"
            name="area"
            value={this.state.area}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById("root"));
export default Form;

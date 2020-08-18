import React, { Component } from "react";
import ReactDOM from "react-dom";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FormCity: "",
      FormRoom: "",
      FormBathroom: "",
      FormParking: "",
      FormFloor: "",
      FormAnimal: "",
      FormFurniture: "",
      FormHoa: "",
      FormTax: "",
      FormFire: "",
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
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ data: data }));
    console.log(this.state);
    alert("Submitted");
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Cidade:
          <input
            type="text"
            name="FormCity"
            value={this.state.FormCity}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Quartos:
          <input
            type="text"
            name="FormRoom"
            value={this.state.FormRoom}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Banheiros:
          <input
            type="text"
            name="FormBathroom"
            value={this.state.FormBathroom}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Vagas de estacionamento:
          <input
            type="text"
            name="FormParking"
            value={this.state.FormParking}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Quantidade de andares:
          <input
            type="text"
            name="FormFloor"
            value={this.state.FormFloor}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Permite animais:
          <input
            type="text"
            name="FormAnimal"
            value={this.state.FormAnimal}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Mobilhado :
          <input
            type="text"
            name="FormFurniture"
            value={this.state.FormFurniture}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          HOA:
          <input
            type="text"
            name="FormHoa"
            value={this.state.FormHoa}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Tax:
          <input
            type="text"
            name="FormTax"
            value={this.state.FormTax}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Proteção a incendio:
          <input
            type="text"
            name="FormFire"
            value={this.state.FormFire}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById("root"));
export default Form;

import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { id, firstname, lastname, phone, address } = props.contact;
    this.state = {
      id,
      firstname,
      lastname,
      phone,
      address,
      errors: props.errors
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contact) {
      const { id, firstname, lastname, phone, address } = nextProps.contact;
      this.setState({
        id,
        firstname,
        lastname,
        phone,
        address
      });
    }
    this.setState({
      errors: nextProps.errors
    });
  }

  handleSubmit(e) {
    this.props.sendContact(this.state);
    e.preventDefault();
  }

  handleCancel(e) {
    this.props.cancel();
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.errors ?
          <div className="form-errors">
            <strong>Errors:</strong>
            <ul className="form-errors">
              {this.state.errors.map( error => (
                <li>{error.message}</li>
              ))}
            </ul>
          </div> :
          null
        }
        <div>
          <label htmlFor="firstname">Firstname</label>
          <input id="firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="lastname">Lastname</label>
          <input id="lastname" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={this.state.phone} onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input id="address" name="address" value={this.state.address} onChange={this.handleChange}/>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

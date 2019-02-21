import React, { Component } from 'react';

import ContactForm from './Form';

export default class ContactsList extends Component {
  componentDidMount() {
    this.props.getContacts();
  }

  handleEdit(item) {
    this.props.editContact(item);
  }

  handleForm(item) {
    if (item.id) {
      this.props.updateContact(item);
    } else {
      this.props.createContact(item);
    }
  }

  renderEmptyList() {
    return (<div className="empty-list">There are no contacts yet</div>)
  }

  renderNotEmptyList(items) {
    return (
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th style={{width: '20%'}}>Actions</th>
          </tr>
        </thead>
      <tbody>
      {items.map( item => (
        <tr key={'c' + item.id}>
          <td>{item.firstname} {item.lastname}</td>
          <td>{item.phone}</td>
          <td>{item.address}</td>
          <td>
            <button onClick={() => this.handleEdit(item) }>Edit</button>
            <button onClick={() => this.props.deleteContact(item)}>Delete</button>
          </td>
        </tr>
      ))}
      </tbody>
      </table>
    )
  }

  render() {
    const { contacts } = this.props;
    const emptyContacts = !contacts || contacts.length === 0;

    const list = emptyContacts
      ? this.renderEmptyList()
      : this.renderNotEmptyList(contacts);

    return (
      <div>
        {this.props.edit ?
          <ContactForm
            contact={this.props.edit}
            errors={this.props.editErrors}
            sendContact={(contact) => this.handleForm(contact)}
            cancel={() => this.props.cancelEdit()} /> :
          <div>
            <button onClick={() => this.handleEdit({})}>New</button>
            {list}
          </div>
        }
      </div>
    );
  }
}

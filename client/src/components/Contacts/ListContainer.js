import { connect } from 'react-redux';
import ContactsList from './List';
import { getContacts, editContact, cancelEdit, createContact, updateContact, deleteContact } from '../../redux/actions/listActions';

const mapStateToProps = ({ items } ) => {
  return {
    selectedContact: items.selectedContact,
    edit: items.edit,
    editErrors: items.editErrors,
    contacts: items.contacts,
    loading: items.loading
  }
};

export default connect(mapStateToProps, { getContacts, editContact, cancelEdit, createContact, updateContact, deleteContact })(ContactsList);

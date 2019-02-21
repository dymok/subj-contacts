import {
  GET_LIST_REQUEST,
  GET_LIST_REQUEST_SUCCESS,
  GET_LIST_REQUEST_FAILURE,
  EDIT_CONTACT,
  EDIT_CANCEL,
  //CREATE_ITEM_REQUEST,
  CREATE_ITEM_REQUEST_SUCCESS,
  CREATE_ITEM_REQUEST_FAILURE,
  UPDATE_ITEM_REQUEST_SUCCESS,
  UPDATE_ITEM_REQUEST_FAUILRE,
  //DELETE_ITEM_REQUEST,
  DELETE_ITEM_REQUEST_SUCCESS,
  //DELETE_ITEM_REQUEST_FAILURE
} from '../actions/listActions';

const initialState = {
  selectedContact: null,
  edit: null,
  editErrors: null,
  contacts: [],
  loading: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_CONTACT:
      return {
        ...state,
        edit: action.contact
      }
    case EDIT_CANCEL:
      return {
        ...state,
        edit: null,
        editErrors: null
      }
    case GET_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.contacts
      }
    case GET_LIST_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case CREATE_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        edit: null,
        editErrors: null,
        contacts: [...state.contacts, action.item]
      }
    case CREATE_ITEM_REQUEST_FAILURE:
      return {
        ...state,
        edit: action.item,
        editErrors: action.errors
      }
    case UPDATE_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        edit: null,
        editErrors: null,
        contacts: state.contacts.map( item => {
          if (item.id === action.item.id) {
            return action.item;
          } else {
            return item;
          }
        })
      }
    case UPDATE_ITEM_REQUEST_FAUILRE:
      return {
        ...state,
        edit: action.item,
        editErrors: action.errors
      }
    case DELETE_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter( contact => contact.id !== action.item.id )
      }
    default:
      return state;
  }
}

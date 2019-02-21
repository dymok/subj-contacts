// Constants to define action types

export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const GET_LIST_REQUEST_SUCCESS = 'GET_LIST_REQUEST_SUCCESS';
export const GET_LIST_REQUEST_FAILURE = 'GET_LIST_REQUEST_FAILURE';

export const EDIT_CONTACT = 'EDIT_CONTACT';
export const EDIT_CANCEL = 'EDIT_CANCEL';

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_REQUEST_SUCCESS = 'CREATE_ITEM_REQUEST_SUCCESS';
export const CREATE_ITEM_REQUEST_FAILURE = 'CREATE_ITEM_REQUEST_FAILURE';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_REQUEST_SUCCESS = 'UPDATE_ITEM_REQUEST_SUCCESS';
export const UPDATE_ITEM_REQUEST_FAUILRE = 'UPDATE_ITEM_REQUEST_FAUILRE';

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_REQUEST_SUCCESS = 'DELETE_ITEM_REQUEST_SUCCESS';
export const DELETE_ITEM_REQUEST_FAILURE = 'DELETE_ITEM_REQUEST_FAILURE';

// Functions which return action objects

export const requestContacts = () => ({ type: GET_LIST_REQUEST } );
export const receiveContacts = (contacts) => ({ type: GET_LIST_REQUEST_SUCCESS, contacts });
export const receiveContactsFail = (error) => ({ type: GET_LIST_REQUEST_FAILURE, error });

export const requestEdit = contact => ({type: EDIT_CONTACT});
export const requestEditCancel = contact => ({type: EDIT_CANCEL});

export const requestCreateItem = () => ({ type: CREATE_ITEM_REQUEST });
export const receiveCreateItem = item => ({ type: CREATE_ITEM_REQUEST_SUCCESS, item });
export const receiveCreateItemFail = errors => ({ type: CREATE_ITEM_REQUEST_FAILURE, errors });

export const requestUpdateItem = () => ({ type: UPDATE_ITEM_REQUEST });
export const receiveUpdateItem = item => ({ type: UPDATE_ITEM_REQUEST_SUCCESS, item });
export const receiveUpdateItemFail = errors => ({ type: UPDATE_ITEM_REQUEST_FAUILRE, errors });

export const requestDeleteItem = () => ({ type: DELETE_ITEM_REQUEST });
export const receiveDeleteItem = item => ({ type: DELETE_ITEM_REQUEST_SUCCESS, item });
export const receiveDeleteItemFail = error => ({ type: DELETE_ITEM_REQUEST_FAILURE, error });

// Action creators

export function getContacts() {
  return async (dispatch) => {
    dispatch(requestContacts());

    const response = await fetch('/api/contacts');
    if (response.ok) {
      const contacts = await response.json();
      dispatch(receiveContacts(contacts));
    } else {
      dispatch(receiveContactsFail({message: response.statusText}));
    }
  }
}


//
export const editContact = contact => {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_CONTACT',
      contact,
    });
  }
}

export const cancelEdit = () => {
  return dispatch => {
    dispatch({type: 'EDIT_CANCEL'});
  }
}

export const createContact = contact => {
  return async (dispatch) => {
    dispatch(requestCreateItem());

    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    if (response.ok) {
      const newItem = await response.json();
      dispatch(receiveCreateItem(newItem));
    } else {
      const respBody = await response.json();
      dispatch(receiveCreateItemFail(respBody.errors));
    }
  }
}

export const updateContact = contact => {
  return async (dispatch) => {
    dispatch(requestUpdateItem());

    const response = await fetch('/api/contacts/' + contact.id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    if (response.ok) {
      const updatedItem = await response.json();
      dispatch(receiveUpdateItem(updatedItem));
    } else {
      const respBody = await response.json();
      dispatch(receiveUpdateItemFail(respBody.errors));
    }
  }
}


export const deleteContact = (contact) => {
  return async (dispatch) => {
    dispatch(requestDeleteItem());
    const response = await fetch('/api/contacts/' + contact.id, { method: 'DELETE' });
    if (response.ok) {
      dispatch(receiveDeleteItem(contact));
    }
  }
}


export const GET_ITEM_REQUEST = 'GET_ITEM_REQUEST';
export const GET_ITEM_REQUEST_SUCCESS = 'GET_ITEM_REQUEST_SUCCESS';
export const GET_ITEM_REQUEST_FAILURE = 'GET_ITEM_REQUEST_FAILURE';

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_REQUEST_SUCCESS = 'CREATE_ITEM_REQUEST_SUCCESS';
export const CREATE_ITEM_REQUEST_FAILURE = 'CREATE_ITEM_REQUEST_FAILURE';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_REQUEST_SUCCESS = 'UPDATE_ITEM_REQUEST_SUCCESS';
export const UPDATE_ITEM_REQUEST_FAUILRE = 'UPDATE_ITEM_REQUEST_FAUILRE';

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_REQUEST_SUCCESS = 'DELETE_ITEM_REQUEST_SUCCESS';
export const DELETE_ITEM_REQUEST_FAILURE = 'DELETE_ITEM_REQUEST_FAILURE';

export const requestItem = () => ({ type: GET_ITEM_REQUEST });
export const receiveItem = item => ({ type: GET_ITEM_REQUEST_SUCCESS, item });
export const receiveItemFail = error => ({ type: GET_ITEM_REQUEST_FAILURE, error });

export const requestDeleteItem = () => ({ type: DELETE_ITEM_REQUEST });
export const receiveDeleteItem = () => ({ type: DELETE_ITEM_REQUEST_SUCCESS });
export const receiveDeleteItemFail = error => ({ type: DELETE_ITEM_REQUEST_FAILURE, error });

export const getItem = (id) => {
  return async (dispatch, getState) => {
    console.log('get');
    dispatch(requestItem());

    const items = getState().items;
    const item = items.find( el => el.id === id );

    if (item) {
      dispatch(receiveItem(item));
    } else {
      // TODO: request items from server
    }
  }
}

export const createItem = (item) => {
  return async (dispatch, getState) => {
    console.log('create');
  }
}

export const updateItem = (item) => {
  return async (dispatch, getState) => {
    console.log('update');
  }
}

export const deleteItem = (item) => {
  return async (dispatch, getState) => {
    console.log('delete', item);
    dispatch(requestDeleteItem());
    const response = await fetch('/api/contacts/' + item.id, { method: 'DELETE' });
    if (response.ok) {
      dispatch(receiveDeleteItem());
    }
  }
}

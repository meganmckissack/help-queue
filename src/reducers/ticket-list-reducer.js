// Reducers are always pure functions. This makes them much easier to test. For this reason, they will never directly alter state in our application. 
// All a reducer cares about is taking a thing, applying an action to a copy of that thing, and then returning the altered copy. 
// It doesn't know anything else about our application such as how state will be stored or applied in the UI

// Reducers use a switch case to determine which action should be taken. 

// Action types are strings. The name of the action should be capitalized with all words being separated by underscores.

import * as c from './../actions/ActionTypes';

const reducer = (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action;

  switch(action.type) {
    case c.ADD_TICKET:
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue, 
          id: id,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime
        }
      });
    case c.DELETE_TICKET:
        let newState = { ...state };
        delete newState[id];
        return newState;

    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], {formattedWaitTime});
      const updatedState = Object.assign({}, state, {
        [id]: newTicket
      });
      return updatedState;
    default:
      return state;
  }
};

export default reducer;
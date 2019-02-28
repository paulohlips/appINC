import { combineReducers } from 'redux';

import newState from './new';
import formState from './form';
import histState from './hist';

export default combineReducers({
  newState,
  formState,
  histState,
});

/*empty: (state = {}) => state,*/

import { combineReducers } from '@reduxjs/toolkit';

import notes from '../slices/note';
import detail from '../slices/detail';

export default combineReducers({
  notes,
  detail
});
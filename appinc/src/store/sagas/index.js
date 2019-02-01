import { all, takeLatest } from 'redux-saga/effects';

import { Types as NewActions } from '../ducks/new';
import { getNewRequest } from './new';

export default function* rootSaga() {
  return yield all([
    takeLatest(NewActions.GET_REQUEST, getNewRequest),
  ]);
}

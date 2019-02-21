import api from '../../services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as NewActions } from '../ducks/new';

export function* getNewRequest(action) {
  try {
    const response = yield call(api.get, `/pericia/formularios/${action.payload.number}`);
    yield put(NewActions.getNewSucsses(response.data));
  } catch (erro) {
    yield put(NewActions.getNewFailure('Não foi possivel carregar o formulario'));
  }
}

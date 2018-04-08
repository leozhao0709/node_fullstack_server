import { all, takeLatest } from 'redux-saga/effects';
import { AuthActionType } from '../actions/authActions';
import { AuthSaga } from './authSaga/authSaga';

export function* watchAuthSaga() {
    yield all([
        takeLatest(AuthActionType.FETCH_USRER, AuthSaga),
    ]);
}
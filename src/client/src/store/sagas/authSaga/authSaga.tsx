import { AuthActions } from '../../actions/authActions';
import { put } from 'redux-saga/effects';
import Axios from 'axios';

export function* AuthSaga() {
    const res = yield Axios.get('/auth/google/current_user');
    yield put(AuthActions.fetch_user_finish(res.data));
}
import { userActions, UserAction } from '../../actions/userActions';
import { put } from 'redux-saga/effects';
import Axios from 'axios';

export function* userAuthSaga() {
    const res = yield Axios.get('/auth/google/current_user');
    if (res.data === '') {
        res.data = null;
    }
    yield put(userActions.fetch_user_finish(res.data));
}

export function* userAddCreditsSaga(action: UserAction) {
    const res = yield Axios.post('/payment/paycredits', action.payload);
    if (res.status === 200) {
        yield put(userActions.fetch_user_finish(res.data));
    }
}
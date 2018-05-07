import Axios from 'axios';
import { SurveyAction } from '../../actions/surveyActions';
import { put } from 'redux-saga/effects';
import { userActions } from '../../actions/userActions';

export function* sendSurveySaga(action: SurveyAction) {
    const res = yield Axios.post('/surveys', action.payload);

    if (res.status === 200) {
        yield put(userActions.fetch_user_finish(res.data));
    }
}

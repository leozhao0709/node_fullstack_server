import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { UserActionType } from '../actions/userActions';
import { userAuthSaga, userAddCreditsSaga } from './user/userSaga';
import { SurveyActionType } from '../actions/surveyActions';
import { sendSurveySaga } from './survey/surveySaga';

export function* watchAuthSaga() {
    yield all([
        takeLatest(UserActionType.FETCH_USRER, userAuthSaga),
        takeEvery(UserActionType.ADD_CERDITS, userAddCreditsSaga),
        takeLatest(SurveyActionType.SEND_SURVEY, sendSurveySaga)
    ]);
}

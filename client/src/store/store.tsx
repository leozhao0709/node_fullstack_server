import { createStore, combineReducers, applyMiddleware } from 'redux';
import AuthReducer, { AuthState } from './reducers/userReducer';
import createSagaMiddleware from 'redux-saga';
import { watchAuthSaga } from './sagas';

export interface StoreState {
    auth: AuthState;
}

const rootReducer = combineReducers({
    auth: AuthReducer,
});

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuthSaga);

export default Store;
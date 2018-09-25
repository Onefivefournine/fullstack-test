import { all } from 'redux-saga/effects'
import { fetchDataWatcher } from './fetch-data'

export default function* rootSaga() {
    yield all( [
        fetchDataWatcher(),
    ] );
}
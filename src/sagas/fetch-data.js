import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../api'

console.log( Api )
export function* fetchData() {
    try {
        const data = yield call( Api.fetchUrl.bind( Api ), '/data' )
        yield put( { type: 'DATA_RECEIVED', data } )
    } catch ( e ) {
        yield put( { type: 'FETCH_FAILED', reason: e.message } )
    }
}

export function* fetchDataWatcher() {
    yield takeLatest( 'FETCH_DATA', fetchData )
}
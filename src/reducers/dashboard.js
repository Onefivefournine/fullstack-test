const initialState = {
    isLoading: false,
    fetchError: false,
    fetchErrorReason: '',
    data: {}
}
export default function dashboardReducer( state = initialState, action ) {
    switch ( action.type ) {
        case 'FETCH_DATA':
            return {
                ...state,
                isLoading: true,
            }
        case 'DATA_RECEIVED':
            return {
                ...state,
                isLoading: false,
                data: action.data,
            }
        case 'FETCH_FAILED':
            return {
                ...state,
                isLoading: false,
                fetchError: true,
                fetchErrorReason: action.reason
            }
        default:
            return state
    }
}
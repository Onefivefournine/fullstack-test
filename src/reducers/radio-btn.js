const initialState = {
  value: '_yesterday'
};
export default function radioBtnReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_RADIO_BTN':
      return {
        ...state,
        value: action.value
      };
    default:
      return state;
  }
}

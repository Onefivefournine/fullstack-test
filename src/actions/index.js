export function fetchData() {
  return {
    type: 'FETCH_DATA'
  };
}
export function selectRadioBtn(value) {
  return {
    type: 'SELECT_RADIO_BTN',
    value
  };
}

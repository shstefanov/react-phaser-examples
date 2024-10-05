import * as testReducers from "store/test.reducer";

export const reset    = dispatch => payload => dispatch({ type: testReducers.TEST_RESET,    payload });
export const increase = dispatch => payload => dispatch({ type: testReducers.TEST_INCREASE, payload });
export const decrease = dispatch => payload => dispatch({ type: testReducers.TEST_DECREASE, payload });
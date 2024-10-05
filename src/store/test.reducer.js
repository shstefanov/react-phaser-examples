export const TEST_RESET    = "/TEST/RESET";
export const TEST_INCREASE = "/TEST/INCREASE";
export const TEST_DECREASE = "/TEST/DECREASE";

const defaultState = () => ({
  value: 0,
  obj: new Map(),
});

export default (state = defaultState(), action) => {
  switch(action.type){
    case TEST_RESET:    return defaultState();
    case TEST_INCREASE: return { ...state, value: state.value + 1 };
    case TEST_DECREASE: return { ...state, value: state.value - 1 };
    default: return state;
  }
}
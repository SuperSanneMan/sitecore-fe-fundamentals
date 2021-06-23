const useStateReducer = (state, action) => {
  if(action.type === 'set-settings') {
    return { ...state, settings: action.payload }
  }
  if(action.type === 'set-items') {
    return { ...state, items: action.payload }
  }
  if(action.type === 'set-sprints') {
    return { ...state, sprints: action.payload }
  }
  if(action.type === 'new-item') {
    state.items.push(action.payload);
    return { ...state }
  }
  if(action.type === 'save-item') {
    const index = state.items.findIndex((item) => Number(item.id) === Number(action.payload.id));
    state.items[index] = action.payload;
    return { ...state }
  }
  if(action.type === 'remove-item') {
    const index = state.items.findIndex((item) => Number(item.id) === Number(action.payload));
    state.items.splice(index, 1);
    return { ...state }
  }
}

export default useStateReducer
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(window.localStorage.getItem("todoState")) || [];

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  /**
   * redux toolkit 내부적으로 immer.js 를 사용해서 state에 대한 immutable을 처리하고 있기 때문에
   * state를 mutate 시킬때는 리턴하지 않고, immutable 조작하는 경우에만 return 시킨다.
   **/
  reducers: {
    add: (state, action) => {
      state.unshift({ text: action.payload, id: Date.now(), done: false });
      saveToLocalStorage(state);
    },
    toggle: (state, action) => {
      state.forEach((item) => {
        if (item.id === parseInt(action.payload)) {
          item.done = !item.done;
        }
      });
      saveToLocalStorage(state);
    },
    remove: (state, action) => {
      const newState = state.filter((item) => item.id !== parseInt(action.payload));
      saveToLocalStorage(newState);
      return newState;
    },
    update: (state, action) => {
      state.forEach((item) => {
        if (item.id === parseInt(action.payload.id)) {
          item.text = action.payload.text;
          item.updatedAt = Date.now();
        }
      });
      saveToLocalStorage(state);
    },
  },
});

const saveToLocalStorage = (state) => {
  window.localStorage.setItem("todoState", JSON.stringify(state));
};

export const { add, toggle, remove, update } = todoSlice.actions;

const store = configureStore({ reducer: { todo: todoSlice.reducer } });
export default store;

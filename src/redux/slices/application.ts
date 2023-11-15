import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../types';

const initialState: IState = {
  currentPage: 1,
  searchString: localStorage.getItem('searchString') || '',
  list: [],
  isLoading: true,
  countElements: 0,
  itemsPerPage: 10,
  currentElement: '',
};

const catalogSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setSearchString(state, action) {
      localStorage.setItem('searchString', action.payload);
      state.searchString = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setCurrentElement(state, action) {
      state.currentElement = action.payload;
    },
  },
});

export const { setSearchString, setCurrentPage, setCurrentElement } =
  catalogSlice.actions;

export default catalogSlice.reducer;

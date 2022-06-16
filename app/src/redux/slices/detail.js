import { createSlice } from '@reduxjs/toolkit';
import { getNote } from '../../services/note';

const initialState = {
  isLoading: false,
  data: {},
  error: {}
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    fetchDetailStart(state) {
      state.isLoading = true;
    },
    fetchDetailComplete(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDetailError(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

export const {
  fetchDetailStart,
  fetchDetailComplete,
  fetchDetailError
} = detailSlice.actions;

export const fetchDetail = (noteId) => async (dispatch) => {
  try {
    dispatch(fetchDetailStart());
    const note = await getNote(noteId);
    dispatch(fetchDetailComplete(note));
  } catch (error) {
    dispatch(fetchDetailError(error));
  }
};

export const isLoadingDetail = state => state.detail.isLoading;
export const completeDetail = state => state.detail.data;
export const errorDetail = state => state.detail.error;

export default detailSlice.reducer;
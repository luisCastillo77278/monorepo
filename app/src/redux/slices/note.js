import { createSlice } from '@reduxjs/toolkit';
import { getNotes, updateNote, createNote } from '../../services/note';

const initialState = {
  isLoading: false,
  data: [],
  error: {}
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchNoteStart(state) {
      state.isLoading = true;
    },
    fetchNotesComplete(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchToggleImportant(state, action) {
      state.data = state.data.map((n => n.id !== action.payload.id ? n : action.payload));
    },
    fetchAddNotes(state, action) {
      state.data = [action.payload, ...state.data];
    },
    fetchNoteError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});


export const {
  fetchNoteStart,
  fetchNotesComplete,
  fetchNoteError,
  fetchToggleImportant,
  fetchAddNotes
} = noteSlice.actions;

// caction creator
export const fetchNotes = () => async (dispatch) => {
  try {
    dispatch(fetchNoteStart());
    const notes = await getNotes();
    dispatch(fetchNotesComplete(notes));
  } catch (error) {
    dispatch(fetchNoteError(error));
  }
};

export const toggleImportant = (changeNote) => async (dispatch) => {
  try {
    const { response, user } = await updateNote(changeNote.id, changeNote);
    dispatch(fetchToggleImportant({ ...response, user }));
  } catch (error) {
    dispatch(fetchNoteError(error));
  }
};

export const fetchDataAdd = (newNote) => async (dispatch) => {
  try {
    const note = await createNote(newNote);
    dispatch(fetchAddNotes(note));
  } catch (error) {
    dispatch(fetchNoteError(error));
  }
};

export const isLoadingNote = state => state.notes.isLoading;
export const completeNote = state => state.notes.data;
export const errorNote = state => state.notes.error;

export default noteSlice.reducer;
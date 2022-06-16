import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Note from '../components/Note';
import { completeNote, fetchNotes, isLoadingNote, toggleImportant } from '../redux/slices/note';

const Notes = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingNote);
  const notes = useSelector(completeNote);
  const [showAll, setShowAll] = useState(false);

  const handleToggleImporntant = async (id) => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };
    dispatch(toggleImportant(changeNote));
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);


  const noteShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <Button
        variant="danger"
        className='my-4'
        onClick={() => setShowAll(!showAll)}
      >show {showAll ? 'important' : 'all'}</Button>

      {
        isLoading && (<div className="text-center my-3">
          <Spinner animation="border" role="status">
          </Spinner>
        </div>)
      }

      {
        !isLoading && (<Table striped hover bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Tool</th>
            </tr>
          </thead>
          <tbody>
            {
              noteShow.map((note, index) => (
                <Note
                  key={note.id}
                  number={index + 1}
                  note={note}
                  handleToggle={() => handleToggleImporntant(note.id)}
                />
              ))
            }

          </tbody>
        </Table>)
      }
    </div>
  );

};

export default Notes;
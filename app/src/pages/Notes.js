import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Note from '../components/Note';
import { updateNote, getNotes } from '../services/note';

const Notes = ({
  notes,
  setNotes
}) => {

  const [showAll, setShowAll] = useState(true);

  const handleToggleImporntant = async (id) => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };

    const noteUpdate = await updateNote(id, changeNote);
    setNotes(notes.map(n => n.id !== id ? n : noteUpdate));
  };

  useEffect(() => {
    getNotes()
      .then(resp => {
        setNotes([...resp]);
      });
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

      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Tool</th>
          </tr>
        </thead>
        <tbody>
          {
            noteShow.map(note => (
              <Note
                key={note.id}
                note={note}
                handleToggle={() => handleToggleImporntant(note.id)}
              />
            ))
          }

        </tbody>
      </Table>
    </div>
  );

};

export default Notes;
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Note = ({
  note,
  handleToggle,
  number
}) => {
  const label = note.important
    ? 'make not important' : 'make important';

  return (
    <tr>
      <td>
        {number}
      </td>
      <td>
        <Link to={`/notes/${note.id}`}>
          {note.content}
        </Link>
      </td>
      <td>
        {note.user.username}
      </td>
      <td>
        <Button variant='info' onClick={handleToggle}>{label}</Button>
      </td>
    </tr>
  );
};



export default Note;
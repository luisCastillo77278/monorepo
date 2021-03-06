import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import Toggable from './Toggable';


import { fetchDataAdd } from '../redux/slices/note';

const FormNote = ({
  user
}) => {

  const refElement = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState({
    content: '',
    important: true
  });

  const handleAddNote = async (e) => {
    e.preventDefault();
    dispatch(fetchDataAdd(newNote));
    setNewNote({ content: '', important: true });

    refElement.current.toggleVisibility();
    navigate('/notes');
  };

  return (
    < Toggable
      label="New Note"
      ref={refElement}
    >
      <div>
        <h2>{user}</h2>
        <Form onSubmit={handleAddNote}>
          <Form.Group className="mb-3">
            <Form.Control
              value={newNote.content}
              type="text"
              placeholder="Note..."
              onChange={e => setNewNote({ ...newNote, content: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select className='form-control' onChange={e => setNewNote({ ...newNote, important: Boolean(e.target.value) })}>
              <option value="true">important</option>
              <option value="false">not important</option>
            </Form.Select>
          </Form.Group>
          <Button className='my-3' type='submit'>Save</Button>
        </Form>
      </div>
    </Toggable>
  );
};

export default FormNote;
import React, { Button } from 'react-bootstrap';
import FormNote from '../components/FormNote';

const CreateNote = ({
  handleLogout,
  notes,
  setNotes,
  user
}) => (
  <div>
    <Button variant='danger' className='mt-4 mb-2' onClick={handleLogout}>Logout</Button>
    <FormNote
      user={user.username}
      notes={notes}
      setNotes={setNotes}
    />
  </div>
);
export default CreateNote;
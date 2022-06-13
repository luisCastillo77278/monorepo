import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';

// eslint-disable-next-line react/display-name
const Toggable = forwardRef(({ children, label }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };


  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className='mb-4' variant='success' onClick={toggleVisibility}>{label}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <br />
        <Button variant='dark' className='mb-4' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

export default Toggable;
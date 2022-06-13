import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../services/user';

const FormLogin = ({
  setLogin
}) => {

  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await login(form);
    window.localStorage.setItem('session', JSON.stringify(user));
    setLogin(user);
    setForm({ username: '', password: '' });
    navigate(state.location.pathname || '/');
  };

  return (

    <Form className='my-4' onSubmit={handleLogin}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>

        <Form.Control
          type="text"
          placeholder="username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          placeholder="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </Form.Group>

      <Button type='submit' className='btn-block my-3'>Login</Button>

    </Form>

  );
};

export default FormLogin;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import axios from '../../lib/api';

export const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSignup = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      const response = await axios.post('auth/signup', { email, password });
      
      if (response.status !== StatusCodes.CREATED) {
        alert('Invalid credentials. Please try again.');
        return;
      }
  
      navigate('/signin');
    }

    setValidated(true);
  };

  return (
    <div>
      <h1>Sign up</h1>

      <Form noValidate validated={validated} onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <Form.Control.Feedback type="invalid">Field required</Form.Control.Feedback>
        </Form.Group>
        <ButtonGroup>
          <Button type="submit" >Submit</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/signin')}>Sign in</Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}
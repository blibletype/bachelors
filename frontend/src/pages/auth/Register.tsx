import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { api } from '../../lib/api';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/login');
      }

      console.log('Sign up successful', response.data);
    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <Input
            type="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            isRequired
            className="max-w-sm px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            isRequired
            className="max-w-sm px-3 py-2"
          />
        </div>
        <Button
          className="w-full py-2"
          color="primary"
          variant="ghost"
          type="submit"
        >
          Sign Up
        </Button>
        <div className="mt-4 text-center">
          <p className="mb-2">Already have an account?</p>
          <Button
            className="w-full py-2"
            color="primary"
            variant="shadow"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

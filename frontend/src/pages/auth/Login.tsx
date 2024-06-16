import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { api } from '../../lib/api';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const token = localStorage.getItem('accessToken');

  if (token) {
    navigate('/');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      setIsEmailInvalid(true);
      setIsPasswordInvalid(true);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailInvalid(false);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordInvalid(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <Input
            type="email"
            label="email"
            defaultValue="max@koval.com"
            value={email}
            onChange={onEmailChange}
            required
            isRequired
            isInvalid={isEmailInvalid}
            errorMessage="Please enter a valid email"
            className="max-w-sm px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            label="password"
            value={password}
            onChange={onPasswordChange}
            required
            isRequired
            isInvalid={isPasswordInvalid}
            errorMessage="Please enter a valid password"
            className="max-w-sm px-3 py-2"
          />
        </div>
        <Button
          className="w-full py-2"
          color="primary"
          variant="ghost"
          type="submit"
        >
          Login
        </Button>
        <div className="mt-4 text-center">
          <p className="mb-2">Don't have an account?</p>
          <Button
            className="w-full py-2"
            color="primary"
            variant="shadow"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

// src/components/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';
import { login } from '../../services/authService';

// Mocking the login function from authService
jest.mock('../../services/authService', () => ({
  login: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Usuario:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  test('updates input fields on change', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Usuario:/i);
    const passwordInput = screen.getByLabelText(/Contraseña:/i);

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'testpassword');

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  test('handles form submission and navigates on success', async () => {
    login.mockResolvedValue({
      token: 'fake-token',
      user: { id: 1, name: 'Test User' },
      empleado: { id: 2, name: 'Empleado' },
      tipoDeUsuario: 'admin',
      rol: 'manager',
      departamento: 'IT',
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Usuario:/i);
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'testpassword');
    fireEvent.click(submitButton);

    expect(login).toHaveBeenCalledWith('testuser', 'testpassword');
    await screen.findByRole('button', { name: /Iniciar sesión/i });

    expect(mockNavigate).toHaveBeenCalledWith('Layout');
  });

  test('shows error message on login failure', async () => {
    login.mockRejectedValue(new Error('Usuario o contraseña incorrectos'));

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Usuario:/i);
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    userEvent.type(usernameInput, 'wronguser');
    userEvent.type(passwordInput, 'wrongpassword');
    fireEvent.click(submitButton);

    expect(login).toHaveBeenCalledWith('wronguser', 'wrongpassword');
    await screen.findByRole('button', { name: /Iniciar sesión/i });

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });
});

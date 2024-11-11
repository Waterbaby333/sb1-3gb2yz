import React from 'react';
import { useAuthStore } from '../store/authStore';
import Login from './Login';
import Dashboard from './Dashboard';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Dashboard /> : <Login />;
}</content>
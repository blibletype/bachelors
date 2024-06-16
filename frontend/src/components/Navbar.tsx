import React from 'react';
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import { Logout } from './auth/Logout';

export const Navbar: React.FC = () => {
  const path = window.location.pathname;
  const token = localStorage.getItem('accessToken');

  return (
    <NextNavbar position="static">
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem isActive={path === '/'}>
          <Link href="/">Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {token && <Logout />}
        {!token && path !== '/login' && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </NextNavbar>
  );
};

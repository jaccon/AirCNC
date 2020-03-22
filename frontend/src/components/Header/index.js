import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <Link to={'/'}>
      <img src={logo} alt="AirCnC" width="150" />
    </Link>
  );
}

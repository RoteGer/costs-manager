/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Navbar = styled.nav`
  position: sticky;
  top: 0;
  background-color: #a8c2b5;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center items */
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  margin-right: 1.5rem;

  &:last-child {
    margin-right: 0;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.4rem;
  text-decoration: none;
  font-weight: bold;
  font-family: Calibri, serif;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #333333; /* Highlight link color on hover */
  }
`;
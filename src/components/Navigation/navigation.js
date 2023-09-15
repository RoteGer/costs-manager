/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import {Navbar, NavItem, NavList, NavLink} from './styled';
import {formLinkText, expensesLinkText, formRoute, expensesRoute, chartRoute} from '../../consts';

/* This component defines a Navbar component with the form's route and the expenses route */
const Navigation = () => {
    return (
        <Navbar>
            <NavList>
                <NavItem>
                    <NavLink to={formRoute}>{formLinkText}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={expensesRoute}>{expensesLinkText}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={chartRoute}>Chart</NavLink>
                </NavItem>
            </NavList>
        </Navbar>
    );
};

export default Navigation;
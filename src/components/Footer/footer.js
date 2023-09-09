/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import { FooterContainer, FooterText } from './styled';
import { copyrightsMessage } from '../../consts';

/* This component defines a footer for our copyrights footer in the table's page */
const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>
                &copy; {copyrightsMessage} {new Date().getFullYear()} &copy;
            </FooterText>
        </FooterContainer>
    );
};

export default Footer;
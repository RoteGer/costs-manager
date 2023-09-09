/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import styled from 'styled-components';
import backgroundImage from './background.jpg'; // Import your background image URL

export const StyledHeader = styled.h1`
  color: #333; /* Dark gray text color */
  font-size: 2.5rem; /* Larger font size */
  margin: 20px 0; /* Adjusted margin for spacing */
  font-weight: bold;
  text-align: center;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Vertically center content */
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundImage}); /* Set the background image */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
  padding: 20px; /* Added padding for spacing */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added subtle box shadow */
`;

// Additional styles for a centered content container
export const ContentContainer = styled.div`
  max-width: 800px; /* Set a maximum width for content */
  width: 100%;
`;

// Additional styles for a centered text paragraph
export const StyledParagraph = styled.p`
  font-size: 1.2rem; /* Adjusted font size */
  color: #555; /* Slightly darker gray text color */
  text-align: center;
  margin-top: 20px;
`;

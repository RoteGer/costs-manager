import React from 'react';
import { StyledHeader, PageContainer } from './styled';

/* This component defines a reusable page component for the form and table pages to use */
const Page = ({ component, title }) => {
    return (
        <PageContainer>
            <StyledHeader>{title}</StyledHeader>
            {component}
        </PageContainer>
    );
};
export default Page;
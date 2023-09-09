import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const FormInput = styled.input`
  padding: 15px 20px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-color: #2aaa8a;
  }
`;

export const FormSelect = styled.select`
  padding: 15px 20px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold; /* Add bold text */
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-color: #2aaa8a;
  }
`;

export const FormTextArea = styled.textarea`
  padding: 15px 20px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
  min-height: 100px;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-color: #2aaa8a;
  }
`;

export const FormButton = styled.button`
  padding: 15px 40px;
  margin: 20px 0;
  font-size: 18px;
  font-weight: bold; /* Add bold text */
  border-radius: 8px;
  background-color: #2aaa8a;
  color: #fff;
  width: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #1a7a60;
  }
  &:focus {
    outline: none;
  }
`;

export const FormLabel = styled.label`
  font-size: 18px;
  margin: 10px 0;
  color: #333;
  font-weight: bold; /* Add bold text */
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

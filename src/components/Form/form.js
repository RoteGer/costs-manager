/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import React, {useState} from 'react';
import FormField from '../FormField/formfield';
import {
    category,
    expenseItem,
    description,
    categoriesOptions,
    pickDate,
    costItem,
    chooseCategoryText,
    submitText,
} from '../../consts.js';
import {
    FormButton,
    FormContainer,
} from './styled';
import {addCost} from '../../idb.js';
import {useSnackbar} from 'notistack';

// Getting default day as today
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
const day = String(currentDate.getDate()).padStart(2, '0');  // Day is 0-based

const initialDate = `${year}-${month}-${day}`;

const Form = () => {
    /* The useSnackbar hook returns an object that includes a function called enqueueSnackbar.
     This function takes two parameters: the message to display and an options object that defines
      the appearance and behavior of the snack bar. */
    const {enqueueSnackbar} = useSnackbar();

    /* This function takes a message as a parameter and calls enqueueSnackbar with the message and
     some options that define the position and style of the snack bar, including a variant of 'success'. */
    const showSuccess = (message) => {
        enqueueSnackbar(message, {
            anchorOrigin: {vertical: 'top', horizontal: 'right'},
            variant: 'success',
        });
    };

    /* This function takes a message as a parameter and calls enqueueSnackbar with the message and
     some options that define the position and style of the snack bar, including a variant of 'error'. */
    const showError = (message) => {
        enqueueSnackbar(message, {
            anchorOrigin: {vertical: 'top', horizontal: 'right'},
            variant: 'error',
        });
    };


    /* This code initializes the value of formData as an object
     with five properties which are later provided by the user filling the form.
     The setFormData function returned by the useState hook is used to update the formData state variable.
      This is done in response to user input, such as when the user enters a value into a form field. */
    const [formData, setFormData] = useState({
        expenseItem: '',
        category: '',
        description: '',
        date: initialDate,
        costItem: 0,
    });

    /* This function is called when the user changes a value in a form field. It takes an
     event object as a parameter, which represents the event that triggered the change. The
      function uses the setFormData function returned by the useState hook to update the formData
       state variable. It does this by creating a new object using the spread operator to copy the
        existing formData object, and then setting the property with the name of the changed field to
         the new value. */
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    /* This function prevents form default behavior, generates a new expense object and adds it to
    indexeddb. If successful, it shows a success message and resets the form data, or shows an
     error message and leaves the form data unchanged if it fails. */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = Date.now(); // Generate a unique ID (you can use a different method for generating IDs)
        const expenseItem = event.target.elements.expenseItem.value; // Get the value to be stored
        const costItem = event.target.elements.costItem.value; // Get the item cost
        const category = event.target.elements.category.value; // Get the item category
        const description = event.target.elements.description.value; // Get the item description
        const date = event.target.elements.date.value; // Get the item date
        const expense = {
            id: id,
            expenseItem: expenseItem,
            costItem: costItem,
            category: category,
            description: description,
            date: date
        };

        try {
            await addCost(expense); // Use the addCost function to add the expense to IndexedDB
            const message = 'Successfully added item!';
            showSuccess(message);
        } catch (error) {
            const message = `Item not added due to error: ${error}`;
            showError(message);
        }
        setFormData({
            expenseItem: '',
            category: '',
            description: '',
            date: initialDate,
            costItem: 0,
        });
    };
    const options = [
        {value: '', label: chooseCategoryText, disabled: true, hidden: true},
        ...categoriesOptions.map((option) => ({value: option, label: option}))
    ];

    /* This is a form component that takes user inputs for an expense item, its cost,
     category, description, and date. It uses the useState and handleChange hook to update the form
      data whenever the user enters something in the input fields, and the handleSubmit function to
       submit the form data to IndexedDB. The component returns a form that contains several
        input fields and a submit button. */
    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormField
                type='text'
                label={expenseItem}
                name='expenseItem'
                value={formData.expenseItem}
                onChange={handleChange}
                required
            />
            <FormField
                type='number'
                min='0'
                label={costItem}
                name='costItem'
                value={formData.costItem}
                onChange={handleChange}
                required
            />
            <FormField
                name='category'
                label={category}
                element={'select'}
                options={options}
                value={formData.category}
                onChange={handleChange}
                required
            />
            <FormField
                element={'textarea'}
                name='description'
                label={description}
                rows={5}
                cols={30}
                value={formData.description}
                onChange={handleChange}
                required
            />
            <FormField
                type='date'
                name='date'
                min='2020-01-01'
                label={pickDate}
                max={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
                required
            />
            <FormButton type='submit'>{submitText}</FormButton>
        </FormContainer>
    );
};

export default Form;
// Open or create the IndexedDB database
const openCostsDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('costsDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(`Error opening database: ${event.target.error}`);
        };
    });
};

// An asynchronous function that retrieves expense data from IndexedDB
export const getExpense = async () => {
    const db = await openCostsDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['expenses'], 'readonly');
        const objectStore = transaction.objectStore('expenses');

        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const expenses = event.target.result;
            resolve(expenses || []);
        };

        request.onerror = (event) => {
            reject(`Error retrieving expenses: ${event.target.error}`);
        };
    });
};

// An asynchronous function that saves the provided expenses to IndexedDB
export const setExpense = async (expenses) => {
    const db = await openCostsDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['expenses'], 'readwrite');
        const objectStore = transaction.objectStore('expenses');

        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = () => {
            const addRequest = objectStore.add(expenses);

            addRequest.onsuccess = () => {
                resolve();
            };

            addRequest.onerror = (event) => {
                reject(`Error saving expenses: ${event.target.error}`);
            };
        };

        clearRequest.onerror = (event) => {
            reject(`Error clearing expenses: ${event.target.error}`);
        };
    });
};

/// An asynchronous function that adds a new expense object to IndexedDB
export const addExpense = async (expense) => {
    try {
        const db = await openCostsDB();

        // Start a new transaction for adding an expense
        const transaction = db.transaction(['expenses'], 'readwrite');
        const store = transaction.objectStore('expenses');

        // Add the expense to the store; IndexedDB will automatically generate a unique key
        const request = store.add(expense);

        request.onsuccess = () => {
            console.log('Expense added successfully with key: ' + request.result);
        };

        request.onerror = (event) => {
            console.error('Error adding expense: ' + event.target.error);
        };
    } catch (error) {
        console.error(`Error adding expense: ${error}`);
    }
};

// An asynchronous function that deletes an expense object from IndexedDB
export const deleteExpense = async (expenseId) => {
    const expenses = await getExpense();
    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
    await setExpense(updatedExpenses);
    return updatedExpenses;
};

// An asynchronous function that updates an existing expense object in IndexedDB
export const editExpense = async (expense) => {
    const expenses = await getExpense();
    const index = expenses.findIndex((exp) => exp.id === expense.id);
    if (index !== -1) {
        expenses[index] = expense;
        await setExpense(expenses);
    }
    return expenses;
};
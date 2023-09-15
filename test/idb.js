/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

const idb = {};

idb.costsObjectStore = null;

// Open or create the IndexedDB database
idb.openCostsDB = (name, version) => new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('expenses', {keyPath: 'id', autoIncrement: true});
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
        db.addCost = async (expense) => {
            try {
                const db = await idb.openCostsDB(name, version);

                // Start a new transaction for adding an expense
                const transaction = db.transaction('expenses', 'readwrite');
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
    };

    request.onerror = (event) => {
        reject(`Error opening database: ${event.target.error}`);
    };
});

window.idb = idb;
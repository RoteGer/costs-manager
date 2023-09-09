/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

const countByCategory = (expenses, category) => {
    let count = 0;
    expenses.forEach((expense) => {
        if (expense.category === category) {
            count++;
        }
    });
    return count;
};
export default countByCategory;
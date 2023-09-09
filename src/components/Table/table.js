/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import React, { useEffect, useState } from "react";
import {
    StyledTable,
    StyledTbody,
    StyledTd,
    StyledTh,
    StyledThead,
    StyledTr,
    Button,
    FilterContainer,
    Select,
    StyledTfoot,
    Message,
    Label,
    SelectOption,
    ButtonWrapper,
    ClearFiltersButton,
} from "./styled";
import {
    getExpense,
} from "../../idb";
import {
    categoriesOptions,
    years,
    months,
    emptyTableText,
    filterMonthText,
    filterYearText,
    descriptionHeaderText,
    createdDateHeaderText,
    costHeaderText,
    categoryHeaderText,
    itemHeaderText,
    totalText,
    currencies,
    chooseCurrencyText,
} from "../../consts";
import Sorticon from "../SortIcon/sorticon";

/* This code defines several state variables using the useState hook, and sets their initial values.
     It also defines an effect that fetches data from IndexedDB and updates the expenses state variable
      when the component mounts. */
const Table = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [currency, setCurrency] = useState(currencies[0].label);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchExpenses = async () => {
            const expensesFromIndexedDB = await getExpense();
            console.log(expensesFromIndexedDB[0]);
            setExpenses(expensesFromIndexedDB);
        };
        fetchExpenses();
    }, []);

    /* This code filters the expenses array based on the selectedMonth and selectedYear variables. */
    const filteredData = expenses.filter((expense) => {
        if (selectedMonth && selectedYear) {
            return expense.date.startsWith(selectedYear + "-" + selectedMonth);
        } else if (selectedMonth) {
            const yearStart = 2020;
            const currentYear = new Date().getFullYear();
            for (let year = yearStart; year <= currentYear; year++) {
                if (expense.date.startsWith(`${year}-${selectedMonth}`)) {
                    return true;
                }
            }
            return false;
        } else if (selectedYear) {
            return expense.date.startsWith(selectedYear);
        } else {
            return true;
        }
    });

    /* This code sets the sorting column and direction based on the current sortColumn state and
     the input columnName. */
    const handleSort = (columnName) => {
        if (sortColumn === columnName) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnName);
            setSortDirection("asc");
        }
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    /* This code sorts the filteredData array by the sortColumn state and the sortDirection state. */
    const sortedData = filteredData.slice().sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue === bValue) {
            return 0;
        }
        const sortMultiplier = sortDirection === "asc" ? 1 : -1;
        return aValue > bValue ? sortMultiplier : -sortMultiplier;
    });
    const totalItems = sortedData.length;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = sortedData.slice(firstIndex, lastIndex);

    const handleClearFilter = () => {
        setSelectedMonth("");
        setSelectedYear("");
    };

    /* This code updates the selected month based on the user-selected option in the event target. */
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    /* This updates the selected year based on the user-selected option in the event target. */
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let total = 0;

    /* This code counts the sum of all the current expenses shown to the user and holds the total */
    filteredData.forEach((expense) => {
        total += parseFloat(expense.costItem);
    });

    /* The table component displays a list of expenses and allows filtering by month and year.
     It includes a table with columns for expense item, category, description, date, cost. The
      component calculates and displays the total cost of all expenses. If there are no expenses to show,
       it displays a 'Nothing to show yet' message. */
    return (
        <div>
            {expenses.length === 0 ? (
                <Message> {emptyTableText} </Message>
            ) : (
                <>
                    <FilterContainer>
                        <Label>{filterMonthText}</Label>
                        <Select value={selectedMonth} onChange={handleMonthChange}>
                            {months.map((month) => (
                                <SelectOption key={month.value} value={month.value}>
                                    {month.label}
                                </SelectOption>
                            ))}
                        </Select>
                    </FilterContainer>
                    <FilterContainer>
                        <Label>{filterYearText}</Label>
                        <Select value={selectedYear} onChange={handleYearChange}>
                            {years.map((year) => (
                                <SelectOption key={year.value} value={year.value}>
                                    {year.label}
                                </SelectOption>
                            ))}
                        </Select>
                    </FilterContainer>
                    <FilterContainer>
                        <Label>{chooseCurrencyText}</Label>
                        <Select value={currency} onChange={handleCurrencyChange}>
                            {currencies.map((c) => (
                                <SelectOption key={c.label} value={c.label}>
                                    {c.value}
                                </SelectOption>
                            ))}
                        </Select>
                    </FilterContainer>
                    <ButtonWrapper>
                        <Label></Label>
                        <ClearFiltersButton onClick={handleClearFilter}>
                            Clear Filters
                        </ClearFiltersButton>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        {Array.from(Array(Math.ceil(totalItems / itemsPerPage)).keys()).map(
                            (pageNumber) => (
                                <Button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber + 1)}
                                    active={currentPage === pageNumber + 1}
                                >
                                    {pageNumber + 1}
                                </Button>
                            )
                        )}
                    </ButtonWrapper>
                    <StyledTable>
                        <StyledThead>
                            <StyledTr>
                                {[
                                    ["expenseItem", itemHeaderText],
                                    ["category", categoryHeaderText],
                                    ["description", descriptionHeaderText],
                                    ["date", createdDateHeaderText],
                                    ["costItem", costHeaderText],
                                ].map(([sortKey, headerText]) => (
                                    <StyledTh key={sortKey} onClick={() => handleSort(sortKey)}>
                                        {headerText}
                                        <Sorticon />
                                    </StyledTh>
                                ))}
                            </StyledTr>
                        </StyledThead>
                        <StyledTbody>
                            {currentItems.map((expense) => (
                                <StyledTr key={expense.expenseItem}>
                                    <StyledTd>
                                        {editingExpenseId === expense.id ? (
                                            <input
                                                name="editName"
                                                type="text"
                                                defaultValue={expense.expenseItem}
                                            />
                                        ) : (
                                            expense.expenseItem
                                        )}
                                    </StyledTd>
                                    <StyledTd>
                                        {editingExpenseId === expense.id ? (
                                            <Select
                                                name="editCategory"
                                                defaultValue={expense.category}
                                            >
                                                {categoriesOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Select>
                                        ) : (
                                            expense.category
                                        )}
                                    </StyledTd>
                                    <StyledTd>
                                        {editingExpenseId === expense.id ? (
                                            <textarea
                                                rows="2"
                                                cols="20"
                                                name="editDescription"
                                                wrap="soft"
                                                defaultValue={expense.description}
                                            />
                                        ) : (
                                            expense.description
                                        )}
                                    </StyledTd>
                                    <StyledTd>
                                        {editingExpenseId === expense.id ? (
                                            <input
                                                name="editDate"
                                                type="date"
                                                min="2020-01-01"
                                                max={new Date().toISOString().split("T")[0]}
                                                defaultValue={expense.date}
                                            />
                                        ) : (
                                            expense.date
                                        )}
                                    </StyledTd>
                                    <StyledTd>
                                        {editingExpenseId === expense.id ? (
                                            <input
                                                name="editCost"
                                                type="number"
                                                min="0"
                                                defaultValue={expense.costItem}
                                                required
                                            />
                                        ) : (
                                            `${expense.costItem} ${currency}`
                                        )}
                                    </StyledTd>

                                </StyledTr>
                            ))}
                        </StyledTbody>
                        <StyledTfoot>
                            <StyledTr>
                                <StyledTd colspan="8">{totalText}</StyledTd>
                                <StyledTd>{`${total} ${currency}`}</StyledTd>
                                <StyledTd />
                                <StyledTd />
                                <StyledTd />
                                <StyledTd />
                            </StyledTr>
                        </StyledTfoot>
                    </StyledTable>
                </>
            )}
        </div>
    );
};

export default Table;
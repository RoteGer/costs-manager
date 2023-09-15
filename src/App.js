/* Written by:
Rotem Gershenzon - 207495417
Linoy Hovav - 209198159
*/

import './App.css';
import Page from './components/Page/page';
import {SnackbarProvider} from 'notistack';
import {Route, HashRouter as Router, Routes} from 'react-router-dom';
import Form from './components/Form/form';
import Table from './components/Table/table';
import ChartComponent from './components/Chart/chart';
import Navigation from './components/Navigation/navigation';
import Footer from './components/Footer/footer';
import {
    chartRoute,
    expensesRoute,
    expensesTitleMessage,
    formRoute,
    formTitleMessage,
    chartTitleMessage
} from './consts';

/* This is the main app component */
const App = () => {
    return (
        <Router>
            <SnackbarProvider maxSnack={3}>
                <Navigation/>
                <Routes>
                    <Route
                        exact
                        path={formRoute}
                        element={
                            <Page title={formTitleMessage} component={<Form/>}/>
                        }
                    />
                    <Route
                        path={expensesRoute}
                        element={
                            <Page
                                title={expensesTitleMessage}
                                component={<Table/>}
                            />
                        }
                    />
                    <Route
                        path={chartRoute}
                        element={
                            <Page
                                title={chartTitleMessage}
                                component={<ChartComponent/>}
                            />
                        }
                    />
                </Routes>
                <Footer/>
            </SnackbarProvider>
        </Router>
    );
};
export default App;
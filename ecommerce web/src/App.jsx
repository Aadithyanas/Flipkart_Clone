import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import { Box } from '@mui/material';

// components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store.js';  // Make sure you import your Redux store here

function App() {
  return (
    <Provider store={store}>  {/* Wrap the entire app with the Redux Provider */}
      <TemplateProvider>
        <ContextProvider>
          <BrowserRouter>
            <Header />
            <Box style={{ marginTop: 54 }}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path= '/cart' element={<Cart />} />
                <Route path='/product/:id' element={<DetailView />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </ContextProvider>
      </TemplateProvider>
    </Provider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
  @media (max-width: 600px) {
    padding: 0;
  }
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  @media (max-width: 600px) {
    width: 100%;
    max-height: 200px;
  }
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
  @media (max-width: 600px) {
    padding-left: 10px;
  }
`;

const Search = () => {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(true);

    const getText = (text) => {
        setText(text);
        setOpen(false);
    };

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <SearchContainer>
            <InputSearchBase
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {
              text && 
              <ListWrapper hidden={open}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem key={product.id}>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={() => setOpen(true)}  
                      >
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))
                }
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).length === 0 &&
                  <ListItem>No products found</ListItem>
                }
              </ListWrapper>
            }
        </SearchContainer>
    );
};

export default Search;

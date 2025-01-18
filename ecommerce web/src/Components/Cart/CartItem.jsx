import { Card, Box, Typography, Button, styled } from '@mui/material';
import { addEllipsis } from '../../utils/util';
import GroupButton from './GroupButton';

const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
    flex-direction: row;
    [theme.breakpoints.down('sm')]: {
        flex-direction: column; // Stack the card components vertically on smaller screens
    }
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    [theme.breakpoints.down('sm')]: {
        align-items: flex-start; // Align items to the start on smaller screens
    }
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    padding: 8px 16px;
    [theme.breakpoints.down('sm')]: {
        padding: 6px 14px; // Adjust button padding on smaller screens
    }
`;

const CartItem = ({ item, removeItemFromCart }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    return (
        <Component>
            <LeftComponent>
                <img src={item.url} style={{ height: 'auto', width: '100%', maxWidth: 110 }} />
                <GroupButton />
            </LeftComponent>
            <Box style={{ margin: 20, flex: 1 }}>
                <Typography>{addEllipsis(item.title.longTitle)}</Typography>
                <SmallText>
                    Seller: RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} /></span>
                </SmallText>
                <Typography style={{ margin: '20px 0' }}>
                    <Cost component="span">₹{item.price.cost}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span"><strike>₹{item.price.mrp}</strike></MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">{item.price.discount} off</Discount>
                </Typography>
                <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Component>
    );
}

export default CartItem;

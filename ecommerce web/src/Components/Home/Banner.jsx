import { styled } from '@mui/material';
import { bannerData } from '../../constant/data.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';  // Ensure you import the styles for the carousel

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

// Styled image component for better responsiveness
const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: '280px',  // Add px to ensure it's treated as a fixed height
    objectFit: 'cover',  // Ensures the image covers the area without distortion

    // Responsive design for small screens
    [theme.breakpoints.down('sm')]: {
        height: '180px',  // Adjusted height for small screens
    },

    // To ensure proper image fit on different screen sizes
    [theme.breakpoints.up('sm')]: {
        height: '280px',  // Ensures proper scaling for medium and large screens
    },
}));

const Banner = () => {
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={false}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                bannerData.map(image => (
                    <Image src={image.url} alt="banner" key={image.id} />
                ))
            }
        </Carousel>
    );
}

export default Banner;

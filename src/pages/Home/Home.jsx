import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import OurFeatures from './OurFeatures';
import TopDeliveryMan from './TopDeliveryMan';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Parcel Pilot | Home</title>
            </Helmet>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;
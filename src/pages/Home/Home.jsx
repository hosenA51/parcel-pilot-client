import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import OurFeatures from './OurFeatures';
import TopDeliveryMan from './TopDeliveryMan';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Parcel Pilot | Home</title>
            </Helmet>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <TopDeliveryMan></TopDeliveryMan>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;
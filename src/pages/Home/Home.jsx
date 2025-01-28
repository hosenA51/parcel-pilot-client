import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import OurFeatures from './OurFeatures';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Parcel Pilot | Home</title>
            </Helmet>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
        </div>
    );
};

export default Home;
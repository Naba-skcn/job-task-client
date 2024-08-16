import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import AllCars from './AllCars';


const Home = () => {
    return (
        <div>
              <Helmet><title>CarSphere | Home</title></Helmet>
            <Banner></Banner>
            <AllCars></AllCars>
        </div>
    );
};

export default Home;
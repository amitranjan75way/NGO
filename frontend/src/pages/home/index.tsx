import React from 'react'
import style from './index.module.css';
import HeroSection from '../../components/heroSection';
import ShowFundingPlans from '../../components/showFundingPlans';


function Home() {
  return (
    <div className={style.maindiv}>
      <HeroSection/>
      <ShowFundingPlans/>
    </div>
  )
}

export default Home;
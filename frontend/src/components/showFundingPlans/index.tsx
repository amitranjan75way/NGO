import React from 'react';
import { useGetFundingPlansQuery } from '../../services/fundingApi';
import style from './index.module.css';
import PlanCard from './PlanCard';
import PlanCardSkeleton from './PlanCardSkeleton';

const ShowFundingPlans = () => {
  const { data, isLoading, isError } = useGetFundingPlansQuery();

  if (isLoading) {
    return <PlanCardSkeleton count={4} />;
  }

  if (isError) {
    return <div className={style.errorMessage}>Failed to load funding plans</div>;
  }

  return (
    <div className={style.donationplandiv}>
      <h1>Donation plans</h1>
      <div className={style.fundingPlansContainer}>
      
      {data?.data.map((plan) => (
        <PlanCard key={plan._id} plan={plan} />
      ))}
    </div>
    </div>
    
  );
};

export default ShowFundingPlans;

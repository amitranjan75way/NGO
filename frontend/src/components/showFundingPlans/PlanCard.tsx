import React from 'react';
import style from './index.module.css';
import { useNavigate } from 'react-router-dom';

type PlanCardProps = {
  plan: {
    name: string;
    amount: number;
    frequency: string;
    collectedAmount: number;
    isClosed: boolean;
  };
};


const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();

  return (
    <div className={style.planCard}>
      <h3 className={style.planTitle}>{plan.name}</h3>
      <p className={style.planAmount}>
        {plan.amount} {plan.frequency}
      </p>
      <p className={style.planCollectedAmount}>
        Collected: {plan.collectedAmount}
      </p>
      <div className={style.planStatus}>
        {plan.isClosed ? 'Closed' : 'Open'}
      </div>
      <button className={style.subscribeButton} onClick={ ()=>navigate('/subscribe', {state: plan})}>
        {plan.isClosed ? 'Closed' : 'Subscribe'}
      </button>
    </div>
  );
};

export default PlanCard;

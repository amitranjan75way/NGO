import React from 'react';
import style from './index.module.css';

const AddPaymentMethodSkeleton: React.FC = () => {
  return (
    <div className={style.addPaymentMethodSkeletonContainer}>
      <h2 className={style.addPaymentMethodSkeletonHeader}></h2>

      <div className={style.addPaymentMethodSkeletonTabs}>
        <div className={style.addPaymentMethodSkeletonTab}></div>
        <div className={style.addPaymentMethodSkeletonTab}></div>
      </div>

      <div className={style.addPaymentMethodSkeletonForm}>
        <div className={style.addPaymentMethodSkeletonInput}></div>
        <div className={style.addPaymentMethodSkeletonInput}></div>
        <div className={style.addPaymentMethodSkeletonInput}></div>

        <div className={style.addPaymentMethodSkeletonRow}>
          <div className={style.addPaymentMethodSkeletonInput}></div>
          <div className={style.addPaymentMethodSkeletonInput}></div>
        </div>

        <div className={style.addPaymentMethodSkeletonButton}></div>
      </div>
    </div>
  );
};

export default AddPaymentMethodSkeleton;

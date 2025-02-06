import React from 'react';
import style from './index.module.css'; // Global styles

const SkeletonPaymentMethod = () => {
  return (
    <div className={style.skeletonCard}>
      <div className={style.skeletonText} />
      <div className={style.skeletonText} />
      <div className={style.skeletonText} />
      <div className={style.skeletonButton} />
    </div>
  );
};

export default SkeletonPaymentMethod;

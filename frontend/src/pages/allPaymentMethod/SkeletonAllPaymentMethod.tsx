import React from 'react';
import style from './index.module.css';

const SkeletonAllPaymentMethod: React.FC = () => {
  return (
    <div className={style.skeletonContainer}>
      <div className={style.skeletonHeader}></div>
      <div className={style.skeletonList}>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className={style.skeletonCard}>
              <div className={style.skeletonLine}></div>
              <div className={style.skeletonLine}></div>
              <div className={style.skeletonButton}></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonAllPaymentMethod;

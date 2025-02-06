import React from 'react';
import style from './index.module.css';

type SkeletonLoaderProps = {
  count: number; 
};

const PlanCardSkeleton: React.FC<SkeletonLoaderProps> = ({ count }) => {
  return (
    <div className={style.skeletonContainer}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={style.skeletonCard}></div>
      ))}
    </div>
  );
};

export default PlanCardSkeleton;

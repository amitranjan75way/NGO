import React from 'react';
import style from './index.module.css';

const AddFundingPlanSkeleton: React.FC = () => {
    return (
        <div className={style.addFundingPlanSkeletonContainer}>
            <div className={style.addFundingPlanSkeletonWrapper}>
                <div className={style.addFundingPlanSkeletonHeader}></div>
                <div className={style.addFundingPlanSkeletonInput}></div>
                <div className={style.addFundingPlanSkeletonInput}></div>
                <div className={style.addFundingPlanSkeletonInput}></div>
                <div className={style.addFundingPlanSkeletonButton}></div>
            </div>
        </div>
    );
};

export default AddFundingPlanSkeleton;

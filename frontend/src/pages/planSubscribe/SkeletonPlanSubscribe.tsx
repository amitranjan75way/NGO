import React from 'react';
import styles from './index.module.css';

const SkeletonPlanSubscribe: React.FC = () => {
  return (
    <div className={styles.skeletonPlanSubscribeContainer}>
      <div className={styles.skeletonLeftSide}>
        <div className={styles.skeletonHeader}></div>

        {/* Plan Details */}
        <div className={styles.skeletonPlanDetails}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
        </div>
      </div>

      <div className={styles.skeletonRightSide}>
        <div className={styles.skeletonHeader}></div>

        {/* Payment Methods */}
        <div className={styles.skeletonPaymentList}>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.skeletonPaymentMethod}></div>
            ))}
        </div>
      </div>

      {/* Subscribe Button */}
      <div className={styles.skeletonActions}>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
};

export default SkeletonPlanSubscribe;

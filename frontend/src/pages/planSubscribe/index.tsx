import React, { useState, useEffect } from 'react';
import { useGetPaymentMethodsQuery, usePayAndSubsribePlanMutation } from '../../services/paymentsApi'; // Your payment methods API
import styles from './index.module.css';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';


const PlanSubscribe: React.FC = () => {
  const [payAndSubsribePlan, { isLoading: loading }] = usePayAndSubsribePlanMutation();
  const location = useLocation();
  const plan = location.state;
  const [myPlan, setMyPlan] = useState<any>(null); // Type to be set as any or specific type
  const { data: paymentMethods, isLoading, isError } = useGetPaymentMethodsQuery({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  // Set plan data
  useEffect(() => {
    if (plan) {
      setMyPlan(plan);
    }
  }, [plan]);
  /**
   * Handles the subscription process for a funding plan.
   * Checks if a payment method is selected, then attempts to subscribe to the funding plan.
   * Displays success or error notifications based on the outcome.
   * 
   * @returns {Promise<void>} 
   */
  const handleSubscribe = async () => {
    try {
      if (selectedPaymentMethod) {
        const data = {
          amount: myPlan.amount,
          fundingPlanId: myPlan._id,
          paymentMethodId: selectedPaymentMethod
        };

        const response = await payAndSubsribePlan(data);
        if (response && response.data) {
          toast.success("Plan subscribed successfully");
        } else if (response && response?.error.status === 409) {
          toast.error("Plan already subscribed");
        }
        console.log(response)

      } else {
        toast.error('Please select a payment method!');
      }
    } catch (error) {
      console.error(error);
      console.log((error as any).data.error_code)
      toast.error('An error occurred during subscription.');
    }
  };


  return (
    <div className={styles.planSubscribeContainer}>
      <div className={styles.leftSide}>
        <h2 className={styles.pageTitle}>Subscribe to the Plan</h2>

        {myPlan && (
          // Plan Details Section
          <div className={styles.planDetails}>
            <h3>Hello {myPlan.name}</h3>
            <p>Please subscribe to this plan to help people</p>
            <p>Price: ${myPlan.amount} per {myPlan.frequency}</p>
            <p>Collected Amount: ${myPlan.collectedAmount} </p>
            <p>Subscription: {myPlan.isClosed ? 'Closed' : 'Open'}</p>
          </div>
        )}
      </div>

      <div className={styles.rightSide}>
        {/* Payment Methods Section */}
        <h3>Your Payment Methods</h3>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load payment methods.</p>}

        {!isLoading && !isError && paymentMethods?.data?.length === 0 && (
          <div className={styles.noPaymentMethods}>
            <p>No payment methods added yet.</p>
            <button className={styles.addPaymentMethodButton}>
              Add Payment Method
            </button>
          </div>
        )}

        {!isLoading && !isError && paymentMethods?.data?.length > 0 && (
          <div className={styles.paymentList}>
            {paymentMethods.data.map((method: any) => (
              <div
                key={method._id}
                className={`${styles.paymentMethodCard} ${selectedPaymentMethod === method._id ? styles.selected : ''}`}
                onClick={() => setSelectedPaymentMethod(method._id)}
              >
                <div className={styles.paymentMethodDetails}>
                  <p>{method.methodType === 'CARD' ? 'Card' : 'Bank Account'}</p>
                  <p>
                    {method.methodType === 'CARD'
                      ? `**** **** **** ${method.cardDetails.cardNumber.slice(-4)}`
                      : `Account: ${method.bankAccountDetails.accountNumber}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscribe Button */}
      <div className={styles.actions}>
        <button
          className={styles.subscribeButton}
          onClick={handleSubscribe}
          disabled={!selectedPaymentMethod}
        >
          {selectedPaymentMethod ? 'Pay and Subscribe Plan' : 'Select Payment Method'}
        </button>
      </div>
    </div>
  );
};

export default PlanSubscribe;

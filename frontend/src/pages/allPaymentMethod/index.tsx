import React, { useEffect } from 'react';
import { useGetPaymentMethodsQuery, useDeletePaymentMethodMutation } from '../../services/paymentsApi';
import { toast } from 'react-toastify';
import SkeletonPaymentMethod from './SkeletonPaymentMethod';
import style from './index.module.css';
import PaymentCard from './PaymentCard';  // Ensure correct import

const AllPaymentMethod: React.FC = () => {
  const { data: paymentMethods, isLoading, isError, refetch } = useGetPaymentMethodsQuery({});
  const [deletePaymentMethod, { isLoading: isDeleting }] = useDeletePaymentMethodMutation();

  /**
 * Handles the deletion of a payment method.
 * Calls the API mutation to delete the payment method and refetches the list.
 * 
 * @param {string} id - The ID of the payment method to be deleted.
 * @returns {Promise<void>}
 */
  const handleDelete = async (id: string) => {
    try {
      await deletePaymentMethod({ id }).unwrap();
      toast.success('Payment method deleted successfully!');
      refetch(); // Refresh the list after deletion
    } catch (error: any) {
      console.error('Delete Error:', error);
      toast.error('Failed to delete payment method.');
    }
  };

  useEffect(() => {
    if (paymentMethods) {
      console.log("payment methods: ", paymentMethods);
    }
  }, [paymentMethods]);

  return (
    <div className={style.paymentContainer}>
      <h2 className={style.header}>Your Payment Methods</h2>

      {/* Loading State */}
      {isLoading && (
        <div className={style.skeletonWrapper}>
          {Array(4)
            .fill(null)
            .map((_, index) => <SkeletonPaymentMethod key={index} />)}
        </div>
      )}

      {/* Error State */}
      {isError && <p className={style.errorText}>Failed to load payment methods.</p>}

      {/* No Payment Methods */}
      {!isLoading && !isError && paymentMethods?.data?.length === 0 && (
        <div className={style.noPaymentMethods}>
          <p>No payment methods added yet.</p>
          <button className={style.addButton} onClick={() => console.log('Redirect to Add Payment')}>
            Add Payment Method
          </button>
        </div>
      )}

      {/* Payment Methods List */}
      {!isLoading && !isError && paymentMethods?.data?.length > 0 && (
        <div className={style.paymentList}>
          {paymentMethods.data.map((method: any) => (
            <PaymentCard
              key={method._id}
              paymentMethod={method}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPaymentMethod;

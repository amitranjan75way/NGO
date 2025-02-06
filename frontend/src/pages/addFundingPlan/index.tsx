import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useAddFundingPlanMutation } from '../../services/fundingApi';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader';
import { motion } from 'framer-motion';

// Define the type for the form data
type FormData = {
  name: string;
  amount: number;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY';
};

// Validation schema using Yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  frequency: yup.string().oneOf(['MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY'], 'Invalid frequency').required('Frequency is required'),
});

const AddFundingPlan: React.FC = () => {
  const [addFundingPlan, { isLoading, isError, error }] = useAddFundingPlanMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  /**
 * Handles form submission and calls the RTK mutation to add a new funding plan.
 *
 * @param {FormData} data - The form data containing name, amount, and frequency.
 * @returns {Promise<void>} A promise that resolves when the funding plan is added.
 */
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addFundingPlan(data).unwrap();
      toast.success('Funding Plan Added Successfully');
      reset();
    } catch (err) {
      console.log(err);
      if((err as any).data.error_code === 403) {
        toast.error("Unauthorised access");
      }else {
        toast.error('Failed to add funding plan');
      }
    }
  };

  return (
    <div className={style.addFundingPlanContainer}>
      <motion.div
        className={style.formWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className={style.header}>Add Funding Plan</h1>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label>Name of Plan</label>
            <input type="text" {...register('name')} placeholder="Plan Name" />
            {errors.name && <p className={style.error}>{errors.name.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Amount</label>
            <input type="number" {...register('amount')} placeholder="Amount" />
            {errors.amount && <p className={style.error}>{errors.amount.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Frequency</label>
            <select {...register('frequency')}>
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
              <option value="HALF_YEARLY">Half-Yearly</option>
              <option value="YEARLY">Yearly</option>
            </select>
            {errors.frequency && <p className={style.error}>{errors.frequency.message}</p>}
          </div>

          {isError && error && (
            <p className={style.error}>{error.data?.message || 'An error occurred!'}</p>
          )}

          <button type="submit" className={style.submitButton} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : <span>Add Plan</span>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFundingPlan;

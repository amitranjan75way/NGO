import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useAddPaymentMethosMutation } from '../../services/paymentsApi';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader';



type PaymentMethodType = 'CARD' | 'BANK_ACCOUNT';

interface CardDetails {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

interface BankAccountDetails {
  accountNumber: string;
  accountHolderName: string;
  routingNumber: string;
}

interface PaymentFormData {
  methodType: PaymentMethodType;
  cardDetails?: CardDetails;
  bankAccountDetails?: BankAccountDetails;
}

const cardSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Card number must be 16 digits'),
  cardHolderName: yup.string().required('Cardholder name is required'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry format (MM/YY)'),
  cvv: yup.string().required('CVV is required').matches(/^\d{3}$/, 'CVV must be 3 digits'),
});

const bankSchema = yup.object().shape({
  accountNumber: yup.string().required('Account number is required'),
  accountHolderName: yup.string().required('Account holder name is required'),
  routingNumber: yup.string().required('Routing number is required'),
});

const schema = yup.object().shape({
  methodType: yup.string().oneOf(['CARD', 'BANK_ACCOUNT'], 'Invalid method type').required(),

  cardDetails: yup.mixed().when('methodType', {
    is: 'CARD',
    then: () => cardSchema,
    otherwise: () => yup.mixed().notRequired(),
  }),

  bankAccountDetails: yup.mixed().when('methodType', {
    is: 'BANK_ACCOUNT',
    then: () => bankSchema,
    otherwise: () => yup.mixed().notRequired(),
  }),
});

const AddPaymentMethod: React.FC = () => {
  const [methodType, setMethodType] = useState<PaymentMethodType>('CARD');
  const [addPaymentMethod, { isLoading, isError }] = useAddPaymentMethosMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PaymentFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      methodType: 'CARD',
    },
  });

  /**
 * Handles the change of payment method type (CARD or BANK_ACCOUNT).
 * Updates the state and sets the form value accordingly.
 * 
 * @param {PaymentMethodType} type - The selected payment method type.
 */
  const handleMethodChange = (type: PaymentMethodType) => {
    setMethodType(type);
    setValue('methodType', type);
  };

  /**
 * Handles the form submission to add a new payment method.
 * Calls the API mutation to save the payment method.
 * 
 * @param {PaymentFormData} data - The submitted form data containing payment method details.
 * @returns {Promise<void>}
 */
  const onSubmit: SubmitHandler<PaymentFormData> = async (data) => {
    try {
      console.log('Submitting Payment Method:', data);

      const response = await addPaymentMethod(data).unwrap();

      // Success Notification
      toast.success('Payment method added successfully!');

      console.log('API Response:', response);
    } catch (error: any) {
      console.error('Error:', error);

      // Error Handling
      if (error.data.error_code === 404) {
        toast.error('User not found. Please login again.');
      } else if (error.data.error_code === 400) {
        toast.error('This payment method already exists.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };


  return (
    <div className={style.paymentContainer}>
      <h2 className={style.header}>Add Payment Method</h2>

      {/* Payment Type Selection Tabs */}
      <div className={style.tabs}>
        <button
          className={`${style.tab} ${methodType === 'CARD' ? style.active : ''}`}
          onClick={() => handleMethodChange('CARD')}
          type="button"
        >
          Card
        </button>
        <button
          className={`${style.tab} ${methodType === 'BANK_ACCOUNT' ? style.active : ''}`}
          onClick={() => handleMethodChange('BANK_ACCOUNT')}
          type="button"
        >
          Bank Account
        </button>
      </div>

      {/* Payment Method Form */}
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('methodType')} value={methodType} />

        {methodType === 'CARD' && (
          <>
            <div className={style.inputGroup}>
              <label>Card Number</label>
              <input type="text" {...register('cardDetails.cardNumber')} placeholder="1234 5678 9012 3456" />
              {errors.cardDetails?.cardNumber && <p className={style.error}>{errors.cardDetails.cardNumber.message}</p>}
            </div>

            <div className={style.inputGroup}>
              <label>Cardholder Name</label>
              <input type="text" {...register('cardDetails.cardHolderName')} placeholder="John Doe" />
              {errors.cardDetails?.cardHolderName && <p className={style.error}>{errors.cardDetails.cardHolderName.message}</p>}
            </div>

            <div className={style.row}>
              <div className={style.inputGroup}>
                <label>Expiry Date</label>
                <input type="text" {...register('cardDetails.expiryDate')} placeholder="MM/YY" />
                {errors.cardDetails?.expiryDate && <p className={style.error}>{errors.cardDetails.expiryDate.message}</p>}
              </div>

              <div className={style.inputGroup}>
                <label>CVV</label>
                <input type="text" {...register('cardDetails.cvv')} placeholder="123" />
                {errors.cardDetails?.cvv && <p className={style.error}>{errors.cardDetails.cvv.message}</p>}
              </div>
            </div>
          </>
        )}

        {methodType === 'BANK_ACCOUNT' && (
          <>
            <div className={style.inputGroup}>
              <label>Account Number</label>
              <input type="text" {...register('bankAccountDetails.accountNumber')} placeholder="Account Number" />
              {errors.bankAccountDetails?.accountNumber && <p className={style.error}>{errors.bankAccountDetails.accountNumber.message}</p>}
            </div>

            <div className={style.inputGroup}>
              <label>Account Holder Name</label>
              <input type="text" {...register('bankAccountDetails.accountHolderName')} placeholder="John Doe" />
              {errors.bankAccountDetails?.accountHolderName && <p className={style.error}>{errors.bankAccountDetails.accountHolderName.message}</p>}
            </div>

            <div className={style.inputGroup}>
              <label>Routing Number</label>
              <input type="text" {...register('bankAccountDetails.routingNumber')} placeholder="Routing Number" />
              {errors.bankAccountDetails?.routingNumber && <p className={style.error}>{errors.bankAccountDetails.routingNumber.message}</p>}
            </div>
          </>
        )}

        <button type="submit" className={style.submitButton} disabled={isLoading}>
          {isLoading
            ?
            <ButtonLoader />
            :
            <span>Save Payment Method</span>

          }
        </button>
      </form>
    </div>
  );
};

export default AddPaymentMethod;

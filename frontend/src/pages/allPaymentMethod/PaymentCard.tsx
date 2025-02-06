import React from 'react';
import { motion } from 'framer-motion';
import { PaymentMethodType } from './types';
import './index.module.css';  // CSS File Import

interface PaymentCardProps {
  paymentMethod: PaymentMethodType;
  onDelete: (id: string) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentMethod, onDelete }) => {
  const { methodType, cardDetails, bankAccountDetails, _id } = paymentMethod;

  return (
    <motion.div
      className="paymentCard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="paymentMethodHeader">
        <h2>{methodType === 'CARD' ? 'Credit/Debit Card' : 'Bank Account'}</h2>
        <button className="deleteButton" onClick={() => onDelete(_id)}>Delete</button>
      </div>

      <div className="paymentDetails">
        {methodType === 'CARD' ? (
          <>
            <div className="cardDetails">
              <p>Card Number: **** **** **** {cardDetails.cardNumber.slice(-4)}</p>
              <p>Cardholder: {cardDetails.cardHolderName}</p>
              <p>Expiry Date: {cardDetails.expiryDate}</p>
            </div>
          </>
        ) : (
          <>
            <div className="bankAccountDetails">
              <p>Account Number: {bankAccountDetails.accountNumber}</p>
              <p>Account Holder: {bankAccountDetails.accountHolderName}</p>
              <p>Routing Number: {bankAccountDetails.routingNumber}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentCard;

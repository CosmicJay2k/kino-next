import { useState } from 'react';
import SalonDetails from './salonDetails';
import styles from "../styles/Payment.module.css";
import { useRouter } from 'next/router';

export default function payment() {
  const router = useRouter();
  const { totalPrice } = router.query;
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  
  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCvcChange = (event) => {
    setCvc(event.target.value);
  };

  const handlePay = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    window.location.href = '/';  
  };

  const handleSubmit  = async (event) => {
    event.preventDefault();
    localStorage.setItem('cardName', cardName);
    localStorage.setItem('cardNumber', cardNumber);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('cvc', cvc);
    console.log('Payment submitted!');
    handlePay();
    try {
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalPrice }),
        });
        const data = await response.json();
        console.log(data);
        handlePay();
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Payment</h1>
      <p>Total price: {totalPrice}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="cardName">Name on Card</label>
          <input
            className={styles.label}
            id="cardName"
            type="text"
            value={cardName}
            onChange={handleCardNameChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            className={styles.label}
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            className={styles.label}
            id="expirationDate"
            type="text"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cvc">CVC</label>
          <input
            className={styles.label}
            id="cvc"
            type="text"
            value={cvc}
            onChange={handleCvcChange}
            required
          />
        </div>
        <button className={styles.payButton} type="submit">Pay</button>
      </form>
      {showPopup && (
        <div className={styles.popup}>
          <p>Thanks for buying!</p>
          <button className={styles.closeButton} onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

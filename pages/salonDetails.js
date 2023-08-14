import { useState, useEffect } from 'react';
import styles from "../styles/SalonDetails.module.css";
import Link from 'next/link';


export default function salonDetails() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSeatSelected, setIsSeatSelected] = useState(false); 
  const [showPopup, setShowPopup] = useState(false);
  const handleSeatSelection = (event) => {
    const selectedSeat = event.target.id;
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(selectedSeat)) {
        return prevSelectedSeats.filter((seat) => seat !== selectedSeat);
      } else {
        return [...prevSelectedSeats, selectedSeat];
      }
    });
  };
  const handleConfirm = async () => {
    try {
      
      for (const seat of selectedSeats) {
        const newSalonDetails = new SalonDetailsModel({
          seatNumber: seat,
          price: getPriceForSeat(seat),
          isBooked: false,
        });
        await newSalonDetails.save();
      }
      
      window.location.href = `/payment?totalPrice=${totalPrice}`;
    } catch (error) {
      console.error('Error saving salon details:', error);
      
    }
  };
  useEffect(() => {        
    let price = 0;
    selectedSeats.forEach((seat) => {
      if (seat.startsWith('R1')) {
        price += 150;
      } else if (seat.startsWith('R2')) {
        price += 100;
      } else if (seat.startsWith('R3')) {
        price += 75;
      }
    });
    setTotalPrice(price);
    setIsSeatSelected(selectedSeats.length > 0); 
  }, [selectedSeats]);


  

  return (
    <div className={styles.salon}>
      <h1 className={styles['title']}>Reserve seats</h1>
      <p className={styles['total-price']}>Total price: {totalPrice}</p>
      
      <ul className={styles['seat-list']}>
        <li>
          <input id="R1-1" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R1-1">Seat 1(150kr)</label>
        </li>
        <li>
          <input id="R1-2" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R1-2">Seat 2(150kr)</label>
        </li>
        <li>
          <input id="R1-3" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R1-3">Seat 3(150kr)</label>
        </li>
        <li>
          <input id="R2-1" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R2-1">Seat 4(150kr)</label>
        </li>
        <li>
          <input id="R2-2" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R2-2">Seat 5(100kr)</label>
        </li>
        <li>
          <input id="R2-3" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R2-3">Seat 6(100kr)</label>
        </li>
        <li>
          <input id="R3-1" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R3-1">Seat 7(100kr)</label>
        </li>
        <li>
          <input id="R3-2" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R3-2">Seat 8(100kr)</label>
        </li>
        <li>
          <input id="R3-3" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R3-3">Seat 9(75kr)</label>
        </li>
        <li>
          <input id="R4-1" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R4-1">Seat 10(75kr)</label>
        </li>
        <li>
          <input id="R4-2" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R4-2">Seat 11(75kr)</label>
        </li>
        <li>
          <input id="R4-2" type="checkbox" onChange={handleSeatSelection} />
          <label htmlFor="R4-3">Seat 12(75kr)</label>
        </li>
      </ul>
      {isSeatSelected ? ( 
        <Link href={{ pathname: '/payment', query: { totalPrice: totalPrice } }}>
          <button className={styles["pay-button"]} onClick={handleConfirm}>Confirm</button>

        </Link>
      ) : (
        <p>.</p>
      )}

       
        </div>
        )
}

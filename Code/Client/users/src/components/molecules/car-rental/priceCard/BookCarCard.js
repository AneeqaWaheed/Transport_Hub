import React, { useState } from 'react';
import style from './rentalPriceCard.module.css';
import Button from '../../../atoms/button/Button';
import CarFeaturesModel from '../../../../pages/car-rental/carFeatureModel/CarFeaturesModel';

export default function BookCarCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carData = JSON.parse(localStorage.getItem('selectedCar'));
  const filterData = JSON.parse(localStorage.getItem('filterData'));

  
  const openModal = () => {
    console.log('Opening modal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return ( 
    <>
      <div className={style.price_card_contanier}>

        <div className={style.car_header}>
          <div>
            {carData && carData.carImage && (
              <img src={carData.carImage} alt="Car" />
            )}
          </div>
          <div>
            <h2>{carData ? carData.carTitle : "Car Title"}</h2>
            <span>{carData ? carData.carType : "Car Type"}</span>
          </div>
        </div>

        <div className={style.booking_time}>
          <div>
            <span>{filterData ? filterData.pickupDate : "Pickup Date"}</span> -
            <span> {filterData ? filterData.pickupTime : "Pickup Time"}</span>
            <p>{filterData ? filterData.pickupLocation : "Pickup Location"}</p>
          </div>
          <div>
            <span>{filterData ? filterData.dropDate : "Drop Date"}</span> -
            <span> {filterData ? filterData.dropTime : "Drop Time"}</span>
            <p>{filterData ? filterData.dropLocation : "Drop Location"}</p>
          </div>
        </div>

        <div className={style.price_container}>
          <div className={style.price}>
            <span>Base Rate</span>
            <span>RS {carData ? carData.price : "Car Price"}</span>
          </div>
          <div className={style.price}>
            <p>Price for {filterData ? filterData.totalDays : "Total Days"} days</p>
            <p>RS {carData ? carData.totalPrice : "Car Price"}</p>
          </div>
        </div>
        
        <div className={style.btn}>
          <Button 
          primary 
          size={"14px"}
          radius={"4px"}
          btnText="Continue" 
          btnClick={openModal}/>
        </div>
      </div>
      {isModalOpen && (
          <CarFeaturesModel onClose={closeModal} />
        )}
    </>
  );
}


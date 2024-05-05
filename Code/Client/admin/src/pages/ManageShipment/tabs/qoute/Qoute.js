import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import styles from "../../../../components/sections/transport-managment/cars/view_car/viewcars.module.css";

export default function Qoute() {
  const [product, setProduct] = useState([]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // GET CAR DATA
  useEffect(() => {
    axios.get("http://localhost:5000/api/shipment/get-shipment")
      .then(res => {
        console.log(res.data);
        // Filter shipments with status "booked by admin"
        const bookedShipments = res.data.data.filter(item => item.status === "booked by admin");
        setProduct(bookedShipments);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  // DELETE CAR DATA
  const updateStatus = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancle this Shipment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancled!'
    })

      .then((result) => {
        if (result.isConfirmed) {
          axios.patch(`http://localhost:5000/api/cars/deleteCar/${id}`)
            .then(res => {
              Swal.fire(
                'Delete Car!',
                'You data have been delete.',
                'success'
              );
              if (res.status === 200) {
                axios.get("http://localhost:5000/api/cars/getCars")
                  .then(res => {
                    console.log(res.data);
                    setProduct(res.data.data);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });

  }

  return (
    <div className={styles.shipment_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Commodity Name</th>
            <th>Mode</th>
            <th>Pickup City</th>
            <th>Delivery City</th>
            <th>Pickup Date</th>
            <th>StopType</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={index}>
              <td className={styles.shipmentID}>{item._id} <FaEdit/></td>
              <td>{item.commodityName}</td>
              <td>{item.selectedMode}</td>
              <td>{item.pickupCity}</td>
              <td>{item.deliveryCity}</td>
              <td>{formatDate(item.pickupDate)}</td>
              <td>{item.stopType ? item.stopType : "no stop"}</td>
              <td>{item.price}</td>
              <td>
                <button className={styles.cancel_button} onClick={() => updateStatus(`${item._id}`)}>cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

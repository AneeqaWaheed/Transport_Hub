const mongoose = require("mongoose");
const Cars = require("../../models/Cars");

class CarsController {

  // POST METHOD
  static addCars = async (req, res) => {
    console.log(req.body, 16)
    const { carImage, carTitle, carType, numberOfSeats, transmission, bags, mileLimit, color,
      fuelType, engineType, price, zone, discount, startDate, endDate } = req.body;

    if (
      !carTitle || !carType || !numberOfSeats || !transmission || !bags || !mileLimit || !color || !fuelType || !engineType || !price || !zone
    ) {
      return res
        .status(422)
        .json({ error: "Please fill in all fields properly" });
    }

    try {
      const newCar = new Cars({
        carImage, carTitle, carType, numberOfSeats, transmission, bags, mileLimit, color,
        fuelType, engineType, price, zone, discount, startDate, endDate
      });
      await newCar.save();

      res.status(201).send({
        status: "success", message: "Car saved successfully",
        data: newCar
      });
    }
    catch (error) {
      console.log(error);
      res.status(409).send({ status: failed, message: "Failed to Save" });
    }
  };

  // GET METHOD
  static getCars = async (req, res) => {
    try {
      const carData = await Cars.find();
      res.status(200).send({ status: "success", data: carData });
    } catch (error) {
      res.status(404).send({ status: "failed", message: "Failed to get Data" });
    }
  };

  // GETT METHOD BY ID
  static getCar = async (req, res) => {
    const { id } = req.params;
    
    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ status: "failed", message: `Invalid Car ID: ${id}` });
    }
  
    try {
      const carData = await Cars.findById(id);
      if (!carData) {
        return res.status(404).send({ status: "failed", message: `No Car found with ID: ${id}` });
      }
      res.status(200).send({ status: "success", data: carData });
    } catch (error) {
      console.error("Error fetching car data:", error);
      res.status(500).send({ status: "failed", message: "Failed to get Car Data" });
    }
  };
  

  // UPDATE METHOD
  static updateCar = async (req, res) => {
    const { id } = req.params;
    const {
      carImage, carTitle, carType, numberOfSeats, transmission, bags, mileLimit, color,
      fuelType, engineType, price, zone, discount, startDate, endDate
    } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ status: "failed", message: `Invalid Car ID: ${id}` });
    }
  
    const updatedCar = {
      carImage, carTitle, carType, numberOfSeats, transmission, bags, mileLimit, color,
      fuelType, engineType, price, zone, discount, startDate, endDate
    };
  
    try {
      const updatedData = await Cars.findByIdAndUpdate(id, updatedCar, { new: true });
  
      if (!updatedData) {
        return res.status(404).send({ status: "failed", message: `No Car found with ID: ${id}` });
      }
  
      res.status(200).send({ status: "success", message: "Car updated successfully", data: updatedData });
    } catch (error) {
      console.error("Error updating car:", error);
      res.status(500).send({ status: "failed", message: "Failed to update car" });
    }
  };
  

  // DELETE METHOD
  static deletecar = async (req, res) => {
    const { id } = req.params;
    console.log('Trying to delete car with ID:', id);
  
    try {
      const deletedCar = await Cars.findByIdAndDelete(id);
      console.log('Deleted Car:', deletedCar);
  
      if (!deletedCar) {
        return res.status(404).send({ status: "failed", message: "Car not found." });
      }
  
      res.status(200).send({ status: "success", message: "Car deleted successfully." });
    } catch (error) {
      console.log('Error deleting car:', error);
      res.status(500).send({ status: "failed", message: "Failed to delete car." });
    }
  };
  


};

module.exports = CarsController;
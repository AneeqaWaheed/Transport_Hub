// LandingCarPage.js
import React, { useState } from "react";
import CarDeals from "../../components/sections/carRental/landinPageSections/CarDeals";
import CarTypes from "../../components/sections/carRental/landinPageSections/CarTypes";
import CarMain from "../../components/sections/carRental/landinPageSections/CarMain";
import ManageCars from "../../components/sections/carRental/landinPageSections/ManageCars";
import CarResults from "../../components/sections/carRental/landinPageSections/CarResults"; // Import the CarResults component

function LandingCarPage() {
  const [filterApplied, setFilterApplied] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});

  const handleFilter = (criteria) => {
    setFilterCriteria(criteria);
  };

  const handleFilterApplied = () => {
    setFilterApplied(true);
  };

  return (
    <>

      {!filterApplied && (
        <CarMain
          car1Image={"./assets/images/cars/SUVs.png"}
          car4Image={"./assets/images/cars/car4.png"}
          onFilter={handleFilter}
          onFilterApplied={handleFilterApplied}
        />
      )}
      {/* {filterApplied && <CarResults filters={filterCriteria} />}
      {!filterApplied && <CarDeals />}
      {!filterApplied && <CarTypes />}
      {!filterApplied && <ManageCars />} */}
    </>
  );
}

export default LandingCarPage;
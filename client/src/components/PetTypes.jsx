import React from 'react';
import { Link } from 'react-router-dom';
import CurrentLocation from './CurrentLocation';

const PetTypes = () => (
  <div className="container">
    <div className="allPetTypes">
      <div className="petTypeContainer">
        <Link to="/pets/dog">
          <picture>
            <source srcSet="./dogSquare.webp" type="image/webp" />
            <source srcSet="./dogSquare.png" type="image/png" />
            <img srcSet="./dogSquare.png" className="typeIcon" alt="dog icon" />
          </picture>
          <h2 className="petTypesText">Find Puppers</h2>
        </Link>
      </div>
    </div>
    <CurrentLocation />
  </div>
);

export default PetTypes;
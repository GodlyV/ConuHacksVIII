import React, { useState } from 'react';


const PropertiesMenu = () => {
    const [sliderValueH, setSliderValueH] = useState(50);
    const [sliderValueW, setSliderValueW] = useState(50);
    const [sliderValueD, setSliderValueD] = useState(25);
  
    const handleSliderChangeH = (event) => {
      setSliderValueH(event.target.value);
    };
  
    const handleSliderChangeW = (event) => {
      setSliderValueW(event.target.value);
    };
  
    const handleSliderChangeD = (event) => {
      setSliderValueD(event.target.value);
    };

    return (
        <div>
          <h1>Wadrobe Properties</h1>
          <p>Height {sliderValueH}</p>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValueH}
            onChange={handleSliderChangeH}
          />
          <p>Width: {sliderValueW}</p>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValueW}
            onChange={handleSliderChangeW}
          />

          <p>Depth: {sliderValueD}</p>
          <input
            type="range"
            min="0"
            max="50"
            value={sliderValueD}
            onChange={handleSliderChangeD}
          />
          
        </div>
      );
};

export default PropertiesMenu;
import React, { Fragment, useState } from 'react';
import DownArrowIcon from '../../Components/Icons/DownArrow';

const Legend = () => {
  const [ visible, setVisible ] = useState(true);

  const handleClick = () => {
    setVisible(previousValue => !previousValue)
  };

  return (
    <Fragment>
      {visible && (<div className="divider"></div>)}
      <div className={`legend-container ${visible ? '' : 'shrink'}`}>
        {visible && (
          <Fragment>
            <p className="legend-title">Bikes available</p>
            <p><div class="dot-red"></div>No bikes</p>
            <p><div class="dot-yellow"></div>Between 1 and 5</p>
            <p><div class="dot-green"></div>More than 5</p>
          </Fragment>
        )}
      </div>
      
      <button
        className="button-drawer"
        onClick={() => handleClick()}
      >
        <DownArrowIcon className={visible ? 'rotate' : ''} size={16} />
      </button>
    </Fragment>
    
  );
};

export default Legend;

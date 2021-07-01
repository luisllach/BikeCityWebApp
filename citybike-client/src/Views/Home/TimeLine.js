import React from 'react';
import LeftArrowIcon from '../../Components/Icons/LeftArrow';
import RightArrowIcon from '../../Components/Icons/RightArrow';
import { getDateTime } from '../../Utils';
import Legend from './Legend';

const TimeLine = props => {
  const {
    dateTime,
    size,
    selected,
    onLeftClick: handleLeftClick,
    onRightClick: handleRightClick
  } = props;

  const { date, time } = getDateTime(dateTime);

  return (
      <div className="timeline-container">
        <div className="timeline-controls">
          <button
            className="button-3d"
            onClick={() => handleLeftClick()}
            disabled={!selected}
          >
              <LeftArrowIcon size={16} />
            </button>
          <div className="timeline-date-container">
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <button
            className="button-3d"
            onClick={() => handleRightClick()}
            disabled={selected === size}
          >
            <RightArrowIcon size={16} />
          </button>
        </div>
        <Legend />
      </div>
  );
};

export default TimeLine;

import React from 'react';
import homeIcon from '../../../assets/home.png';
import styled from 'styled-components';

const StyledHome = styled.div`
  position: absolute;
  top: 104px;
  z-index: 1;

  button {
    padding: 2.1px;
    margin: 0;
    border-radius: 7px;
    border: 0;
    box-shadow: 2px 2px #aebcd1;
  }
`;

function HomeIcon({ initialPosition, zoomOnCluster }) {
  const { latitude, longitude, zoom } = initialPosition;

  const onClick = e => {
    e.preventDefault();
    zoomOnCluster(zoom, longitude, latitude);
  };

  return (
    <StyledHome>
      <button onClick={onClick}>
        <img src={homeIcon} alt="Zoom out to Home" />
      </button>
    </StyledHome>
  );
}

export default HomeIcon;

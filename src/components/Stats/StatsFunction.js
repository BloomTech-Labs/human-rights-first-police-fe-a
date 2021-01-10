import React, { useEffect, useState } from 'react';

export const CountUpAnimation = ({ children, duration = 2000 }) => {
  const countTo = parseInt(children, 10);
  const [count, setCount] = useState(0);

  const easeOutQuad = t => t * (2 - t);
  const frameDuration = 1000 / 60;

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / frameDuration);
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      setCount(countTo * progress);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  }, [countTo, duration]);

  return Math.floor(count);
};

// export default CountUpAnimation;

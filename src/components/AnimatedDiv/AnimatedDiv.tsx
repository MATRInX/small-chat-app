import React, { useState, useEffect, SFC } from 'react';
import * as Props from './types';

const AnimatedDiv: SFC<Props.AnimatedDivProps> =
  ({ show, className, startAnimation, endAnimation, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        className={className}
        style={{ animationName: `${show ? startAnimation : endAnimation}` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default AnimatedDiv;
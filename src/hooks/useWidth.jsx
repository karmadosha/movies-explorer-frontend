import { useEffect, useState, useCallback } from 'react'

export const useWidth = () => {  
  const getWindoWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getWindoWidth());

  useEffect(() => {
    
    function handleScreenResize() {
      setScreenWidth(getWindoWidth());
    }

    function controlResize() {
      let timer;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleScreenResize();
        }, 500);
      };
    };

    window.addEventListener('resize', controlResize, false);
    
    return () => {
      window.removeEventListener('resize', handleScreenResize);
    }
  }, [getWindoWidth]);

  return screenWidth;
};
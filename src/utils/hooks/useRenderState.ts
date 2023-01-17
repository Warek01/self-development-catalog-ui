import { useEffect, useState } from 'react';

const useRenderState = (delay = 0): boolean => {
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRendered(true);
    }, delay);
  }, []);

  return isRendered;
};

export default useRenderState;

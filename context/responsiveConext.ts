import { createContext } from 'react';

interface ResponsiveContextProps {
  isMobileView: boolean;
}

const responsiveContext = createContext<ResponsiveContextProps>({
  isMobileView: false,
});

export default responsiveContext;

import React, { createContext, useState } from 'react';

export const PayloadContext = createContext();

export const PayloadProvider = ({ children }) => {
  const [payload, setPayload] = useState(null);

  return (
    <PayloadContext.Provider value={{ payload, setPayload }}>
      {children}
    </PayloadContext.Provider>
  );
};
import React from 'react';
// import { Link } from 'react-router-dom';
import { VedaUIProvider } from '@teamimpact/veda-ui';

interface VedaUIConfigProviderProps {
  children: any;
  vedaConfig?: {
    envMapboxToken?: string;
    envApiStacEndpoint?: string;
    envApiRasterEndpoint?: string;
  };
}

export default function VedaUIConfigProvider({ children, vedaConfig }: VedaUIConfigProviderProps) {
  const VedaUIProviderComponent = VedaUIProvider as any;
  
  // Use provided config or fallback to empty strings
  // The consuming app should provide these values
  const config = {
    envMapboxToken: vedaConfig?.envMapboxToken || '',
    envApiStacEndpoint: vedaConfig?.envApiStacEndpoint || '',
    envApiRasterEndpoint: vedaConfig?.envApiRasterEndpoint || '',
  };
  
  return (
    <VedaUIProviderComponent config={config}>
      {children}
    </VedaUIProviderComponent>
  );
}

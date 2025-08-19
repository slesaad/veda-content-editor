import React from 'react';
// import { Link } from 'react-router-dom';
import { VedaUIProvider } from '@teamimpact/veda-ui';

export default function VedaUIConfigProvider({ children }: { children: any }) {
  const VedaUIProviderComponent = VedaUIProvider as any;
  return (
    <VedaUIProviderComponent
      config={{
        envMapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
        envApiStacEndpoint: process.env.NEXT_PUBLIC_API_STAC_ENDPOINT ?? '',
        envApiRasterEndpoint: process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT ?? '',
       
      }}
    >
      {children}
    </VedaUIProviderComponent>
  );
}

import React from 'react';
import { transformToVedaData } from '../utils/data';
// import DataProvider from '../others/store/providers/data';
// import VedaUIConfigProvider from '../others/store/providers/veda-ui-config';
// import DevseedUIThemeProvider from '../others/store/providers/theme';

import { MapBlock } from '@teamimpact/veda-ui';

interface DatasetWithContent {
  metadata: {
    id: string;
    name: string;
    description: string;
    layers?: any[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface MapPreviewProps {
  allAvailableDatasets?: DatasetWithContent[];
  [key: string]: any;
}

export function ClientMapBlock(props: MapPreviewProps) {
const datasetsToUse = props.allAvailableDatasets || [];
if (datasetsToUse.length === 0) {
    return (
      <div className='relative w-full h-[250px] flex items-center justify-center bg-gray-100'>
        <p className='text-gray-600'>No datasets available</p>
      </div>
    );
  }

const transformed = transformToVedaData(datasetsToUse as any);
  return (
    // <DevseedUIThemeProvider>
    //   <VedaUIConfigProvider>
    //     <DataProvider initialDatasets={datasetsToUse}>
          <div className='relative w-full h-[250px]'>
            <MapBlock 
              {...props} 
              datasets={transformed} 
              layerId={props.layerId || 'default'}
              datasetId={props.datasetId || 'default'}
              dateTime={props.dateTime || new Date().toISOString()}
              center={props.center || [-94.5, 41.25]}
              zoom={props.zoom || 8.3}
            />
          </div>
    //     </DataProvider>
    //   </VedaUIConfigProvider>
    // </DevseedUIThemeProvider>
  );
}

// Make sure ClientMapBlock is the default export for dynamic imports to work correctly
export default ClientMapBlock;

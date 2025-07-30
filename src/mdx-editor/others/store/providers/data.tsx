import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReactQueryProvider } from '@teamimpact/veda-ui';

interface DatasetMetadata {
  id: string;
  name: string;
  description: string;
  [key: string]: any;
}

interface DataStore {
  datasets?: DatasetMetadata[];
  setDatasets?: React.Dispatch<
    React.SetStateAction<DatasetMetadata[] | undefined>
  >;
}

export const DataContext = createContext<DataStore>({});

export function useDataStore() {
  return useContext<DataStore>(DataContext);
}

// @TODO: Decided how to handle function as mapLabel from VEDA UI
// https://github.com/NASA-IMPACT/veda-ui/issues/1377
function updateMapLabels(data) {
  return data.map((dataset) => {
    if (dataset.metadata && dataset.metadata.layers) {
      dataset.metadata.layers.forEach((layer) => {
        if (layer.mapLabel && typeof layer.mapLabel === 'string') {
          // Instead of eval, we'll keep it as a string
          // The consuming code should handle the function creation if needed
          // This is safer and avoids eval() security issues
          console.warn('mapLabel as string functions are not automatically evaluated for security reasons');
        }
        if (layer.compare && layer.compare.mapLabel && typeof layer.compare.mapLabel === 'string') {
          console.warn('compare.mapLabel as string functions are not automatically evaluated for security reasons');
        }
      });
    }
    return dataset;
  });
}

function DataProvider({
  initialDatasets = undefined,
  children,
}: {
  children: JSX.Element | ReactNode;
  initialDatasets: any[] | undefined;
}) {
  const [datasets, setDatasets] = useState<any[] | undefined>(
    updateMapLabels(initialDatasets),
  );
  const value = {
    datasets,
    setDatasets,
  };

  return (
    <DataContext.Provider value={value}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </DataContext.Provider>
  );
}

export default DataProvider;

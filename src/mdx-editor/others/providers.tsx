import React, { ReactNode } from "react";
import DataProvider from "./store/providers/data";
import VedaUIConfigProvider from "./store/providers/veda-ui-config";
import DevseedUIThemeProvider from "./store/providers/theme";

interface DatasetMetadata {
  id: string;
  name: string;
  description: string;
  [key: string]: any;
}

interface ProviderProps {
  datasets?: DatasetMetadata[];
  children: ReactNode;
  vedaConfig?: {
    envMapboxToken?: string;
    envApiStacEndpoint?: string;
    envApiRasterEndpoint?: string;
  };
}

export default function Providers({ datasets, children, vedaConfig }: ProviderProps) {
  return (
    <>
      <DevseedUIThemeProvider>
        <VedaUIConfigProvider vedaConfig={vedaConfig}>
          {datasets ? (
            <DataProvider initialDatasets={datasets}>{children}</DataProvider>
          ) : (
            { children }
          )}
        </VedaUIConfigProvider>
      </DevseedUIThemeProvider>
    </>
  );
}

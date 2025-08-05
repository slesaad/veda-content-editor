import React, { ReactNode } from "react";
// import DataProvider from "./store/providers/data";
// import { VedaUIConfigProvider } from "./store/providers/veda-ui-config";
// import DevseedUIThemeProvider from "./store/providers/theme";

interface DatasetMetadata {
  id: string;
  name: string;
  description: string;
  [key: string]: any;
}

interface ProviderProps {
  datasets?: DatasetMetadata[];
  children: ReactNode;
}

export default function Providers({ datasets, children }: ProviderProps) {
  // console.log("DevseedUIThemeProvider:", DevseedUIThemeProvider);
  // console.log("VedaUIConfigProvider:", VedaUIConfigProvider);

  return (
    <>
      {/* <DevseedUIThemeProvider>
        <VedaUIConfigProvider> */}
      {/* {datasets ? (
            <DataProvider initialDatasets={datasets}>{children}</DataProvider>
          ) : ( */}
      {children}
      {/* )} */}
      {/* </VedaUIConfigProvider>
      </DevseedUIThemeProvider> */}
    </>
  );
}

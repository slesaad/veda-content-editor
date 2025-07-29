import React from 'react';
import EditorPage from './VEDAContentEditor';
import { allAvailableDatasets } from './mdx-editor/components/alldatasets';

export default function App() {
  console.log("huhuhuh")
  console.log(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)

  return (
    <div className="app-container">
      <EditorPage allAvailableDatasets={allAvailableDatasets}/>
    </div>
  );
}

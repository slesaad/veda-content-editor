import React, { useState, useEffect } from "react";

import { MDXProvider } from "@mdx-js/react";
// import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { customComponents } from "./components";
// import { ChartWrapper } from './ChartPreview';
import { DEFAULT_MAP_PROPS } from "./ToolbarComponents";
import { highlight } from "sugar-high";
// import { Link } from "react-router-dom";
// import { allAvailableDatasets } from "./alldatasets";
// import {
//   Block,
//   Prose,
// Caption,
// Chapter,
// Figure,
// Image,
// LegacyGlobalStyles,
// } from "@teamimpact/veda-ui";
// import { mockDatasets } from './MapPreview';
// import Providers from "../others/providers";
// Correctly import the default export from mdx-preview-map with error handling

// import { ClientMapBlock } from "./MapPreview";

// const MapWrapper = (props) => {
//   try {
//     // Handle center prop safely
//     let center;
//     try {
//       center =
//         typeof props.center === "string" && props.center.startsWith("[")
//           ? JSON.parse(props.center)
//           : props.center || DEFAULT_MAP_PROPS.center;
//     } catch (error) {
//       console.warn("Error parsing center coordinates, using default:", error);
//       center = DEFAULT_MAP_PROPS.center;
//     }

//     // Handle zoom prop safely
//     let zoom;
//     try {
//       zoom =
//         typeof props.zoom === "string"
//           ? parseFloat(props.zoom) || DEFAULT_MAP_PROPS.zoom
//           : props.zoom || DEFAULT_MAP_PROPS.zoom;
//     } catch (error) {
//       console.warn("Error parsing zoom level, using default:", error);
//       zoom = DEFAULT_MAP_PROPS.zoom;
//     }

// return (
// <ClientMapBlock
//   {...props}
//   center={center}
//   zoom={zoom}
//   datasetId={props.datasetId}
//   layerId={props.layerId}
//   dateTime={props.dateTime}
//   compareDateTime={props.compareDateTime}
//   compareLabel={props.compareLabel}
//   allAvailableDatasets={allAvailableDatasets}
// />
//     <div>CLIENT MAP BLOCK SHOULD BE RIGHT HERE</div>
//   );
// } catch (error) {
//   console.error("Error rendering map:", error);
//   return (
//     <div className="h-[400px] flex items-center justify-center bg-red-50 border border-red-300 rounded">
//       <div className="text-red-500">Error rendering map component</div>
//     </div>
//   );
// }
// };

// function Table({ data }: { data: any }) {
//   const headers = data.headers.map((header, index) => (
//     <th key={index}>{header}</th>
//   ));
//   const rows = data.rows.map((row, index) => (
//     <tr key={index}>
//       {row.map((cell, cellIndex) => (
//         <td key={cellIndex}>{cell}</td>
//       ))}
//     </tr>
//   ));

//   return (
//     <table>
//       <thead>
//         <tr>{headers}</tr>
//       </thead>
//       <tbody>{rows}</tbody>
//     </table>
//   );
// }

// function Code({ children, ...props }: { children: any }) {
//   const codeHTML = highlight(children);
//   return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
// }

// interface MDXPreviewProps {
//   source: string;
// }

// function slugify(str) {
//   if (str != null || str != undefined) {
//     return str
//       .toString()
//       .toLowerCase()
//       .trim() // Remove whitespace from both ends of a string
//       .replace(/\s+/g, "-") // Replace spaces with -
//       .replace(/&/g, "-and-") // Replace & with 'and'
//       .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
//       .replace(/\-\-+/g, "-"); // Replace multiple - with single -
//   }
// }
// function createHeading(level) {
//   const Heading = ({ children }: { children: JSX.Element }) => {
//     const slug = slugify(children);
//     return React.createElement(
//       `h${level}`,
//       { id: slug },
//       [
//         React.createElement("a", {
//           href: `#${slug}`,
//           key: `link-${slug}`,
//           className: "anchor",
//         }),
//       ],
//       children
//     );
//   };

//   Heading.displayName = `Heading${level}`;

//   return Heading;
// }
// Define all components used in MDX
const components = {
  ...customComponents,
  // Basic markdown components
  // h1: createHeading(1),
  // h2: createHeading(2),
  // h3: createHeading(3),
  // h4: createHeading(4),
  // h5: createHeading(5),
  // h6: createHeading(6),
  // code: Code,
  // Table,
  // Block: Block,
  // Prose: Prose,
  // Caption: Caption,
  // Figure: Figure,
  // Image: Image,
  // // Link: Link,
  // Chapter: Chapter,
  TwoColumn: (props) => {
    return (
      <div className="grid-container maxw-full">
        <div className="grid-row grid-gap-lg">{props.children}</div>
      </div>
    );
  },
  LeftColumn: (props) => {
    return <div className="grid-col-6 ">{props.children}</div>;
  },
  RightColumn: (props) => {
    return <div className="grid-col-6  ">{props.children}</div>;
  },

  // Map: MapWrapper,
  // Chart: ChartWrapper,
};

const MdxRuntime = ({ source, components }) => {
  const [mdxModule, setMdxModule] = useState(null);
  const [error, setError] = useState(null);
  //test
  useEffect(() => {
    const evaluateMdx = async () => {
      try {
        // const mod = await evaluate(source, { ...runtime });
        setMdxModule(source);
        setError(null);
      } catch (e) {
        console.error("MDX evaluation error:", e);
        setError(e);
      }
    };
    evaluateMdx();
  }, [source]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        <h4>MDX Preview Error</h4>
        <pre className="whitespace-pre-wrap">{error.message}</pre>
      </div>
    );
  }

  if (!mdxModule) {
    return <div className="p-4">Compiling MDX...</div>;
  }

  const Content = mdxModule.default;

  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  );
};

export function SimpleMDXPreview({ source }) {
  // Use an empty string as a default if source is undefined
  // const datasets = getDatasetsMetadata();
  const safeSource = source || "";

  return (
    <section>
      <article className="prose">
        {/* <Providers datasets={allAvailableDatasets}> */}
        {/* <LegacyGlobalStyles /> */}
        <MdxRuntime source={safeSource} components={components as any} />
        {safeSource}
        {/* </Providers> */}
      </article>
    </section>
  );
}

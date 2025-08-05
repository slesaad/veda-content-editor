// Type definitions for VEDA Content Editor

export interface DatasetMetadata {
  id: string;
  name: string;
  description?: string;
  layers?: any[];
  [key: string]: any;
}

export interface VEDAContentEditorProps {
  allAvailableDatasets?: any[];
  initialContent?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export interface DatasetWithContent {
  metadata: {
    id: string;
    name: string;
    description: string;
    taxonomy?: any[];
    layers?: any[];
    [key: string]: any;
  };
  [key: string]: any;
}
// Re-export the EditorPageProps from the main component
export type { EditorPageProps } from "../VEDAContentEditor";

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

// Re-export the EditorPageProps from the main component
export type { EditorPageProps } from '../VEDAContentEditor';
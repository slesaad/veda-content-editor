import React, { ReactNode } from 'react';

interface MyLeafProps {
  foo?: string;
  bar?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const MyLeaf: React.FC<MyLeafProps> = ({ foo, bar, onClick, children }) => {
  return (
    <span className="bg-yellow-100 px-2 py-1 rounded" onClick={typeof onClick === 'function' ? onClick : () => {}}>
      {foo && <span className="text-blue-500 mr-1">{foo}:</span>}
      {bar && <span className="text-green-500 mr-1">{bar}:</span>}
      {children}
    </span>
  );
};

interface MarkerProps {
  type?: string;
  children: ReactNode;
}

export const Marker: React.FC<MarkerProps> = ({ type, children }) => (
  <span className="border border-red-500 p-1 rounded inline-block">
    {type && <span className="text-xs text-red-500 mr-1">{type}:</span>}
    {children}
  </span>
);

interface BlockNodeProps {
  children: ReactNode;
}

export const BlockNode: React.FC<BlockNodeProps> = ({ children }) => (
  <div className="border-l-4 border-blue-500 pl-4 my-4">{children}</div>
);

// Export a components object for convenience
export const customComponents = {
  MyLeaf,
  Marker,
  BlockNode,
};
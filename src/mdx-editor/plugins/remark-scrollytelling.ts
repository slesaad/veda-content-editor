import { visit } from 'unist-util-visit';
import type { Root, Node } from 'mdast';

export function remarkDummyButtonSerialize() {
    return (tree: Root) => {
      console.log('✅ Serialize plugin is executing...'); // ADD THIS
      visit(tree, 'mdxJsxFlowElement', (node: Node) => {
        if ((node as any).name === 'DummyButton') {
          console.log('🚨 Found DummyButton for serialization:', node); // ADD THIS
          (node as any).name = 'ScrollytellingBlock';
          (node as any).children = [
            {
              type: 'mdxJsxFlowElement',
              name: 'Chapter',
              attributes: [
                { type: 'mdxJsxAttribute', name: 'center', value: '[77.63,24.27]' },
                { type: 'mdxJsxAttribute', name: 'zoom', value: '2' },
                { type: 'mdxJsxAttribute', name: 'datasetId', value: 'lis-global-da-trends' },
                { type: 'mdxJsxAttribute', name: 'layerId', value: 'lis-global-da-tws-trend' },
                { type: 'mdxJsxAttribute', name: 'datetime', value: '2003-01-01' }
              ],
              children: [
                { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Freshwater is depleting' }] },
                { type: 'paragraph', children: [{ type: 'text', value: 'Over the globe, terrestrial water storage...' }] }
              ]
            }
          ];
        }
      });
    };
  }

export function remarkDummyButtonDeserialize() {
  return (tree: Root) => {
    console.log('🚩 Deserialize Plugin Running');
    visit(tree, 'mdxJsxFlowElement', (node: Node) => {
      if ((node as any).name === 'ScrollytellingBlock') {
        const chapterNode = (node as any).children.find((child: any) => child.type === 'mdxJsxFlowElement' && child.name === 'Chapter');
        if (chapterNode) {
          (node as any).name = 'DummyButton';
          (node as any).attributes = [];
          (node as any).children = [];
        }
      }
    });
  };
}

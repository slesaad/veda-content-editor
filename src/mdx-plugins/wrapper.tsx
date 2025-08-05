

export const wrapNodesInBlockAndProse = () => {
  return (tree) => {
    tree.children = tree.children.map((node) => ({
      type: 'mdxJsxFlowElement',
      name: 'block',
      attributes: [],
      children: [
        {
          type: 'mdxJsxFlowElement',
          name: 'prose',
          attributes: [],
          children: [node],
        },
      ],
    }))
  }
}
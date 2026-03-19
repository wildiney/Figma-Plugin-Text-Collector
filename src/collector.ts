export type TextLikeNode = { type: 'TEXT'; characters: string }
export type ParentLikeNode = { type: string; children: AnyNode[] }
export type LeafNode = { type: string }
export type AnyNode = TextLikeNode | ParentLikeNode | LeafNode

export function collectTextFromNode(node: AnyNode, set: Set<string>): void {
  if ('children' in node) {
    for (const child of (node as ParentLikeNode).children) {
      collectTextFromNode(child, set)
    }
  } else if (node.type === 'TEXT') {
    set.add((node as TextLikeNode).characters)
  }
}

export function collectTexts(nodes: AnyNode[]): string {
  const texts = new Set<string>()
  for (const node of nodes) {
    collectTextFromNode(node, texts)
  }
  return [...texts].join('\n')
}

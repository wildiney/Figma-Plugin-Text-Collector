const textNodes = new Set()

function findTextNodes (node: SceneNode) {
  if ("children" in node) {
    for (const child of node.children) {
      findTextNodes(child)
    }
  } else if (node.type === "TEXT") {
    textNodes.add(node.characters)
  }
}

for (const node of figma.currentPage.children) {
  findTextNodes(node)
}

console.log([...textNodes])

figma.closePlugin()
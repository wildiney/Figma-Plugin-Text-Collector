function collectTextFromNode (node: SceneNode, set: Set<string>) {
  if ("children" in node) {
    for (const child of node.children) {
      collectTextFromNode(child, set)
    }
  } else if (node.type === "TEXT") {
    set.add(node.characters)
  }
}

function collectFromPage () {
  const texts = new Set<string>()
  for (const node of figma.currentPage.children) {
    collectTextFromNode(node, texts)
  }
  return [...texts].join("\n")
}

function collectFromSelection () {
  const selection = figma.currentPage.selection
  const texts = new Set<string>()

  if (selection.length === 0) {
    figma.notify("Selecione um ou mais frames.")
    return ""
  }

  for (const node of selection) {
    collectTextFromNode(node, texts)
  }

  return [...texts].join("\n")
}

figma.showUI(__html__, { width: 480, height: 360 })

figma.ui.onmessage = (msg) => {
  if (msg.type === "collect-all") {
    const result = collectFromPage()
    figma.ui.postMessage({ type: "show-text", content: result })
  }

  if (msg.type === "collect-selection") {
    const result = collectFromSelection()
    figma.ui.postMessage({ type: "show-text", content: result })
  }

  if (msg.type === "copy") {
    // Copia via UI (invisível para o plugin)
    figma.ui.postMessage({ type: "copy-to-clipboard" })
  }

  if (msg.type === "close") {
    figma.closePlugin()
  }
}


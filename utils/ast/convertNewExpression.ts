function convertNodeToRightExpression(node) {
  switch (node.type) {
    case 'Literal':
      return JSON.stringify(node.value);
    case 'Identifier':
      return node.name;
    case 'NewExpression':
      return convertNodeToRightExpression(node);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

export function convertNewExpressionNode(node) {
  const constructorName = node.callee.name;
  const args = node.arguments.map(convertNodeToRightExpression);
  return `new ${constructorName}(${args.join(', ')})`;
}

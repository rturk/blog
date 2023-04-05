import { unified } from 'unified';
import remarkMDX from 'remark-mdx';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { convertNewExpressionNode } from './ast/convertNewExpression';

type Frontmatter = Partial<{
  title: string;
  description: string;
  og: string;
  date: string; 
}>

export const getPostFrontmatter = (post: string) => {
  const processor = unified()
    .use(remarkMDX)
    .use(remarkParse);

  const tree = processor.parse(post);

  const frontmatter: Frontmatter = {};

  visit(tree, 'mdxjsEsm', (node) => {
    if (!node.value.includes('export const meta = ')) {
      return;
    }

    visitAST(node.data.estree, {
      Property: (property) => {
        if (property.key.name === 'title') {
          frontmatter.title = property.value.value;
        }

        if (property.key.name === 'description') {
          frontmatter.description = property.value.value;
        }

        if (property.key.name === 'og') {
          frontmatter.og = property.value.value;
        }

        if (property.key.name === 'date') {
          frontmatter.date = eval(convertNewExpressionNode(property.value)); // unsafe - evaluate a Date object as string
        }
      }
    });
  });

  return frontmatter;
}

function visitAST(node, visitor) {
  const keys = Object.keys(node);
  for (const key of keys) {
    if (key === 'type') {
      const type = node.type;
      if (visitor[type]) {
        visitor[type](node);
        console.dir({ node }, { depth: null });
      }
    } else if (typeof node[key] === 'object' && node[key] !== null) {
      if (Array.isArray(node[key])) {
        for (const item of node[key]) {
          visitAST(item, visitor);
        }
      } else {
        visitAST(node[key], visitor);
      }
    }
  }
}

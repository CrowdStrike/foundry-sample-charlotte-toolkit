// src/components/markdown/index.ts

import { SlIcon } from '@shoelace-style/shoelace/dist/react';
import React from 'react';

import { CodeBlock } from './CodeBlock';
import { InlineCode } from './InlineCode';

export { CodeBlock } from './CodeBlock';
export { InlineCode } from './InlineCode';

// Simple components that don't need separate files
// biome-ignore lint/suspicious/noExplicitAny: React markdown component props vary by element type, typing would require complex union types
export const HeadingWithAnchor = ({ level, children, ...props }: any) => {
  const tagName = `h${level}`;
  const id = String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const headingIcons = {
    1: 'file-text',
    2: 'list-ul',
    3: 'chevron-right',
    4: 'dot',
    5: 'dot',
    6: 'dot',
  };

  const iconName = headingIcons[level as keyof typeof headingIcons] || 'dot';

  return React.createElement(
    tagName,
    { id, className: 'group flex items-center gap-2', ...props },
    React.createElement(SlIcon, {
      name: iconName,
      className: 'text-sm flex-shrink-0',
    }),
    children,
  );
};

// biome-ignore lint/suspicious/noExplicitAny: React markdown component props vary by element type, typing would require complex union types
export const ListItem = ({ children, ...props }: any) => {
  return React.createElement(
    'li',
    { className: 'flex items-start gap-2', ...props },
    React.createElement(SlIcon, {
      name: 'dot',
      className: 'secondary-text text-sm mt-0.5 flex-shrink-0',
    }),
    React.createElement('span', null, children),
  );
};

export const createMarkdownRenderers = () => ({
  // biome-ignore lint/suspicious/noExplicitAny: React markdown renderer props are dynamically typed by react-markdown library
  code: ({ _node, inline, className, children, ...props }: any) => {
    return inline
      ? React.createElement(InlineCode, { className, ...props }, children)
      : React.createElement(CodeBlock, { className, ...props }, children);
  },
  // biome-ignore lint/suspicious/noExplicitAny: React markdown renderer props are dynamically typed by react-markdown library
  heading: ({ _node, level, children, ...props }: any) =>
    React.createElement(HeadingWithAnchor, { level, ...props }, children),
  // biome-ignore lint/suspicious/noExplicitAny: React markdown renderer props are dynamically typed by react-markdown library
  li: ({ _node, children, ...props }: any) => React.createElement(ListItem, { ...props }, children),
});

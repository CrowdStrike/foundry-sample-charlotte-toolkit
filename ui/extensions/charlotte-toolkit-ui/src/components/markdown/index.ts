// src/components/markdown/index.ts

import { SlIcon } from '@shoelace-style/shoelace/dist/react';
import React from 'react';

import { CodeBlock } from './CodeBlock';
import { InlineCode } from './InlineCode';

export { CodeBlock } from './CodeBlock';
export { InlineCode } from './InlineCode';

// Type definitions for markdown components
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

interface CodeComponentProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface HeadingComponentProps {
  node?: unknown;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

interface ListComponentProps {
  node?: unknown;
  children: React.ReactNode;
}

// Simple components that don't need separate files
export const HeadingWithAnchor = ({
  level,
  children,
  ...props
}: HeadingProps) => {
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

export const ListItem = ({ children, ...props }: ListItemProps) => {
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
  code: ({ node: _node, inline, className, children }: CodeComponentProps) => {
    const props = { ...(className && { className }), children };
    return inline
      ? React.createElement(InlineCode, props)
      : React.createElement(CodeBlock, props);
  },
  heading: ({ node: _node, level, children }: HeadingComponentProps) =>
    React.createElement(HeadingWithAnchor, { level, children }),
  li: ({ node: _node, children }: ListComponentProps) =>
    React.createElement(ListItem, { children }),
});

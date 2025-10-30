// src/components/markdown/index.ts

import { SlIcon } from '@shoelace-style/shoelace/dist/react';
import React from 'react';

import { CodeBlock } from './CodeBlock';
import { InlineCode } from './InlineCode';

// Type definitions
interface HeadingWithAnchorProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: number;
  children?: React.ReactNode;
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

interface CodeRendererProps extends React.HTMLAttributes<HTMLElement> {
  _node?: unknown;
  inline?: boolean;
  className?: string | undefined;
  children?: React.ReactNode;
}

interface HeadingRendererProps extends React.HTMLAttributes<HTMLHeadingElement> {
  _node?: unknown;
  level: number;
  children?: React.ReactNode;
}

interface ListItemRendererProps extends React.HTMLAttributes<HTMLLIElement> {
  _node?: unknown;
  children?: React.ReactNode;
}

// Simple components used only internally
const HeadingWithAnchor = ({ level, children, ...props }: HeadingWithAnchorProps) => {
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

const ListItem = ({ children, ...props }: ListItemProps) => {
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
  code: ({ inline, className, children }: CodeRendererProps) => {
    const codeProps = { children, ...(className && { className }) };
    return inline
      ? React.createElement(InlineCode, codeProps)
      : React.createElement(CodeBlock, codeProps);
  },
  heading: ({ level, children, ...props }: HeadingRendererProps) =>
    React.createElement(HeadingWithAnchor, { level, children, ...props }),
  li: ({ children, ...props }: ListItemRendererProps) =>
    React.createElement(ListItem, { children, ...props }),
});

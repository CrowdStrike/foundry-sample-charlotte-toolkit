import { render } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createMarkdownRenderers } from '../index';

// Type definitions for mocked components
interface SlIconProps {
  name: string;
  className?: string;
}

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

interface InlineCodeProps {
  children?: React.ReactNode;
  className?: string;
}

interface CodeRendererProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface HeadingRendererProps {
  level: number;
  children?: React.ReactNode;
}

interface ListItemRendererProps {
  children?: React.ReactNode;
}

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlIcon: ({ name, className }: SlIconProps) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  ),
}));

// Mock CodeBlock and InlineCode
vi.mock('../CodeBlock', () => ({
  CodeBlock: ({ children, className }: CodeBlockProps) => (
    <div data-testid="code-block" data-classname={className}>
      {children}
    </div>
  ),
}));

vi.mock('../InlineCode', () => ({
  InlineCode: ({ children, className }: InlineCodeProps) => (
    <span data-testid="inline-code" data-classname={className}>
      {children}
    </span>
  ),
}));

describe('createMarkdownRenderers', () => {
  describe('code renderer', () => {
    it('should render inline code for inline prop', () => {
      const renderers = createMarkdownRenderers();
      const CodeRenderer = renderers.code as React.ComponentType<CodeRendererProps>;

      const { container } = render(
        <CodeRenderer inline={true} className="language-js">
          test code
        </CodeRenderer>,
      );

      expect(container.querySelector('[data-testid="inline-code"]')).toBeDefined();
    });

    it('should render code block for non-inline code', () => {
      const renderers = createMarkdownRenderers();
      const CodeRenderer = renderers.code as React.ComponentType<CodeRendererProps>;

      const { container } = render(
        <CodeRenderer inline={false} className="language-js">
          test code
        </CodeRenderer>,
      );

      expect(container.querySelector('[data-testid="code-block"]')).toBeDefined();
    });

    it('should pass className to inline code', () => {
      const renderers = createMarkdownRenderers();
      const CodeRenderer = renderers.code as React.ComponentType<CodeRendererProps>;

      const { container } = render(
        <CodeRenderer inline={true} className="language-python">
          code
        </CodeRenderer>,
      );

      const inlineCode = container.querySelector('[data-testid="inline-code"]');
      expect(inlineCode?.getAttribute('data-classname')).toBe('language-python');
    });

    it('should pass className to code block', () => {
      const renderers = createMarkdownRenderers();
      const CodeRenderer = renderers.code as React.ComponentType<CodeRendererProps>;

      const { container } = render(
        <CodeRenderer inline={false} className="language-typescript">
          code
        </CodeRenderer>,
      );

      const codeBlock = container.querySelector('[data-testid="code-block"]');
      expect(codeBlock?.getAttribute('data-classname')).toBe('language-typescript');
    });

    it('should handle code without className', () => {
      const renderers = createMarkdownRenderers();
      const CodeRenderer = renderers.code as React.ComponentType<CodeRendererProps>;

      const { container } = render(<CodeRenderer inline={true}>code</CodeRenderer>);

      expect(container.querySelector('[data-testid="inline-code"]')).toBeDefined();
    });
  });

  describe('heading renderer', () => {
    it('should render heading with correct level', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={1}>Test Heading</HeadingRenderer>);

      const h1 = container.querySelector('h1');
      expect(h1).toBeDefined();
      expect(h1?.textContent).toContain('Test Heading');
    });

    it('should render h2 heading', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={2}>Level 2</HeadingRenderer>);

      expect(container.querySelector('h2')).toBeDefined();
    });

    it('should render h3 heading', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={3}>Level 3</HeadingRenderer>);

      expect(container.querySelector('h3')).toBeDefined();
    });

    it('should generate id from heading text', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={2}>Test Heading</HeadingRenderer>);

      const h2 = container.querySelector('h2');
      expect(h2?.id).toBe('test-heading');
    });

    it('should handle special characters in heading text', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(
        <HeadingRenderer level={2}>Test & Special: Characters!</HeadingRenderer>,
      );

      const h2 = container.querySelector('h2');
      expect(h2?.id).toBe('test-special-characters');
    });

    it('should render icon based on heading level', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      // Level 1 should have file-text icon
      const { container: container1 } = render(<HeadingRenderer level={1}>H1</HeadingRenderer>);
      expect(container1.querySelector('[data-testid="icon-file-text"]')).toBeDefined();

      // Level 2 should have list-ul icon
      const { container: container2 } = render(<HeadingRenderer level={2}>H2</HeadingRenderer>);
      expect(container2.querySelector('[data-testid="icon-list-ul"]')).toBeDefined();

      // Level 3 should have chevron-right icon
      const { container: container3 } = render(<HeadingRenderer level={3}>H3</HeadingRenderer>);
      expect(container3.querySelector('[data-testid="icon-chevron-right"]')).toBeDefined();

      // Level 4+ should have dot icon
      const { container: container4 } = render(<HeadingRenderer level={4}>H4</HeadingRenderer>);
      expect(container4.querySelector('[data-testid="icon-dot"]')).toBeDefined();
    });

    it('should apply group and flex classes', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={2}>Heading</HeadingRenderer>);

      const h2 = container.querySelector('h2');
      expect(h2?.className).toContain('group');
      expect(h2?.className).toContain('flex');
      expect(h2?.className).toContain('items-center');
    });

    it('should handle numeric children', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={2}>{123}</HeadingRenderer>);

      const h2 = container.querySelector('h2');
      expect(h2?.id).toBe('123');
    });
  });

  describe('list item renderer', () => {
    it('should render list item with content', () => {
      const renderers = createMarkdownRenderers();
      const ListItemRenderer = renderers.li as React.ComponentType<ListItemRendererProps>;

      const { container } = render(<ListItemRenderer>List item content</ListItemRenderer>);

      const li = container.querySelector('li');
      expect(li?.textContent).toContain('List item content');
    });

    it('should render dot icon', () => {
      const renderers = createMarkdownRenderers();
      const ListItemRenderer = renderers.li as React.ComponentType<ListItemRendererProps>;

      const { container } = render(<ListItemRenderer>Item</ListItemRenderer>);

      expect(container.querySelector('[data-testid="icon-dot"]')).toBeDefined();
    });

    it('should apply flex layout classes', () => {
      const renderers = createMarkdownRenderers();
      const ListItemRenderer = renderers.li as React.ComponentType<ListItemRendererProps>;

      const { container } = render(<ListItemRenderer>Item</ListItemRenderer>);

      const li = container.querySelector('li');
      expect(li?.className).toContain('flex');
      expect(li?.className).toContain('items-start');
    });

    it('should wrap children in span', () => {
      const renderers = createMarkdownRenderers();
      const ListItemRenderer = renderers.li as React.ComponentType<ListItemRendererProps>;

      const { container } = render(<ListItemRenderer>Content</ListItemRenderer>);

      const span = container.querySelector('li > span');
      expect(span?.textContent).toBe('Content');
    });

    it('should handle complex children', () => {
      const renderers = createMarkdownRenderers();
      const ListItemRenderer = renderers.li as React.ComponentType<ListItemRendererProps>;

      const { container } = render(
        <ListItemRenderer>
          <strong>Bold</strong> text
        </ListItemRenderer>,
      );

      const li = container.querySelector('li');
      expect(li?.textContent).toContain('Bold');
      expect(li?.textContent).toContain('text');
    });
  });

  describe('renderer integration', () => {
    it('should return all three renderers', () => {
      const renderers = createMarkdownRenderers();

      expect(renderers.code).toBeDefined();
      expect(renderers.heading).toBeDefined();
      expect(renderers.li).toBeDefined();
    });

    it('should create consistent renderers across calls', () => {
      const renderers1 = createMarkdownRenderers();
      const renderers2 = createMarkdownRenderers();

      expect(typeof renderers1.code).toBe('function');
      expect(typeof renderers2.code).toBe('function');
      expect(typeof renderers1.heading).toBe('function');
      expect(typeof renderers2.heading).toBe('function');
      expect(typeof renderers1.li).toBe('function');
      expect(typeof renderers2.li).toBe('function');
    });
  });

  describe('edge cases', () => {
    it('should handle empty heading text', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={2}>{''}</HeadingRenderer>);

      const h2 = container.querySelector('h2');
      expect(h2?.id).toBe('');
    });

    it('should handle heading with only whitespace', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={2}> </HeadingRenderer>);

      const h2 = container.querySelector('h2');
      expect(h2).toBeDefined();
    });

    it('should handle very long heading text', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const longText = 'a'.repeat(1000);
      const { container } = render(<HeadingRenderer level={2}>{longText}</HeadingRenderer>);

      const h2 = container.querySelector('h2');
      expect(h2).toBeDefined();
    });

    it('should handle heading level beyond defined icons', () => {
      const renderers = createMarkdownRenderers();
      const HeadingRenderer = renderers.heading as React.ComponentType<HeadingRendererProps>;

      const { container } = render(<HeadingRenderer level={7}>Level 7</HeadingRenderer>);

      // Should default to dot icon
      expect(container.querySelector('[data-testid="icon-dot"]')).toBeDefined();
    });

    it('should handle list item with no children', () => {
      const renderers = createMarkdownRenderers();
      const ListItemRenderer = renderers.li as React.ComponentType<ListItemRendererProps>;

      const { container } = render(<ListItemRenderer />);

      const li = container.querySelector('li');
      expect(li).toBeDefined();
    });
  });
});

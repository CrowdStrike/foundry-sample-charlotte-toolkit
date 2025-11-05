import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdvancedOptionsPanel from '../AdvancedOptionsPanel';

// Mock constants
vi.mock('../../../utils/constants', () => ({
  TEMPERATURE_OPTIONS: [
    { value: 0, label: 'Precise (0)' },
    { value: 0.5, label: 'Balanced (0.5)' },
    { value: 1, label: 'Creative (1)' },
  ],
}));

// Type definitions for mocked Shoelace components
interface SlDetailsProps {
  children: React.ReactNode;
  summary: string;
  className?: string;
}

interface SlCheckboxProps {
  children: React.ReactNode;
  checked: boolean;
  onSlChange?: (event: CustomEvent) => void;
}

interface SlSelectProps {
  children: React.ReactNode;
  value: string | number;
  onSlChange?: (event: CustomEvent) => void;
}

interface SlOptionProps {
  children: React.ReactNode;
  value: string | number;
}

interface SlInputProps {
  value: string;
  onSlInput?: (event: CustomEvent) => void;
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface SlTextareaProps {
  value: string;
  onSlInput?: (event: CustomEvent) => void;
  placeholder?: string;
  rows?: number;
  children?: React.ReactNode;
}

interface SlButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: string;
}

interface SlIconProps {
  name: string;
  className?: string;
}

interface SlTooltipProps {
  children: React.ReactNode;
  content: string;
}

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlDetails: ({ children, summary, className }: SlDetailsProps) => (
    <details data-testid="sl-details" className={className} open>
      <summary>{summary}</summary>
      <div>{children}</div>
    </details>
  ),
  SlCheckbox: ({ children, checked, onSlChange }: SlCheckboxProps) => (
    <label data-testid="sl-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-change');
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            writable: false,
          });
          onSlChange?.(customEvent as CustomEvent);
        }}
        data-testid="checkbox-input"
      />
      <span>{children}</span>
    </label>
  ),
  SlSelect: ({ children, value, onSlChange }: SlSelectProps) => (
    <div data-testid="sl-select">
      <select
        value={value}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-change');
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            writable: false,
          });
          onSlChange?.(customEvent as CustomEvent);
        }}
        data-testid="temperature-select"
      >
        {children}
      </select>
    </div>
  ),
  SlOption: ({ children, value }: SlOptionProps) => <option value={value}>{children}</option>,
  SlInput: ({ value, onSlInput, placeholder, onKeyDown }: SlInputProps) => (
    <input
      value={value}
      onChange={(e) => {
        const customEvent = new CustomEvent('sl-input');
        Object.defineProperty(customEvent, 'target', {
          value: e.target,
          writable: false,
        });
        onSlInput?.(customEvent as CustomEvent);
      }}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      data-testid="sl-input"
    />
  ),
  SlTextarea: ({ value, onSlInput, placeholder, rows, children }: SlTextareaProps) => (
    <div data-testid="sl-textarea-wrapper">
      {children}
      <textarea
        value={value}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-input');
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            writable: false,
          });
          onSlInput?.(customEvent as CustomEvent);
        }}
        placeholder={placeholder}
        rows={rows}
        data-testid="sl-textarea"
      />
    </div>
  ),
  SlButton: ({ children, onClick, disabled, size }: SlButtonProps) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid="sl-button"
      data-size={size}
    >
      {children}
    </button>
  ),
  SlIcon: ({ name, className }: SlIconProps) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  ),
  SlTooltip: ({ children, content }: SlTooltipProps) => (
    <div data-testid="sl-tooltip" data-content={content}>
      {children}
    </div>
  ),
}));

describe('AdvancedOptionsPanel', () => {
  const defaultProps = {
    showJsonTab: false,
    setShowJsonTab: vi.fn(),
    temperature: 0.5,
    setTemperature: vi.fn(),
    stopWords: [] as string[],
    setStopWords: vi.fn(),
    jsonSchema: '',
    setJsonSchema: vi.fn(),
    dataToInclude: [] as string[],
    setDataToInclude: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render successfully with summary', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByText('Advanced Options')).toBeDefined();
    });

    it('should render details element', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByTestId('sl-details')).toBeDefined();
    });

    it('should render all main sections', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByText('Show JSON objects')).toBeDefined();
      expect(screen.getByText('Temperature')).toBeDefined();
      expect(screen.getByText('Stop Sequences')).toBeDefined();
      expect(screen.getByText('JSON Schema')).toBeDefined();
      expect(screen.getByText('Data to Include')).toBeDefined();
    });
  });

  describe('Show JSON Tab', () => {
    it('should render checkbox unchecked by default', () => {
      render(<AdvancedOptionsPanel {...defaultProps} showJsonTab={false} />);

      const checkbox = screen.getByTestId('checkbox-input') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should render checkbox checked when showJsonTab is true', () => {
      render(<AdvancedOptionsPanel {...defaultProps} showJsonTab={true} />);

      const checkbox = screen.getByTestId('checkbox-input') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should call setShowJsonTab when checkbox is toggled', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const checkbox = screen.getByTestId('checkbox-input');
      await user.click(checkbox);

      expect(defaultProps.setShowJsonTab).toHaveBeenCalledWith(true);
    });

    it('should show tooltip for JSON tab option', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const jsonTooltip = tooltips.find((t) =>
        t.getAttribute('data-content')?.includes('Enable a JSON tab'),
      );
      expect(jsonTooltip).toBeDefined();
    });
  });

  describe('Temperature', () => {
    it('should render temperature select with current value', () => {
      render(<AdvancedOptionsPanel {...defaultProps} temperature={0.5} />);

      const select = screen.getByTestId('temperature-select') as HTMLSelectElement;
      expect(select.value).toBe('0.5');
    });

    it('should render all temperature options', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByText('Precise (0)')).toBeDefined();
      expect(screen.getByText('Balanced (0.5)')).toBeDefined();
      expect(screen.getByText('Creative (1)')).toBeDefined();
    });

    it('should call setTemperature when value changes', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const select = screen.getByTestId('temperature-select');
      await user.selectOptions(select, '1');

      expect(defaultProps.setTemperature).toHaveBeenCalledWith(1);
    });

    it('should show tooltip for temperature', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const tempTooltip = tooltips.find((t) =>
        t.getAttribute('data-content')?.includes('Controls randomness'),
      );
      expect(tempTooltip).toBeDefined();
    });

    it('should render thermometer icon', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByTestId('icon-thermometer')).toBeDefined();
    });
  });

  describe('Stop Words', () => {
    it('should show placeholder text when no stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);

      expect(
        screen.getByText(/Optional: Add stop sequences to control output termination/i),
      ).toBeDefined();
    });

    it('should render existing stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={['stop1', 'stop2']} />);

      expect(screen.getByText('stop1')).toBeDefined();
      expect(screen.getByText('stop2')).toBeDefined();
    });

    it('should show input for adding stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const input = screen.getAllByTestId('sl-input')[0];
      expect(input?.getAttribute('placeholder')).toBe('Enter stop sequence');
    });

    it('should add stop word when add button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const input = inputs[0];
      expect(input).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[0];
      expect(addButton).toBeDefined();

      await user.type(input as HTMLElement, 'new stop');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setStopWords).toHaveBeenCalledWith(['new stop']);
    });

    it('should add stop word on Enter key press', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const input = inputs[0];
      expect(input).toBeDefined();

      await user.type(input as HTMLElement, 'new stop{Enter}');

      expect(defaultProps.setStopWords).toHaveBeenCalledWith(['new stop']);
    });

    it('should remove stop word when x icon is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={['stop1', 'stop2']} />);

      const removeButtons = screen.getAllByTestId('icon-x');
      const removeButton = removeButtons[0];
      expect(removeButton).toBeDefined();
      await user.click(removeButton as HTMLElement);

      expect(defaultProps.setStopWords).toHaveBeenCalledWith(['stop2']);
    });

    it('should not add empty stop words', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const input = inputs[0];
      expect(input).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[0];
      expect(addButton).toBeDefined();

      await user.type(input as HTMLElement, '   ');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setStopWords).not.toHaveBeenCalled();
    });

    it('should disable add button when input is empty', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[0] as HTMLButtonElement;

      expect(addButton.disabled).toBe(true);
    });

    it('should limit to 4 stop words', () => {
      render(
        <AdvancedOptionsPanel {...defaultProps} stopWords={['stop1', 'stop2', 'stop3', 'stop4']} />,
      );

      expect(screen.getByText('Maximum 4 stop sequences allowed')).toBeDefined();
      expect(screen.queryByPlaceholderText('Enter stop sequence')).toBeNull();
    });

    it('should show tooltip for stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const stopTooltip = tooltips.find((t) =>
        t.getAttribute('data-content')?.includes('Up to 4 sequences'),
      );
      expect(stopTooltip).toBeDefined();
    });

    it('should trim whitespace from stop words', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const input = inputs[0];
      expect(input).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[0];
      expect(addButton).toBeDefined();

      await user.type(input as HTMLElement, '  trimmed  ');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setStopWords).toHaveBeenCalledWith(['trimmed']);
    });
  });

  describe('JSON Schema', () => {
    it('should render JSON schema textarea', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByTestId('sl-textarea')).toBeDefined();
    });

    it('should display current JSON schema value', () => {
      const schema = '{"type": "object"}';
      render(<AdvancedOptionsPanel {...defaultProps} jsonSchema={schema} />);

      const textarea = screen.getByTestId('sl-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(schema);
    });

    it('should call setJsonSchema when value changes', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const textarea = screen.getByTestId('sl-textarea');
      await user.type(textarea, 'test schema');

      expect(defaultProps.setJsonSchema).toHaveBeenCalled();
    });

    it('should show placeholder text', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const textarea = screen.getByTestId('sl-textarea');
      expect(textarea.getAttribute('placeholder')).toBe(
        'Enter JSON schema to define response structure...',
      );
    });

    it('should have 4 rows', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const textarea = screen.getByTestId('sl-textarea') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(4);
    });

    it('should show tooltip for JSON schema', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const schemaTooltip = tooltips.find((t) =>
        t.getAttribute('data-content')?.includes('JSON schema is used to define'),
      );
      expect(schemaTooltip).toBeDefined();
    });

    it('should render code-square icon', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      expect(screen.getByTestId('icon-code-square')).toBeDefined();
    });
  });

  describe('Data to Include', () => {
    it('should show placeholder text when no data', () => {
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);

      expect(screen.getByText(/Optional: Add custom data to enhance your analysis/i)).toBeDefined();
    });

    it('should render existing data items', () => {
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={['data1', 'data2']} />);

      expect(screen.getByText('data1')).toBeDefined();
      expect(screen.getByText('data2')).toBeDefined();
    });

    it('should add data when add button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[inputs.length - 1];
      expect(dataInput).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[buttons.length - 1];
      expect(addButton).toBeDefined();

      await user.type(dataInput as HTMLElement, 'new data');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setDataToInclude).toHaveBeenCalledWith(['new data']);
    });

    it('should add data on Enter key press', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[inputs.length - 1];
      expect(dataInput).toBeDefined();

      await user.type(dataInput as HTMLElement, 'new data{Enter}');

      expect(defaultProps.setDataToInclude).toHaveBeenCalledWith(['new data']);
    });

    it('should remove data when x icon is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={['data1', 'data2']} />);

      const removeIcons = screen.getAllByTestId('icon-x');
      const dataRemoveIcon = removeIcons[removeIcons.length - 2];
      expect(dataRemoveIcon).toBeDefined();
      await user.click(dataRemoveIcon as HTMLElement);

      expect(defaultProps.setDataToInclude).toHaveBeenCalledWith(['data2']);
    });

    it('should not add empty data', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[inputs.length - 1];
      expect(dataInput).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[buttons.length - 1];
      expect(addButton).toBeDefined();

      await user.type(dataInput as HTMLElement, '   ');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setDataToInclude).not.toHaveBeenCalled();
    });

    it('should show tooltip for data to include', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const dataTooltip = tooltips.find((t) =>
        t.getAttribute('data-content')?.includes('Additional key-value pairs'),
      );
      expect(dataTooltip).toBeDefined();
    });

    it('should trim whitespace from data items', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[inputs.length - 1];
      expect(dataInput).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[buttons.length - 1];
      expect(addButton).toBeDefined();

      await user.type(dataInput as HTMLElement, '  trimmed data  ');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setDataToInclude).toHaveBeenCalledWith(['trimmed data']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple stop words management', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={['stop1']} />);

      // Add second stop word
      const inputs = screen.getAllByTestId('sl-input');
      const input = inputs[0];
      expect(input).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[0];
      expect(addButton).toBeDefined();

      await user.type(input as HTMLElement, 'stop2');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setStopWords).toHaveBeenCalledWith(['stop1', 'stop2']);
    });

    it('should handle multiple data items management', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={['data1']} />);

      // Add second data item
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[inputs.length - 1];
      expect(dataInput).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[buttons.length - 1];
      expect(addButton).toBeDefined();

      await user.type(dataInput as HTMLElement, 'data2');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setDataToInclude).toHaveBeenCalledWith(['data1', 'data2']);
    });

    it('should handle special characters in stop words', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const input = inputs[0];
      expect(input).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[0];
      expect(addButton).toBeDefined();

      await user.type(input as HTMLElement, '###END###');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setStopWords).toHaveBeenCalledWith(['###END###']);
    });

    it('should handle special characters in data items', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);

      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[inputs.length - 1];
      expect(dataInput).toBeDefined();
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[buttons.length - 1];
      expect(addButton).toBeDefined();

      await user.type(dataInput as HTMLElement, 'key=value&test=123');
      await user.click(addButton as HTMLElement);

      expect(defaultProps.setDataToInclude).toHaveBeenCalledWith(['key=value&test=123']);
    });

    it('should handle very long JSON schema', () => {
      const longSchema = JSON.stringify({ key: 'a'.repeat(1000) });
      render(<AdvancedOptionsPanel {...defaultProps} jsonSchema={longSchema} />);

      const textarea = screen.getByTestId('sl-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(longSchema);
    });
  });

  describe('Icons', () => {
    it('should render all help icons', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const questionIcons = screen.getAllByTestId('icon-question-circle');
      expect(questionIcons.length).toBeGreaterThan(0);
    });

    it('should render plus icons for add buttons', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);

      const plusIcons = screen.getAllByTestId('icon-plus');
      expect(plusIcons.length).toBeGreaterThan(0);
    });

    it('should render x icons for remove buttons', () => {
      render(
        <AdvancedOptionsPanel {...defaultProps} stopWords={['stop1']} dataToInclude={['data1']} />,
      );

      const xIcons = screen.getAllByTestId('icon-x');
      expect(xIcons.length).toBe(2);
    });
  });

  describe('Layout and Styling', () => {
    it('should apply advanced-options-subtle class to details', () => {
      const { container } = render(<AdvancedOptionsPanel {...defaultProps} />);

      const details = container.querySelector('[data-testid="sl-details"]');
      expect(details?.className).toContain('advanced-options-subtle');
    });

    it('should display items in containers when present', () => {
      const { container } = render(
        <AdvancedOptionsPanel {...defaultProps} stopWords={['stop1']} />,
      );

      // Should have a container for stop words
      const text = container.textContent;
      expect(text).toContain('stop1');
    });
  });
});

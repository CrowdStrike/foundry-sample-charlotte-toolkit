import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ContextOption } from '../../types';
import QueryForm from '../QueryForm';

// Type definitions for mock components
interface MockContextEntitySelectorProps {
  selectedContextEntity: string | null;
  setSelectedContextEntity: (value: string | null) => void;
}

interface MockPromptTextareaProps {
  query: string;
  setQuery: (value: string) => void;
}

interface MockSubmitSectionProps {
  quotaAcknowledged: boolean;
  setQuotaAcknowledged: (value: boolean) => void;
  loading: boolean;
  handleSubmit: () => void;
}

interface MockAdvancedOptionsPanelProps {
  temperature: number;
  setTemperature: (value: number) => void;
  stopWords: string[];
  setStopWords: (value: string[]) => void;
}

interface MockSlSelectProps {
  children: React.ReactNode;
  value: string;
  onSlChange?: (event: CustomEvent) => void;
  label: string;
}

interface MockSlOptionProps {
  children: React.ReactNode;
  value: string;
}

interface MockSlIconProps {
  name: string;
  slot?: string;
}

// Mock constants
vi.mock('../../utils/constants', () => ({
  CHARLOTTE_MODEL_OPTIONS: [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5', label: 'GPT-3.5' },
  ],
  TEMPERATURE_OPTIONS: [
    { value: 0, label: 'Precise (0)' },
    { value: 0.5, label: 'Balanced (0.5)' },
  ],
}));

// Mock subcomponents
vi.mock('../form/ContextEntitySelector', () => ({
  default: ({
    selectedContextEntity,
    setSelectedContextEntity,
  }: MockContextEntitySelectorProps) => (
    <div data-testid="context-entity-selector">
      <select
        data-testid="context-select"
        value={selectedContextEntity || ''}
        onChange={(e) => setSelectedContextEntity(e.target.value || null)}
      >
        <option value="">None</option>
        <option value="test-entity">Test Entity</option>
      </select>
    </div>
  ),
}));

vi.mock('../form/PromptTextarea', () => ({
  default: ({ query, setQuery }: MockPromptTextareaProps) => (
    <textarea
      data-testid="prompt-textarea"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Enter prompt"
    />
  ),
}));

vi.mock('../form/SubmitSection', () => ({
  default: ({
    quotaAcknowledged,
    setQuotaAcknowledged,
    loading,
    handleSubmit,
  }: MockSubmitSectionProps) => (
    <div data-testid="submit-section">
      <input
        type="checkbox"
        data-testid="quota-checkbox"
        checked={quotaAcknowledged}
        onChange={(e) => setQuotaAcknowledged(e.target.checked)}
      />
      <button type="button" data-testid="submit-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  ),
}));

vi.mock('../form/AdvancedOptionsPanel', () => ({
  default: ({
    temperature,
    setTemperature,
    stopWords,
    setStopWords,
  }: MockAdvancedOptionsPanelProps) => (
    <div data-testid="advanced-options-panel">
      <input
        type="number"
        data-testid="temperature-input"
        value={temperature}
        onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
      />
      <input
        type="text"
        data-testid="stop-words-input"
        value={stopWords.join(',')}
        onChange={(e) => setStopWords(e.target.value.split(',').filter(Boolean))}
      />
    </div>
  ),
}));

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlSelect: ({ children, value, onSlChange, label }: MockSlSelectProps) => (
    <div data-testid="model-select" data-label={label}>
      <label htmlFor="model-select-input">{label}</label>
      <select
        id="model-select-input"
        value={value}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-change');
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            writable: false,
          });
          onSlChange?.(customEvent as CustomEvent);
        }}
        data-testid="model-select-element"
      >
        {children}
      </select>
    </div>
  ),
  SlOption: ({ children, value }: MockSlOptionProps) => <option value={value}>{children}</option>,
  SlIcon: ({ name, slot }: MockSlIconProps) => (
    <span data-testid={`icon-${name}`} data-slot={slot}>
      {name}
    </span>
  ),
}));

describe('QueryForm', () => {
  const defaultProps = {
    query: '',
    setQuery: vi.fn(),
    modelName: 'gpt-4',
    setModelName: vi.fn(),
    temperature: 0.5,
    setTemperature: vi.fn(),
    stopWords: [] as string[],
    setStopWords: vi.fn(),
    jsonSchema: '',
    setJsonSchema: vi.fn(),
    dataToInclude: [] as string[],
    setDataToInclude: vi.fn(),
    loading: false,
    handleSubmit: vi.fn(),
    selectedContextEntity: null,
    setSelectedContextEntity: vi.fn(),
    availableContextOptions: [] as ContextOption[],
    showJsonTab: false,
    setShowJsonTab: vi.fn(),
    quotaAcknowledged: false,
    setQuotaAcknowledged: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all subcomponents', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByTestId('context-entity-selector')).toBeDefined();
      expect(screen.getByTestId('prompt-textarea')).toBeDefined();
      expect(screen.getByTestId('model-select')).toBeDefined();
      expect(screen.getByTestId('submit-section')).toBeDefined();
      expect(screen.getByTestId('advanced-options-panel')).toBeDefined();
    });

    it('should render model selection with label', () => {
      render(<QueryForm {...defaultProps} />);

      const modelSelect = screen.getByTestId('model-select');
      expect(modelSelect.getAttribute('data-label')).toBe('Model');
    });

    it('should render all model options', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByText('GPT-4')).toBeDefined();
      expect(screen.getByText('GPT-3.5')).toBeDefined();
    });

    it('should render cpu icon for model select', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByTestId('icon-cpu')).toBeDefined();
    });

    it('should display current model value', () => {
      render(<QueryForm {...defaultProps} modelName="gpt-3.5" />);

      const select = screen.getByTestId('model-select-element') as HTMLSelectElement;
      expect(select.value).toBe('gpt-3.5');
    });
  });

  describe('Model Selection', () => {
    it('should call setModelName when model is changed', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const select = screen.getByTestId('model-select-element');
      await user.selectOptions(select, 'gpt-3.5');

      expect(defaultProps.setModelName).toHaveBeenCalledWith('gpt-3.5');
    });

    it('should handle model change with different values', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const select = screen.getByTestId('model-select-element');

      await user.selectOptions(select, 'gpt-4');
      expect(defaultProps.setModelName).toHaveBeenCalledWith('gpt-4');

      await user.selectOptions(select, 'gpt-3.5');
      expect(defaultProps.setModelName).toHaveBeenCalledWith('gpt-3.5');
    });
  });

  describe('Integration with Subcomponents', () => {
    it('should pass query props to PromptTextarea', () => {
      render(<QueryForm {...defaultProps} query="test query" />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('test query');
    });

    it('should pass context props to ContextEntitySelector', () => {
      render(<QueryForm {...defaultProps} selectedContextEntity="test-entity" />);

      const select = screen.getByTestId('context-select') as HTMLSelectElement;
      expect(select.value).toBe('test-entity');
    });

    it('should pass quota acknowledged to SubmitSection', () => {
      render(<QueryForm {...defaultProps} quotaAcknowledged={true} />);

      const checkbox = screen.getByTestId('quota-checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should pass loading state to SubmitSection', () => {
      render(<QueryForm {...defaultProps} loading={true} />);

      const button = screen.getByTestId('submit-button');
      expect(button.textContent).toBe('Loading...');
    });

    it('should pass temperature to AdvancedOptionsPanel', () => {
      render(<QueryForm {...defaultProps} temperature={0.8} />);

      const tempInput = screen.getByTestId('temperature-input') as HTMLInputElement;
      expect(tempInput.value).toBe('0.8');
    });

    it('should pass stopWords to AdvancedOptionsPanel', () => {
      render(<QueryForm {...defaultProps} stopWords={['stop1', 'stop2']} />);

      const stopInput = screen.getByTestId('stop-words-input') as HTMLInputElement;
      expect(stopInput.value).toBe('stop1,stop2');
    });
  });

  describe('State Updates', () => {
    it('should update query through PromptTextarea', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'new query');

      expect(defaultProps.setQuery).toHaveBeenCalled();
    });

    it('should update context entity through selector', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const select = screen.getByTestId('context-select');
      await user.selectOptions(select, 'test-entity');

      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith('test-entity');
    });

    it('should update quota acknowledged through SubmitSection', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const checkbox = screen.getByTestId('quota-checkbox');
      await user.click(checkbox);

      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledWith(true);
    });

    it('should call handleSubmit from SubmitSection', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button');
      await user.click(button);

      expect(defaultProps.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Layout and Styling', () => {
    it('should apply correct layout styles to container', () => {
      const { container } = render(<QueryForm {...defaultProps} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.display).toBe('flex');
      expect(wrapper.style.flexDirection).toBe('column');
      expect(wrapper.style.isolation).toBe('isolate');
    });

    it('should have correct gap spacing', () => {
      const { container } = render(<QueryForm {...defaultProps} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.gap).toBe('var(--spacing-xl)');
    });
  });

  describe('React.memo Behavior', () => {
    it('should have displayName set', () => {
      expect(QueryForm.displayName).toBe('QueryForm');
    });

    it('should render with all props', () => {
      const props = {
        ...defaultProps,
        query: 'test',
        modelName: 'gpt-4',
        temperature: 0.7,
        loading: true,
      };

      render(<QueryForm {...props} />);

      expect(screen.getByTestId('prompt-textarea')).toBeDefined();
      expect(screen.getByTestId('model-select')).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty model name', () => {
      render(<QueryForm {...defaultProps} modelName="" />);

      const select = screen.getByTestId('model-select-element') as HTMLSelectElement;
      expect(select.value).toBe('');
    });

    it('should handle null selectedContextEntity', () => {
      render(<QueryForm {...defaultProps} selectedContextEntity={null} />);

      const select = screen.getByTestId('context-select') as HTMLSelectElement;
      expect(select.value).toBe('');
    });

    it('should handle empty stopWords array', () => {
      render(<QueryForm {...defaultProps} stopWords={[]} />);

      const stopInput = screen.getByTestId('stop-words-input') as HTMLInputElement;
      expect(stopInput.value).toBe('');
    });

    it('should handle various temperature values', () => {
      const { rerender } = render(<QueryForm {...defaultProps} temperature={0} />);
      let tempInput = screen.getByTestId('temperature-input') as HTMLInputElement;
      expect(tempInput.value).toBe('0');

      rerender(<QueryForm {...defaultProps} temperature={1} />);
      tempInput = screen.getByTestId('temperature-input') as HTMLInputElement;
      expect(tempInput.value).toBe('1');

      rerender(<QueryForm {...defaultProps} temperature={0.5} />);
      tempInput = screen.getByTestId('temperature-input') as HTMLInputElement;
      expect(tempInput.value).toBe('0.5');
    });
  });

  describe('Props Forwarding', () => {
    it('should forward all required props to subcomponents', () => {
      const allProps = {
        ...defaultProps,
        query: 'test query',
        modelName: 'gpt-4',
        temperature: 0.7,
        stopWords: ['stop1'],
        jsonSchema: '{}',
        dataToInclude: ['data1'],
        loading: true,
        selectedContextEntity: 'entity1',
        showJsonTab: true,
        quotaAcknowledged: true,
      };

      render(<QueryForm {...allProps} />);

      // Verify each subcomponent receives its props
      expect(screen.getByTestId('context-entity-selector')).toBeDefined();
      expect(screen.getByTestId('prompt-textarea')).toBeDefined();
      expect(screen.getByTestId('model-select')).toBeDefined();
      expect(screen.getByTestId('submit-section')).toBeDefined();
      expect(screen.getByTestId('advanced-options-panel')).toBeDefined();
    });
  });
});

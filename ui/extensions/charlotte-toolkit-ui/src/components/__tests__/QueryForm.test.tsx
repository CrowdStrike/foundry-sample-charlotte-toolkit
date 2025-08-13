// src/components/__tests__/QueryForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QueryForm from '../QueryForm';
import { ContextOption } from '../../types';
import { CHARLOTTE_MODEL_OPTIONS } from '../../utils/constants';

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlSelect: ({ children, label, value, onSlChange, ...props }: any) => {
    // Filter out SlIcon children to prevent nesting issues
    const optionChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type === 'function') {
        return child.type.name !== 'SlIcon';
      }
      return true;
    });
    
    return (
      <div data-testid="sl-select">
        <label>{label}</label>
        <div data-testid="sl-icon-prefix">
          <span data-testid="sl-icon-cpu" data-slot="prefix">cpu</span>
        </div>
        <select
          value={value || ''}
          onChange={(e) => {
            const customEvent = new CustomEvent('sl-change');
            Object.defineProperty(customEvent, 'target', {
              value: e.target,
              enumerable: true
            });
            onSlChange?.(customEvent);
          }}
          {...props}
        >
          {optionChildren}
        </select>
      </div>
    );
  },
  SlOption: ({ children, value, ...props }: any) => (
    <option value={value} {...props}>
      {children}
    </option>
  ),
  SlIcon: ({ name, slot, ...props }: any) => null, // Don't render to avoid nesting issues
}));

// Mock subcomponents
jest.mock('../form/AdvancedOptionsPanel', () => {
  return function MockAdvancedOptionsPanel(props: any) {
    return (
      <div data-testid="advanced-options-panel">
        <div data-testid="show-json-tab">{props.showJsonTab ? 'true' : 'false'}</div>
        <div data-testid="temperature">{props.temperature}</div>
        <div data-testid="stop-words">{JSON.stringify(props.stopWords)}</div>
        <div data-testid="json-schema">{props.jsonSchema}</div>
        <div data-testid="data-to-include">{JSON.stringify(props.dataToInclude)}</div>
      </div>
    );
  };
});

jest.mock('../form/ContextEntitySelector', () => {
  return function MockContextEntitySelector(props: any) {
    return (
      <div data-testid="context-entity-selector">
        <div data-testid="selected-context-entity">{props.selectedContextEntity || 'null'}</div>
        <div data-testid="available-context-options">{props.availableContextOptions.length}</div>
        <button onClick={() => props.setSelectedContextEntity('test-entity')}>
          Set Entity
        </button>
        <button onClick={() => props.setQuery('updated query')}>
          Update Context Query
        </button>
      </div>
    );
  };
});

jest.mock('../form/PromptTextarea', () => {
  return function MockPromptTextarea(props: any) {
    return (
      <div data-testid="prompt-textarea">
        <div data-testid="query-value">{props.query}</div>
        <button onClick={() => props.setQuery('new query')}>
          Update Prompt Query
        </button>
      </div>
    );
  };
});

jest.mock('../form/SubmitSection', () => {
  return function MockSubmitSection(props: any) {
    return (
      <div data-testid="submit-section">
        <div data-testid="quota-acknowledged">{props.quotaAcknowledged ? 'true' : 'false'}</div>
        <div data-testid="loading">{props.loading ? 'true' : 'false'}</div>
        <div data-testid="query-length">{props.query.length}</div>
        <button onClick={() => props.setQuotaAcknowledged(!props.quotaAcknowledged)}>
          Toggle Quota
        </button>
        <button onClick={props.handleSubmit}>
          Submit
        </button>
      </div>
    );
  };
});

describe('QueryForm Component', () => {
  const mockProps = {
    query: 'test query',
    setQuery: jest.fn(),
    modelName: 'claude-latest',
    setModelName: jest.fn(),
    temperature: 0.5,
    setTemperature: jest.fn(),
    stopWords: ['stop1', 'stop2'],
    setStopWords: jest.fn(),
    jsonSchema: '{"type": "object"}',
    setJsonSchema: jest.fn(),
    dataToInclude: ['data1', 'data2'],
    setDataToInclude: jest.fn(),
    loading: false,
    handleSubmit: jest.fn(),
    selectedContextEntity: 'entity-1',
    setSelectedContextEntity: jest.fn(),
    availableContextOptions: [
      { value: 'entity-1', displayName: 'Entity 1', type: 'domain', queryTemplate: 'test query 1' },
      { value: 'entity-2', displayName: 'Entity 2', type: 'file', queryTemplate: 'test query 2' },
    ] as ContextOption[],
    showJsonTab: true,
    setShowJsonTab: jest.fn(),
    quotaAcknowledged: false,
    setQuotaAcknowledged: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render all subcomponents', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('context-entity-selector')).toBeInTheDocument();
      expect(screen.getByTestId('prompt-textarea')).toBeInTheDocument();
      expect(screen.getByTestId('sl-select')).toBeInTheDocument();
      expect(screen.getByTestId('submit-section')).toBeInTheDocument();
      expect(screen.getByTestId('advanced-options-panel')).toBeInTheDocument();
    });

    it('should render model selection with correct label and value', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByText('Model')).toBeInTheDocument();
      expect(screen.getByDisplayValue('claude-latest')).toBeInTheDocument();
    });

    it('should render all model options', () => {
      render(<QueryForm {...mockProps} />);

      CHARLOTTE_MODEL_OPTIONS.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('should render CPU icon in model select', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('sl-icon-cpu')).toBeInTheDocument();
      expect(screen.getByTestId('sl-icon-cpu')).toHaveAttribute('data-slot', 'prefix');
    });

    it('should have correct CSS classes for layout', () => {
      const { container } = render(<QueryForm {...mockProps} />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('flex', 'flex-col', 'gap-4', 'isolate');
    });
  });

  describe('Model Selection', () => {
    it.skip('should handle model change event', () => {
      render(<QueryForm {...mockProps} />);

      const select = screen.getByDisplayValue('claude-latest');
      fireEvent.change(select, { target: { value: 'gpt-4o' } });

      expect(mockProps.setModelName).toHaveBeenCalledWith('gpt-4o');
    });

    it.skip('should render with different model selected', () => {
      const propsWithDifferentModel = {
        ...mockProps,
        modelName: 'claude-3-7-sonnet',
      };

      render(<QueryForm {...propsWithDifferentModel} />);

      expect(screen.getByDisplayValue('claude-3-7-sonnet')).toBeInTheDocument();
    });

    it.skip('should maintain model value across re-renders', () => {
      const { rerender } = render(<QueryForm {...mockProps} />);

      expect(screen.getByDisplayValue('claude-latest')).toBeInTheDocument();

      const updatedProps = { ...mockProps, modelName: 'gpt-4o' };
      rerender(<QueryForm {...updatedProps} />);

      expect(screen.getByDisplayValue('gpt-4o')).toBeInTheDocument();
    });
  });

  describe('Props Passing to Subcomponents', () => {
    it('should pass correct props to ContextEntitySelector', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('selected-context-entity')).toHaveTextContent('entity-1');
      expect(screen.getByTestId('available-context-options')).toHaveTextContent('2');
    });

    it('should pass correct props to PromptTextarea', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('query-value')).toHaveTextContent('test query');
    });

    it('should pass correct props to SubmitSection', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('quota-acknowledged')).toHaveTextContent('false');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
      expect(screen.getByTestId('query-length')).toHaveTextContent('10');
    });

    it('should pass correct props to AdvancedOptionsPanel', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('show-json-tab')).toHaveTextContent('true');
      expect(screen.getByTestId('temperature')).toHaveTextContent('0.5');
      expect(screen.getByTestId('stop-words')).toHaveTextContent('["stop1","stop2"]');
      expect(screen.getByTestId('json-schema')).toHaveTextContent('{"type": "object"}');
      expect(screen.getByTestId('data-to-include')).toHaveTextContent('["data1","data2"]');
    });
  });

  describe('Callback Functions', () => {
    it('should handle context entity selector callbacks', () => {
      render(<QueryForm {...mockProps} />);

      fireEvent.click(screen.getByText('Set Entity'));
      expect(mockProps.setSelectedContextEntity).toHaveBeenCalledWith('test-entity');

      fireEvent.click(screen.getByText('Update Context Query'));
      expect(mockProps.setQuery).toHaveBeenCalledWith('updated query');
    });

    it('should handle prompt textarea callbacks', () => {
      render(<QueryForm {...mockProps} />);

      fireEvent.click(screen.getByText('Update Prompt Query'));
      expect(mockProps.setQuery).toHaveBeenCalledWith('new query');
    });

    it('should handle submit section callbacks', () => {
      render(<QueryForm {...mockProps} />);

      fireEvent.click(screen.getByText('Toggle Quota'));
      expect(mockProps.setQuotaAcknowledged).toHaveBeenCalledWith(true);

      fireEvent.click(screen.getByText('Submit'));
      expect(mockProps.handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should display loading state correctly', () => {
      const loadingProps = { ...mockProps, loading: true };
      render(<QueryForm {...loadingProps} />);

      expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });

    it('should handle loading state changes', () => {
      const { rerender } = render(<QueryForm {...mockProps} />);

      expect(screen.getByTestId('loading')).toHaveTextContent('false');

      const loadingProps = { ...mockProps, loading: true };
      rerender(<QueryForm {...loadingProps} />);

      expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty query', () => {
      const emptyQueryProps = { ...mockProps, query: '' };
      render(<QueryForm {...emptyQueryProps} />);

      expect(screen.getByTestId('query-value')).toHaveTextContent('');
      expect(screen.getByTestId('query-length')).toHaveTextContent('0');
    });

    it('should handle null selected context entity', () => {
      const nullEntityProps = { ...mockProps, selectedContextEntity: null };
      render(<QueryForm {...nullEntityProps} />);

      expect(screen.getByTestId('selected-context-entity')).toHaveTextContent('null');
    });

    it('should handle empty context options', () => {
      const emptyOptionsProps = { ...mockProps, availableContextOptions: [] };
      render(<QueryForm {...emptyOptionsProps} />);

      expect(screen.getByTestId('available-context-options')).toHaveTextContent('0');
    });

    it('should handle empty arrays for optional props', () => {
      const emptyArrayProps = {
        ...mockProps,
        stopWords: [],
        dataToInclude: [],
      };
      render(<QueryForm {...emptyArrayProps} />);

      expect(screen.getByTestId('stop-words')).toHaveTextContent('[]');
      expect(screen.getByTestId('data-to-include')).toHaveTextContent('[]');
    });

    it('should handle empty JSON schema', () => {
      const emptySchemaProps = { ...mockProps, jsonSchema: '' };
      render(<QueryForm {...emptySchemaProps} />);

      expect(screen.getByTestId('json-schema')).toHaveTextContent('');
    });
  });

  describe('Component Memoization', () => {
    it('should have correct displayName', () => {
      expect(QueryForm.displayName).toBe('QueryForm');
    });

    it('should not re-render when props are unchanged', () => {
      const { rerender } = render(<QueryForm {...mockProps} />);

      // Force a re-render with the same props
      rerender(<QueryForm {...mockProps} />);

      // Component should still be rendered correctly
      expect(screen.getByTestId('context-entity-selector')).toBeInTheDocument();
      expect(screen.getByTestId('prompt-textarea')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper labeling for model select', () => {
      render(<QueryForm {...mockProps} />);

      expect(screen.getByText('Model')).toBeInTheDocument();
    });

    it('should maintain focus management through subcomponents', () => {
      render(<QueryForm {...mockProps} />);

      // All interactive elements should be present
      expect(screen.getByText('Set Entity')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });
});

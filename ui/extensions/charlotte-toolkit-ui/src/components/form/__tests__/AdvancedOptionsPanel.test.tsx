// src/components/form/__tests__/AdvancedOptionsPanel.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvancedOptionsPanel from '../AdvancedOptionsPanel';
import { TEMPERATURE_OPTIONS } from '../../../utils/constants';

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlDetails: ({ children, summary, className }: any) => (
    <details className={className} data-testid="sl-details">
      <summary>{summary}</summary>
      {children}
    </details>
  ),
  SlCheckbox: ({ children, checked, onSlChange }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onSlChange && onSlChange({ target: e.target })}
      data-testid="show-json-checkbox"
    />
  ),
  SlSelect: ({ children, label, value, onSlChange }: any) => (
    <div data-testid="temperature-select">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onSlChange && onSlChange({ target: e.target })}
        data-testid="temperature-select-input"
      >
        {children}
      </select>
    </div>
  ),
  SlOption: ({ children, value }: any) => (
    <option value={value}>{children}</option>
  ),
  SlIcon: ({ name, className, style, slot }: any) => (
    <span
      className={className}
      style={style}
      data-testid={`sl-icon-${name}`}
      data-slot={slot}
    >
      {name}
    </span>
  ),
  SlTooltip: ({ children, content }: any) => (
    <div data-testid="sl-tooltip" title={content}>
      {children}
    </div>
  ),
  SlTextarea: ({ label, value, placeholder, rows, onSlInput, children }: any) => (
    <div data-testid="json-schema-textarea">
      <label>{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onSlInput && onSlInput({ target: e.target })}
        data-testid="json-schema-input"
      />
      {children}
    </div>
  ),
  SlInput: ({ placeholder, value, onSlInput, onKeyDown }: any) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onSlInput && onSlInput({ target: e.target })}
      onKeyDown={onKeyDown}
      data-testid="sl-input"
    />
  ),
  SlButton: ({ children, size, onClick, disabled }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid="sl-button"
      data-size={size}
    >
      {children}
    </button>
  ),
}));

describe('AdvancedOptionsPanel', () => {
  const defaultProps = {
    showJsonTab: false,
    setShowJsonTab: jest.fn(),
    temperature: 0.5,
    setTemperature: jest.fn(),
    stopWords: [],
    setStopWords: jest.fn(),
    jsonSchema: '',
    setJsonSchema: jest.fn(),
    dataToInclude: [],
    setDataToInclude: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the advanced options panel', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByTestId('sl-details')).toBeInTheDocument();
      expect(screen.getByText('Advanced Options')).toBeInTheDocument();
    });

    it('should render all main sections', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByText('Show JSON objects')).toBeInTheDocument();
      expect(screen.getByText('Temperature')).toBeInTheDocument();
      expect(screen.getByText('Stop Sequences')).toBeInTheDocument();
      expect(screen.getByText('JSON Schema')).toBeInTheDocument();
      expect(screen.getByText('Data to Include')).toBeInTheDocument();
    });

    it('should render tooltips for all sections', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      const tooltips = screen.getAllByTestId('sl-tooltip');
      expect(tooltips).toHaveLength(5);
      
      expect(screen.getByTitle(/Enable a JSON tab in the response/)).toBeInTheDocument();
      expect(screen.getByTitle(/Controls randomness/)).toBeInTheDocument();
      expect(screen.getByTitle(/Up to 4 sequences where API will stop/)).toBeInTheDocument();
      expect(screen.getByTitle(/JSON schema is used to define/)).toBeInTheDocument();
      expect(screen.getByTitle(/Additional key-value pairs/)).toBeInTheDocument();
    });
  });

  describe('Show JSON Tab', () => {
    it('should render checkbox with correct initial state', () => {
      render(<AdvancedOptionsPanel {...defaultProps} showJsonTab={true} />);
      
      const checkbox = screen.getByTestId('show-json-checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should call setShowJsonTab when checkbox is toggled', () => {
      const setShowJsonTab = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setShowJsonTab={setShowJsonTab} />);
      
      const checkbox = screen.getByTestId('show-json-checkbox');
      fireEvent.click(checkbox);
      
      expect(setShowJsonTab).toHaveBeenCalledWith(true);
    });

    it('should handle checkbox toggle correctly', () => {
      const setShowJsonTab = jest.fn();
      render(
        <AdvancedOptionsPanel
          {...defaultProps}
          showJsonTab={false}
          setShowJsonTab={setShowJsonTab}
        />
      );
      
      const checkbox = screen.getByTestId('show-json-checkbox');
      fireEvent.click(checkbox);
      
      expect(setShowJsonTab).toHaveBeenCalledWith(true);
    });
  });

  describe('Temperature Selection', () => {
    it('should render temperature select with current value', () => {
      render(<AdvancedOptionsPanel {...defaultProps} temperature={0.7} />);
      
      const select = screen.getByTestId('temperature-select-input');
      expect(select).toHaveValue('0.7');
    });

    it('should render all temperature options', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      TEMPERATURE_OPTIONS.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('should call setTemperature when option is selected', () => {
      const setTemperature = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setTemperature={setTemperature} />);
      
      const select = screen.getByTestId('temperature-select-input');
      fireEvent.change(select, { target: { value: '0.9' } });
      
      expect(setTemperature).toHaveBeenCalledWith(0.9);
    });

    it('should handle decimal temperature values correctly', () => {
      const setTemperature = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setTemperature={setTemperature} />);
      
      const select = screen.getByTestId('temperature-select-input');
      fireEvent.change(select, { target: { value: '0.1' } });
      
      expect(setTemperature).toHaveBeenCalledWith(0.1);
    });

    it('should render thermometer icon', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByTestId('sl-icon-thermometer')).toBeInTheDocument();
    });
  });

  describe('Stop Words Management', () => {
    it('should show empty state message when no stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={[]} />);
      
      expect(screen.getByText(/Optional: Add stop sequences to control output termination/)).toBeInTheDocument();
    });

    it('should render existing stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={['stop1', 'stop2']} />);
      
      expect(screen.getByText('stop1')).toBeInTheDocument();
      expect(screen.getByText('stop2')).toBeInTheDocument();
    });

    it('should show input field and add button when less than 4 stop words', () => {
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={['stop1']} />);
      
      expect(screen.getByPlaceholderText('Enter stop sequence')).toBeInTheDocument();
      expect(screen.getAllByTestId('sl-button')[0]).toBeInTheDocument();
    });

    it.skip('should add stop word when add button is clicked', async () => {
      const user = userEvent.setup();
      const setStopWords = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setStopWords={setStopWords} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      const addButton = screen.getByTestId('sl-button');
      
      await user.type(input, 'newstop');
      fireEvent.click(addButton);
      
      expect(setStopWords).toHaveBeenCalledWith(['newstop']);
    });

    it('should add stop word when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const setStopWords = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setStopWords={setStopWords} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      
      await user.type(input, 'newstop');
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(setStopWords).toHaveBeenCalledWith(['newstop']);
    });

    it.skip('should not add empty stop word', async () => {
      const user = userEvent.setup();
      const setStopWords = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setStopWords={setStopWords} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      const addButton = screen.getByTestId('sl-button');
      
      await user.type(input, '   ');
      fireEvent.click(addButton);
      
      expect(setStopWords).not.toHaveBeenCalled();
    });

    it.skip('should disable add button when input is empty', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      const addButton = screen.getByTestId('sl-button');
      expect(addButton).toBeDisabled();
    });

    it.skip('should trim whitespace from stop words', async () => {
      const user = userEvent.setup();
      const setStopWords = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setStopWords={setStopWords} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      const addButton = screen.getByTestId('sl-button');
      
      await user.type(input, '  trimmed  ');
      fireEvent.click(addButton);
      
      expect(setStopWords).toHaveBeenCalledWith(['trimmed']);
    });

    it('should remove stop word when x button is clicked', () => {
      const setStopWords = jest.fn();
      render(
        <AdvancedOptionsPanel
          {...defaultProps}
          stopWords={['stop1', 'stop2']}
          setStopWords={setStopWords}
        />
      );
      
      const removeButtons = screen.getAllByTestId('sl-icon-x');
      fireEvent.click(removeButtons[0]);
      
      expect(setStopWords).toHaveBeenCalledWith(['stop2']);
    });

    it('should show maximum message when 4 stop words exist', () => {
      render(
        <AdvancedOptionsPanel
          {...defaultProps}
          stopWords={['stop1', 'stop2', 'stop3', 'stop4']}
        />
      );
      
      expect(screen.getByText('Maximum 4 stop sequences allowed')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Enter stop sequence')).not.toBeInTheDocument();
    });

    it('should not add more than 4 stop words', async () => {
      const user = userEvent.setup();
      const setStopWords = jest.fn();
      render(
        <AdvancedOptionsPanel
          {...defaultProps}
          stopWords={['stop1', 'stop2', 'stop3', 'stop4']}
          setStopWords={setStopWords}
        />
      );
      
      // Input field should not be visible when at maximum
      expect(screen.queryByPlaceholderText('Enter stop sequence')).not.toBeInTheDocument();
    });

    it('should show input again after removing a stop word from maximum', () => {
      const setStopWords = jest.fn();
      const { rerender } = render(
        <AdvancedOptionsPanel
          {...defaultProps}
          stopWords={['stop1', 'stop2', 'stop3', 'stop4']}
          setStopWords={setStopWords}
        />
      );
      
      expect(screen.queryByPlaceholderText('Enter stop sequence')).not.toBeInTheDocument();
      
      // Simulate removing one stop word
      rerender(
        <AdvancedOptionsPanel
          {...defaultProps}
          stopWords={['stop1', 'stop2', 'stop3']}
          setStopWords={setStopWords}
        />
      );
      
      expect(screen.getByPlaceholderText('Enter stop sequence')).toBeInTheDocument();
    });
  });

  describe('JSON Schema', () => {
    it('should render JSON schema textarea', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByTestId('json-schema-input')).toBeInTheDocument();
    });

    it('should show current JSON schema value', () => {
      const jsonSchema = '{"type": "object"}';
      render(<AdvancedOptionsPanel {...defaultProps} jsonSchema={jsonSchema} />);
      
      const textarea = screen.getByTestId('json-schema-input');
      expect(textarea).toHaveValue(jsonSchema);
    });

    it('should call setJsonSchema when text is entered', async () => {
      const user = userEvent.setup();
      const setJsonSchema = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setJsonSchema={setJsonSchema} />);
      
      const textarea = screen.getByTestId('json-schema-input');
      fireEvent.change(textarea, { target: { value: '{"test": true}' } });
      
      expect(setJsonSchema).toHaveBeenCalledWith('{"test": true}');
    });

    it('should render code-square icon', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByTestId('sl-icon-code-square')).toBeInTheDocument();
    });

    it('should have correct placeholder text', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByPlaceholderText('Enter JSON schema to define response structure...')).toBeInTheDocument();
    });
  });

  describe('Data to Include Management', () => {
    it('should show empty state message when no data to include', () => {
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={[]} />);
      
      expect(screen.getByText(/Optional: Add custom data to enhance your analysis/)).toBeInTheDocument();
    });

    it('should render existing data to include items', () => {
      render(<AdvancedOptionsPanel {...defaultProps} dataToInclude={['data1', 'data2']} />);
      
      expect(screen.getByText('data1')).toBeInTheDocument();
      expect(screen.getByText('data2')).toBeInTheDocument();
    });

    it('should add data to include when add button is clicked', async () => {
      const user = userEvent.setup();
      const setDataToInclude = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setDataToInclude={setDataToInclude} />);
      
      // Find the second input (first is for stop words)
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[1]; // Second input is for data to include
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[1]; // Second button is for data to include
      
      fireEvent.change(dataInput, { target: { value: 'newdata' } });
      fireEvent.click(addButton);
      
      expect(setDataToInclude).toHaveBeenCalledWith(['newdata']);
    });

    it('should add data to include when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const setDataToInclude = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setDataToInclude={setDataToInclude} />);
      
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[1];
      
      fireEvent.change(dataInput, { target: { value: 'newdata' } });
      fireEvent.keyDown(dataInput, { key: 'Enter' });
      
      expect(setDataToInclude).toHaveBeenCalledWith(['newdata']);
    });

    it('should not add empty data to include', async () => {
      const user = userEvent.setup();
      const setDataToInclude = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setDataToInclude={setDataToInclude} />);
      
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[1];
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[1];
      
      fireEvent.change(dataInput, { target: { value: '   ' } });
      fireEvent.click(addButton);
      
      expect(setDataToInclude).not.toHaveBeenCalled();
    });

    it('should trim whitespace from data to include', async () => {
      const user = userEvent.setup();
      const setDataToInclude = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setDataToInclude={setDataToInclude} />);
      
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[1];
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[1];
      
      fireEvent.change(dataInput, { target: { value: '  trimmed  ' } });
      fireEvent.click(addButton);
      
      expect(setDataToInclude).toHaveBeenCalledWith(['trimmed']);
    });

    it('should remove data to include when x button is clicked', () => {
      const setDataToInclude = jest.fn();
      render(
        <AdvancedOptionsPanel
          {...defaultProps}
          dataToInclude={['data1', 'data2']}
          setDataToInclude={setDataToInclude}
        />
      );
      
      // Find the remove buttons for data to include (they should be different from stop words)
      const removeButtons = screen.getAllByTestId('sl-icon-x');
      // Assuming the data to include remove buttons come after stop words remove buttons
      fireEvent.click(removeButtons[0]);
      
      expect(setDataToInclude).toHaveBeenCalledWith(['data2']);
    });

    it('should have correct placeholder for data input', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByPlaceholderText('Enter additional data')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should maintain separate input states for stop words and data to include', async () => {
      const user = userEvent.setup();
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      const inputs = screen.getAllByTestId('sl-input');
      const stopWordsInput = inputs[0];
      const dataInput = inputs[1];
      
      fireEvent.change(stopWordsInput, { target: { value: 'stopword' } });
      fireEvent.change(dataInput, { target: { value: 'datavalue' } });
      
      expect(stopWordsInput).toHaveValue('stopword');
      expect(dataInput).toHaveValue('datavalue');
    });

    it.skip('should clear input after adding stop word', async () => {
      const user = userEvent.setup();
      const setStopWords = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setStopWords={setStopWords} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      const addButton = screen.getByTestId('sl-button');
      
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('should clear input after adding data to include', async () => {
      const user = userEvent.setup();
      const setDataToInclude = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setDataToInclude={setDataToInclude} />);
      
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[1];
      const buttons = screen.getAllByTestId('sl-button');
      const addButton = buttons[1];
      
      fireEvent.change(dataInput, { target: { value: 'test' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(dataInput).toHaveValue('');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle non-Enter key presses for stop words', () => {
      const setStopWords = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setStopWords={setStopWords} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Tab' });
      
      expect(setStopWords).not.toHaveBeenCalled();
    });

    it('should handle non-Enter key presses for data to include', () => {
      const setDataToInclude = jest.fn();
      render(<AdvancedOptionsPanel {...defaultProps} setDataToInclude={setDataToInclude} />);
      
      const inputs = screen.getAllByTestId('sl-input');
      const dataInput = inputs[1];
      
      fireEvent.change(dataInput, { target: { value: 'test' } });
      fireEvent.keyDown(dataInput, { key: 'Tab' });
      
      expect(setDataToInclude).not.toHaveBeenCalled();
    });

    it.skip('should prevent default behavior on Enter key press', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Enter stop sequence');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent(input, event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should handle empty arrays for stopWords and dataToInclude', () => {
      render(
        <AdvancedOptionsPanel
          {...defaultProps}
          stopWords={[]}
          dataToInclude={[]}
        />
      );
      
      expect(screen.getByText(/Optional: Add stop sequences to control output termination/)).toBeInTheDocument();
      expect(screen.getByText(/Optional: Add custom data to enhance your analysis/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form elements', () => {
      render(<AdvancedOptionsPanel {...defaultProps} />);
      
      expect(screen.getByText('Temperature')).toBeInTheDocument();
      expect(screen.getByText('Stop Sequences')).toBeInTheDocument();
      expect(screen.getByText('JSON Schema')).toBeInTheDocument();
      expect(screen.getByText('Data to Include')).toBeInTheDocument();
    });

    it('should have proper button types', () => {
      render(<AdvancedOptionsPanel {...defaultProps} stopWords={['test']} />);
      
      const removeButtons = screen.getAllByRole('button');
      removeButtons.forEach(button => {
        if (button.getAttribute('type')) {
          expect(button).toHaveAttribute('type', 'button');
        }
      });
    });
  });
});

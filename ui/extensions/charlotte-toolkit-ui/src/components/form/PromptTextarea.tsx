// Auto-resizing prompt textarea component

import { SlIcon, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

interface PromptTextareaProps {
  query: string;
  setQuery: (query: string) => void;
}

const PromptTextarea: React.FC<PromptTextareaProps> = ({ query, setQuery }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textareaRef = useRef<any>(null);

  // Set initial textarea dimensions on mount with delayed calculation and no transitions
  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;

      // Disable transitions temporarily to prevent visible resize
      element.style.transition = 'none';

      // Delay calculation to ensure component is fully rendered
      setTimeout(() => {
        element.style.height = 'auto';
        const calculatedHeight = Math.max(element.scrollHeight, 96);
        element.style.height = `${calculatedHeight}px`;

        // Re-enable transitions after calculation
        setTimeout(() => {
          element.style.transition = 'height 0.15s ease-out';
        }, 50);
      }, 50);
    }
  }, []);

  // Handle immediate resize during input to prevent scrollbar flicker
  const handleTextareaInput = (e: CustomEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const newValue = target.value;

    // Resize immediately before state update to prevent scrollbar flicker
    if (textareaRef.current) {
      const element = textareaRef.current;
      const currentHeight = element.offsetHeight;

      // Calculate required height for new content
      const newHeight = Math.min(element.scrollHeight, 300);

      // Only resize if there's a meaningful difference
      if (Math.abs(newHeight - currentHeight) > 2) {
        element.style.height = `${newHeight}px`;
      }
    }

    // Update React state after resize
    setQuery(newValue);
  };

  return (
    <div className="relative min-h-[120px] z-10">
      <SlTextarea
        ref={textareaRef}
        label="Prompt"
        value={query}
        rows={5}
        resize="none"
        placeholder="Enter your security analysis question..."
        onSlInput={handleTextareaInput}
      >
        <SlIcon slot="prefix" name="chat-quote" />
      </SlTextarea>
    </div>
  );
};

export default PromptTextarea;

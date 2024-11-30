interface MathFieldElement extends HTMLElement {
  value: string;
  smartFence: boolean;
  executeCommand: (command: string) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': Omit<React.HTMLAttributes<HTMLElement>, 'onInput'> & {
        ref?: React.RefObject<MathFieldElement>;
        onInput?: (e: { target: MathFieldElement }) => void;
      };
    }
  }
}

export {};


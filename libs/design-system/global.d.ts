declare namespace JSX {
    interface IntrinsicElements {
      'bytebank-button': React.HTMLAttributes<HTMLElement> & {
        name?: string;
      };
    }
  }
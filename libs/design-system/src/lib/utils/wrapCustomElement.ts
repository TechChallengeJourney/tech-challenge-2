import React, { useRef, useEffect, ReactNode, HTMLAttributes } from 'react';

/**
 * Utilitário para criar um componente React a partir de um Custom Element.
 * @param tagName Nome da tag do Custom Element (ex: 'bytebank-button')
 */
export function wrapCustomElement<T extends Record<string, any> = any>(
  tagName: string
): React.FC<T & HTMLAttributes<HTMLElement> & { children?: ReactNode }> {
  return (props: T & HTMLAttributes<HTMLElement> & { children?: ReactNode }) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      if (ref.current) {
        Object.entries(props as Record<string, any>).forEach(([key, value]) => {
          if (key !== 'children' && key !== 'className' && key !== 'style') {
            // @ts-ignore
            ref.current[key] = value;
          }
        });
      }
    }, [props]);

    const { children, className, style, ...rest } = props;
    return React.createElement(
      tagName,
      { ref, className, style, ...rest },
      children
    );
  };
}
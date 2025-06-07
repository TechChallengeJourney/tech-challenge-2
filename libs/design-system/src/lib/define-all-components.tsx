// Import your web component classes
import { MyButtonElement } from './components/button/web-component';

export function registerAllWebComponents() {
  if (typeof window === 'undefined') return; // Exit if server-side

  // A list of all your custom elements
  const components = [
    { elementName: 'my-button', class: MyButtonElement },
  ];

  components.forEach(({ elementName, class: ElementClass }) => {
    if (!customElements.get(elementName)) {
      customElements.define(elementName, ElementClass);
    }
  });
}
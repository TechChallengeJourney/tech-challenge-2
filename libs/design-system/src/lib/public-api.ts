import { BytebankButtonElement } from './components';
import { wrapCustomElement } from './utils/wrapCustomElement';

// Lista de declarações dos custom elements
const declarations = [BytebankButtonElement];


// List of your custom element tag names
const customElementTags = ['bytebank-button' /*, add more tags here */];

// Dynamically create an array of React components
export const reactComponents = customElementTags.map(tag => ({
  tag,
  component: wrapCustomElement(tag),
}));

// Optionally, export as an object for named imports
export const reactComponentMap = Object.fromEntries(
  reactComponents.map(({ tag, component }) => [
    // Convert tag to PascalCase for the key, e.g., 'bytebank-button' -> 'BytebankButton'
    tag
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(''),
    component,
  ])
);

export const BytebankButton = reactComponentMap['BytebankButton'];

export const registerElements = () => declarations;

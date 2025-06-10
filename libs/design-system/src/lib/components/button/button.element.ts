import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bytebank-button')
export class BytebankButton extends LitElement {
  private _name: string = '';

  @property()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    const oldValue = this._name;
    this._name = value;
    this.requestUpdate('name', oldValue);
  }

  override createRenderRoot() {
    return this; // isso faz o componente usar o DOM padrão, não Shadow DOM
  }

  override render() {
    return html`<button
      type="button"
      class="text-black bg-yellow-700 hover:bg-black-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-red-800"
    >
      ${this.name}
    </button>`;
  }
}
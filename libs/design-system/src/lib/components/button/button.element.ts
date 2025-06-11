import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
 // importa o componente de button

@customElement('bytebank-button')
export class BytebankButtonElement extends LitElement {
//   static override styles = css`button {
//       background-color: var(--color-primary);
//       color: red;
//       padding: var(--spacing-medium);
//       font-size: var(--font-size-medium);
//       border-radius: var(--border-radius);
//       border: none;
//       cursor: pointer;
//       transition: background-color 0.3s;
//     }
//     button:hover {
//       background-color: var(--color-secondary);
//     }
//   `;
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

  handleClick() {
    const evento = new CustomEvent('submit', {
      detail: { mensagem: 'Botão clicado' },
      bubbles: true,       // permite que o evento "suba" na árvore DOM
      composed: true,      // permite atravessar shadow DOM
    });
    this.dispatchEvent(evento);
  }

  override render() {
    return html`<md-outlined-button type="reset" @click="${this.handleClick}"><slot></slot></md-outlined-button>`;
  }
}

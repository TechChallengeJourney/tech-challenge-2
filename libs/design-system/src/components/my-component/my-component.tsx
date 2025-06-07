import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';
import { Button } from '@mui/material';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {

    customElements.get('mwc-rr');
    return (
      <div class="container">
      <h1 class="title">Material UI in Stencil!</h1>
      <mwc-button label="Click Me">Ola</mwc-button>
      {/* <Button variant='contained' color='primary'>Teste</Button> */}
      <p class="text">{this.getText()}</p>
    </div>
  );
  }
}

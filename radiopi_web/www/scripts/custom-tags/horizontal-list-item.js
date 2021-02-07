import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class HorizontalListItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline;
      }

      ::slotted(*) {
        display: inline-block;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("horizontal-list-item", HorizontalListItem);

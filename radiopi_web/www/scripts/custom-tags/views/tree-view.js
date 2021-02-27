import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class TreeView extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        margin: 32px 0;
        padding: 0 32px;
        display: block;
      }

      h2 {
        margin: 10px 0 32px;
        font-family: var(--font-family-secondary);
        font-weight: var(--font-weight-bolder);
        font-size: 30px;
        text-transform: uppercase;
      }
    `;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <slot></slot>
    `;
  }
}

customElements.define("tree-view", TreeView);

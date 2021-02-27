import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class HeadingPrimary extends LitElement {
  static get styles() {
    return css`
      h3 {
        margin: 10px 0;
        padding: 0 var(--spacing-large);
        font-size: var(--font-size-3);
        text-transform: uppercase;
      }
    `;
  }

  render() {
    return html` <h3><slot></slot></h3> `;
  }
}

customElements.define("heading-primary", HeadingPrimary);

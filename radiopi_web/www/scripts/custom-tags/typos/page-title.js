import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class PageTitle extends LitElement {
  static get styles() {
    return css`
      h2 {
        font-size: var(--font-size-2);
        margin: var(--spacing-large) 0;
        text-transform: uppercase;
      }
    `;
  }

  render() {
    return html` <h2><slot></slot></h2> `;
  }
}

customElements.define("page-title", PageTitle);

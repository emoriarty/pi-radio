import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class PageTitle extends LitElement {
  static get styles() {
    return css`
      h2 {
        font-family: var(--font-family-secondary);
        font-size: 32px;
        font-weight: var(--font-weight-bolder);
        margin: 10px 0 32px;
        padding: 0 32px;
        text-transform: uppercase;
      }
    `;
  }

  render() {
    return html` <h2><slot></slot></h2> `;
  }
}

customElements.define("page-title", PageTitle);

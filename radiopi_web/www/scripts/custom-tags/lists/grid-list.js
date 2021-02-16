import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class GridlList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
    `;
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define("grid-list", GridlList);

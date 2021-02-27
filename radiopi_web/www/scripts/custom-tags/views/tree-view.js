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
        margin: var(--spacing-large) 0;
        padding: 0 var(--spacing-large);
        display: block;
      }
    `;
  }

  render() {
    return html`
      <page-title>${this.title}</page-title>
      <slot></slot>
    `;
  }
}

customElements.define("tree-view", TreeView);

import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class RadioTagView extends LitElement {
  static get properties() {
    return {
      tag: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        padding: 0 var(--spacing-large);
        display: block;
      }
    `;
  }

  // createRenderRoot() {
  //   return this;
  // }

  render() {
    return html` <page-title>Radio Tags &gt; ${this.tag}</page-title> `;
  }
}

customElements.define("radio-tag-view", RadioTagView);

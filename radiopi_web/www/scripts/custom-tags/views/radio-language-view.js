import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class RadioLanguageView extends LitElement {
  static get properties() {
    return {
      language: { type: String },
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
    return html` <page-title>Radio Countries &gt; ${this.language}</page-title> `;
  }
}

customElements.define("radio-language-view", RadioLanguageView);

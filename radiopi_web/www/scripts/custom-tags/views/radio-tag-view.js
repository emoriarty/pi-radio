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
        padding: 0 32px;
        display: block;
      }

      h2 {
        margin: 10px 0;
        font-family: var(--font-family-secondary);
        font-weight: var(--font-weight-bolder);
        font-size: 30px;
        text-transform: uppercase;
      }
    `;
  }

  // createRenderRoot() {
  //   return this;
  // }

  render() {
    return html` <h2>Radio Tags &gt; ${this.tag}</h2> `;
  }
}

customElements.define("radio-tag-view", RadioTagView);
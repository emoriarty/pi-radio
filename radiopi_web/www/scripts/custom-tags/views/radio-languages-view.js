import { LitElement, html } from "https://jspm.dev/lit-element@2";

export class RadioLanguagesView extends LitElement {
  render() {
    return html`
        <h2>Radio Languages</h2>
    `;
  }
}

customElements.define("radio-languages-view", RadioLanguagesView);

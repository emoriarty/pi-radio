import { LitElement, html } from "https://jspm.dev/lit-element@2";

export class StopIcon extends LitElement {
  render() {
    return html`
      <svg width="100%" height="100%" viewBox="0 0 48 48">
        <path fill="#1c203c" d="M24 48a24 24 0 100-48 24 24 0 000 48z"></path>
        <rect fill="#FFF" x="17" y="17" width="14" height="14" rx="1"></rect>
      </svg>
    `;
  }
}

customElements.define("stop-icon", StopIcon);

import { LitElement, html } from "https://jspm.dev/lit-element@2";

export class PlayIcon extends LitElement {
  render() {
    return html`
      <svg width="100%" height="100%" viewBox="0 0 45 45">
        <path
          fill="#1c203c"
          d="M22.5 45a22.5 22.5 0 100-45 22.5 22.5 0 000 45z"
        ></path>
        <path
          d="M17.5 31.6c0 .3.2.7.5.8.3.2.7.1 1 0l11.5-9.2a.9.9 0 000-1.4L19 12.7a1 1 0 00-1-.1 1 1 0 00-.5.8v18.2z"
          fill="#FFF"
        ></path>
      </svg>
    `;
  }
}

customElements.define("play-icon", PlayIcon);

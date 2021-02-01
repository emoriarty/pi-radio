import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

class Hello extends LitElement {
  static get styles() {
    return css`
      .greeting {
        color: red;
      }
    `;
  }

  render() {
    return html`<h1 class="greeting">Hello New World!</h1>`;
  }
}

customElements.define("hello-world", Hello);

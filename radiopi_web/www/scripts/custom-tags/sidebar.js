import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class RadioSidebar extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: var(--background-color);
        color: #ffcfb8;
        font-weight: var(--nav-font-weight);
        font-family: var(--nav-font-family);
        position: fixed !important;
        height: 100%;
        overflow: auto;
        position: fixed !important;
        z-index: 1;
      }

      h1 {
        font-family: var(--heading-font-family);
        font-style: italic;
        font-weight: var(--heading-font-weight);
        margin: 10px 0;
        padding: 0 32px;
      }

      nav {
        overflow: auto;
      }

      .item {
        border: none;
        padding: 8px 16px 8px 32px;
        overflow: hidden;
        text-decoration: none;
        color: var(--text-color);
        cursor: pointer;
        display: block;
        text-align: left;
        white-space: normal;
        float: none;
        outline: 0;
        font-size: 18px;
      }

      .item:hover {
        color: var(--highlight-color) !important;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  // createRenderRoot() {
  //   return this;
  // }

  render() {
    return html`
      <h1>RadioPi</h1>
      <nav class="w3-sidebar w3-bar-block">
        <a href="#" class="item w3-bar-item w3-button">Link 1</a>
        <a href="#" class="item w3-bar-item w3-button">Link 2</a>
        <a href="#" class="item w3-bar-item w3-button">Link 3</a>
        <a href="#" class="item w3-bar-item w3-button">Link 4</a>
        <a href="#" class="item w3-bar-item w3-button">Link 5</a>
      </nav>
    `;
  }
}

customElements.define("nav-sidebar", RadioSidebar);

import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class RadioSidebar extends LitElement {
  static get styles() {
    return css`
      :host {
        display: none;
        background-color: var(--color-primary);
        color: #ffcfb8;
        font-weight: var(--font-weight-bold);
        font-family: var(--font-family-secondary);
        position: fixed !important;
        height: 100%;
        overflow: auto;
        position: fixed !important;
        z-index: 1;
      }

      h1 {
        font-family: var(--heading-font-family);
        font-style: italic;
        font-weight: var(--font-weight-bolder);
        margin: 10px 0;
        padding: 0 32px;
        display: none;
      }

      nav {
        overflow: auto;
      }

      .item {
        border: none;
        padding: 8px 16px 8px 32px;
        overflow: hidden;
        text-decoration: none;
        color: var(--color-ternary);
        cursor: pointer;
        display: block;
        text-align: left;
        white-space: normal;
        float: none;
        outline: 0;
        font-size: 18px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: inherit;
        font-family: var(--font-family-secondary);
      }

      .item:hover {
        color: var(--color-secondary) !important;
      }

      .close {
        display: block;
      }

      .close b {
        float: right;
      }

      @media only screen and (min-width: 768px) {
        :host,
        h1 {
          display: block;
        }

        .close {
          display: none;
        }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let event = new CustomEvent("station-nav", {
      detail: {
        view: ev.target.id,
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  handleClose(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let event = new CustomEvent("click-close", {
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <h1>RadioPi</h1>
      <nav class="w3-sidebar w3-bar-block">
        <a href="#" @click="${this.handleClose}" class="close item"
          >Close <b>&times;</b></a
        >
        <a href="#" id="home" class="item" @click=${this.handleClick}>Home</a>
        <hr />
        <a
          href="#"
          id="radio-tags"
          class="item w3-bar-item w3-button"
          @click=${this.handleClick}
          >Tags</a
        >
        <a
          href="#"
          id="radio-countries"
          class="item w3-bar-item w3-button"
          @click=${this.handleClick}
          >Countries</a
        >
        <a
          href="#"
          id="radio-languages"
          class="item w3-bar-item w3-button"
          @click=${this.handleClick}
          >Languages</a
        >
      </nav>
    `;
  }
}

customElements.define("nav-sidebar", RadioSidebar);

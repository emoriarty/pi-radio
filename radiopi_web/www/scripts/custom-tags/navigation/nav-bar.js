import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class NavBar extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: var(--color-primary);
        color: #ffcfb8;
      }

      .bar {
        background-color: inherit;
        overflow: hidden;
        position: fixed;
        width: 100%;
        z-index: 1;
      }

      .bar:before,
      .bar:after {
        content: "";
        display: table;
        clear: both;
      }

      .bar-item {
        vertical-align: middle;
        overflow: hidden;
        text-decoration: none;
        color: var(--color-ternary);
        background-color: inherit;
        text-align: center;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 8px 16px;
        float: left;
        width: auto;
        border: none;
        display: block;
        outline: 0;
        white-space: normal;
        font-size: var(--font-size-3);
        line-height: 2.125rem;
      }

      .bar-item:hover {
        color: var(--color-secondary) !important;
      }

      .home {
        font-weight: var(--font-weight-bolder);
      }

      @media only screen and (min-width: 768px) {
        :host {
          display: none;
        }
      }
    `;
  }

  handleClickMenu(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let event = new CustomEvent("click-menu", {
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="bar">
        <button class="bar-item" @click="${this.handleClickMenu}">☰</button>
        <a href="#" class="home bar-item"><i>RadioPi</i></a>
      </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);

import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class StationsGridlList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0 auto;
      }

      grid-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
      }

      ::slotted(station-card) {
        flex: 0 0 36%;
        margin: 12px;
      }

      @media only screen and (min-width: 768px) {
        ::slotted(station-card) {
          flex: 0 0 18%;
          margin: 12px;
        }
      }
    `;
  }

  render() {
    return html`
      <grid-list>
        <slot></slot>
      </grid-list>
    `;
  }
}

customElements.define("stations-grid-list", StationsGridlList);

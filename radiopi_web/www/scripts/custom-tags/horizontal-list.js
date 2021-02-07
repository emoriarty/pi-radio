import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class HorizontalList extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 200px;
        overflow-x: scroll;
        overflow-y: hidden;
        display: block;
        width: 100%;
      }

      .list {
        white-space: nowrap;
      }

      ::slotted(*) {
        display: inline-block;
      }
    `;
  }

  render() {
    return html`
      <div class="list">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("horizontal-list", HorizontalList);

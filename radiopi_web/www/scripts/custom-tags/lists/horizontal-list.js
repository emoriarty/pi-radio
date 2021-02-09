import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class HorizontalList extends LitElement {
  static get styles() {
    return css`
      :host {
        overflow-x: scroll;
        overflow-y: hidden;
        display: block;
        width: 100%;
      }

      .list {
        white-space: nowrap;
      }

      ::slotted(*) {
        display: inline-table;
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

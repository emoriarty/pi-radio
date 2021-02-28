import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class PlayerBar extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: ghostwhite;
        display: flex;
        overflow: hidden;
        position: fixed;
        width: 100%;
        z-index: 1;
        bottom: 0;
        border-top: 1px solid gray;
      }

      .bar-left {
        align-items: center;
        display: flex;
        flex: 6;
      }

      .bar-right {
        flex: 1;
        padding: var(--spacing-small);
      }

      .artwork {
        padding: var(--spacing-small);
      }

      .artwork img {
        border: solid 0.5px rgba(186, 186, 186, 0.25);
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
        width: 40px;
      }

      .titles {
        flex: 1 0 auto;
      }

      play-icon {
        position: absolute;
        right: var(--spacing-small);
        width: 40px;
      }

      @media only screen and (min-width: 768px) {
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
      <div class="bar-left">
        <div class="artwork">
          <img
            src="https://cdn-profiles.tunein.com/p338733/images/logoq.png?t=160130"
          />
        </div>
        <div class="titles">NRJ Extravadance</div>
      </div>
      <div class="bar-right">
        <play-icon></play-icon>
      </div>
    `;
  }
}

customElements.define("player-bar", PlayerBar);

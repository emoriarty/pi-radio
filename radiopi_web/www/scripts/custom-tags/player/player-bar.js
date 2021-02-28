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
        border-top: 1px solid lightgray;
        box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
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

      .playback-time {
        display: none;
        position: relative;
        background-color: lightgray;
        width: 80%;
        margin: 0 auto;
      }

      .playback-cursor {
        height: 8px;
        width: 8px;
        position: absolute;
        border-radius: 50%;
        top: -3px;
        background-color: var(--color-primary);
      }

      .playback-progress {
        background-color: var(--color-primary);
      }

      @media only screen and (min-width: 768px) {
        .bar-left {
          flex: 1;
        }

        .bar-right {
          flex: 3;
          display: flex;
          flex-direction: column;
          padding: var(--spacing-medium) var(--spacing-large);
        }

        .artwork {
          padding: var(--spacing-medium);
        }

        .artwork img {
          width: 67px;
        }

        play-icon {
          right: auto;
          width: 48px;
        }

        .playback-time {
          display: block;
        }

        .playback-controls {
          height: 48px;
          margin: 0 0 var(--spacing-medium) 0;
          text-align: center;
        }
      }

      @media only screen and (min-width: 1200px) {
        .bar-left {
          flex: 0 0 20%;
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
        <div class="playback-controls">
          <play-icon></play-icon>
        </div>
        <div class="playback-time">
          <div class="playback-progress" style="height:2px;width:0%"></div>
          <div class="playback-cursor"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("player-bar", PlayerBar);

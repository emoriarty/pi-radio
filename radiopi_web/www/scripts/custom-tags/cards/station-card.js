import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class StationCard extends LitElement {
  static get properties() {
    return {
      img: { type: String },
      title: { type: String },
      src: { type: String },
      playing: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .body {
        padding: 0.5rem;
        white-space: normal;
      }

      h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-weight: var(--heading-font-weight);
        font-family: var(--heading-font-family);
      }

      header {
        position: relative;
      }

      .playing .overlay img {
        opacity: 0.7;
      }

      .overlay img {
        transition: opacity 0.2s;
      }

      .overlay:hover img {
        background-color: #fff;
        opacity: 0.5;
        z-index: 2;
      }

      .overlay:hover .play,
      .overlay:hover .stop {
        cursor: pointer;
        opacity: 1;
      }

      .play {
        opacity: 0;
      }

      .play,
      .stop {
        bottom: 5%;
        position: absolute;
        right: 5%;
        transition: opacity 0.2s;
        height: 28.5%;
        width: 28.5%;
        z-index: 10;
      }

      .img {
        width: 100%;
        padding-top: 100%;
        position: relative;
        overflow: hidden;
      }

      .img img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.playing = false;
  }

  handlePlay(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("play");
    let event = new CustomEvent("play-station", {
      detail: {
        id: this.id,
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  handleStop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("stop");
    let event = new CustomEvent("stop-station", {
      detail: {
        id: this.id,
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="card overlay-wrapper ${this.playing ? "playing" : ""}">
        <header class="overlay">
          <div class="img">
            <img
              src="${this.img ||
              "https://play-lh.googleusercontent.com/aK5fbCH6BSJJCh--y6ZGnQ8uRFmb8B0Z8QxaLGERjOljHJ0S-bTw0k9SQ2eHy9jSzPA"}"
            />
          </div>
          ${this.playing
            ? html`
                <stop-icon
                  class="stop"
                  role="button"
                  @click="${this.handleStop}"
                />
              `
            : html`
                <play-icon
                  class="play"
                  role="button"
                  @click="${this.handlePlay}"
                />
              `}
        </header>

        <div class="body">
          <h4>${this.title}</h4>
        </div>
      </div>
    `;
  }
}

customElements.define("station-card", StationCard);

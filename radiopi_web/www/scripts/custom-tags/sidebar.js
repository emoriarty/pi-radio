import { LitElement, html, css } from "https://jspm.dev/lit-element@2";
import RadioBrowser from "https://jspm.dev/radio-browser"

export class RadioSidebar extends LitElement {
  static get styles() {
    return css`
      .greeting {
        color: red;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback()
    console.log('hola')
    fetch('https://ip2c.org/self').then(res => {
      res.text().then(data => {
        console.log(data);
        const country = data.split(';').pop()
        const filter = {
            by: 'country',
            searchterm: country.toLocaleLowerCase(),
        };
        //fetch('http://de1.api.radio-browser.info/json/stations/bycountry/France')
        RadioBrowser.getStations(filter)
          .then(data => {
            console.log(`Most voted in ${country}: ${data.sort(byMostVoted()).slice(0, 5).map((station) => station.name )}`);
            console.log(`Most popular in ${country}: ${data.sort(byMostPopular()).slice(0, 5).map((station) => station.name )}`);
            console.log(data)
          })
            .catch(err => console.error(err));
      })
    })
  }

  render() {
    return html`
      <h1 class="greeting">Hello New World!</h1>
    `;
  }
}

customElements.define("radio-sidebar", RadioSidebar);

function byMostVoted() {
  return sortBy('votes')
}

function byMostPopular(prop) {
  return sortBy('clicktrend')
}

function sortBy(prop) {
  return function (a, b) {
    return a[prop] > b[prop] ? 1 : b[prop] > a [prop] ? -1 : 0;
  };
}

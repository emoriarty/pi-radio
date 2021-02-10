import { AbstractStationsHorizontalList } from "./abstract-stations-horizontal-list.js";
import { fetchPopularStationsByCountry } from "../../radio-browser-api.js";

export class PopularStationsHorizontalList extends AbstractStationsHorizontalList {
  constructor() {
    super();
    this.title = "Popular stations in your country";
    this.fetchStations = fetchPopularStationsByCountry;
  }
}

customElements.define(
  "popular-stations-horizontal-list",
  PopularStationsHorizontalList
);

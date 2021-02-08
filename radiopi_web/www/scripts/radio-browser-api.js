import RadioBrowser from "https://jspm.dev/radio-browser";

export function fetchPopularStationsByCountry(country, count = 10) {
  const filter = {
    by: "country",
    searchterm: country.toLocaleLowerCase(),
  };

  return RadioBrowser.getStations(filter)
    .then((data) => {
      const stations = data.sort(byMostPopular()).slice(0, count);
      console.log(`Most popular in ${country}`);
      console.log(stations);
      return stations;
    })
    .catch((err) => console.error(err));
}

export function fetchMostVotedStationsByCountry(country) {
  const filter = {
    by: "country",
    searchterm: country.toLocaleLowerCase(),
  };

  return RadioBrowser.getStations(filter)
    .then((data) => {
      const stations = data
        .sort(byMostVoted())
        .slice(0, 10)
        .map((station) => station.name);
      console.log(`Most voted in ${country}`);
      console.log(stations);
      return stations;
    })
    .catch((err) => console.error(err));
}

export function fetchCountryFromCurrentLocation() {
  return fetch("https://ip2c.org/self").then((res) => {
    return res.text().then((data) => {
      const countryNames = data.split(";");
      const country = countryNames.pop();
      const countryCode = countryNames[1];
      return {
        country,
        countryCode,
      };
    });
  });
}

// Filters
function byMostVoted() {
  return sortBy("votes");
}

function byMostPopular(prop) {
  return sortBy("clicktrend");
}

function sortBy(prop) {
  return function (a, b) {
    return a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0;
  };
}

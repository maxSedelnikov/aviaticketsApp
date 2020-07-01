import api from "../services/apiService";
import formatDate from "../helpers/date";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = null;
    this.formatDate = helpers.formatDate;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);

    return response;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      (item) => item.fullName === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code].name ? this.airlines[code].name : "";
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code].logo ? this.airlines[code].logo : "";
  }

  createShortCitiesList(cities) {
    // {'City,Country': null}
    // [key, value]
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.fullName] = null;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    // { 'City name, Country name': {...} }
    return cities.reduce((acc, city) => {
      const countryName = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const fullName = `${city.name},${countryName}`;

      acc[city.code] = { ...city, countryName, fullName };
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket, index) => {
      return {
        ...ticket,
        originName: this.getCityNameByCode(ticket.origin),
        destinationName: this.getCityNameByCode(ticket.destination),
        airlineLogo: this.getAirlineLogoByCode(ticket.airline),
        airlineName: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm"),
        ticketId: index,
      };
    });
  }
}

const locations = new Locations(api, { formatDate });

export default locations;

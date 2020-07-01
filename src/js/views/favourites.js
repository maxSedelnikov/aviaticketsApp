import currencyUI from "../views/currency";

class FavouritesUI {
  constructor(currency) {
    this.container = document.querySelector(".dropdown-content");
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  renderFavourites(favorites) {
    this.clearContainer();

    if (!favorites.length) {
      this.showEmptyMessage();
      return;
    }

    let fragment = "";
    const currency = this.getСurrencySymbol();

    favorites.forEach((favourite) => {
      const template = FavouritesUI.favoriteTemplate(favourite, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMessage() {
    const template = FavouritesUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      Нет избранных билетов.
    </div>
    `;
  }

  static favoriteTemplate(favorite, symbol) {
    return `
  <div id="${favorite.ticketId}" class="favorite-item d-flex align-items-start">
    <img
      src="${favorite.airlineLogo}"
      class="favorite-item-airline-img"
    />
    <div class="favorite-item-info d-flex flex-column">
      <div
        class="favorite-item-destination d-flex align-items-center"
      >
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${favorite.originName}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${favorite.destinationName}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${favorite.departure_at}</span>
        <span class="ticket-price teal lighten-3 ml-auto">${symbol}${favorite.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${favorite.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${favorite.flight_number}</span>
      </div>
      <a
        class="waves-effect waves-light btn-small red lighten-1 delete-favorite ml-auto"
        >Delete</a
      >
    </div>
  </div>
    `;
  }
}

const favoritesUI = new FavouritesUI(currencyUI);

export default favoritesUI;

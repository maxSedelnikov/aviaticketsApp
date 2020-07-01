import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favouritesList from "./store/favouritesCollection";
import favoritesUI from "./views/favourites";
import loader from "./helpers/loader";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  favoritesUI.showEmptyMessage();

  const form = formUI._form;
  const tickets = ticketsUI.container;
  const favourites = favoritesUI.container;

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  tickets.addEventListener("click", (e) => {
    onAddToFavHandler(e);
  });

  favourites.addEventListener("click", (e) => {
    onDeleteFavHandler(e);
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  function onAddToFavHandler(event) {
    if (event.target.tagName !== "A") return;

    const ticketWrapper = event.target.closest(".ticket-card");
    const ticketId = +ticketWrapper.id;
    const currentTicket = locations.lastSearch.filter(
      (item) => item.ticketId === ticketId
    );

    favouritesList.getFavourites(currentTicket[0]);
    favoritesUI.renderFavourites(favouritesList.uniqFavs);
  }

  function onDeleteFavHandler(event) {
    if (event.target.tagName !== "A") return;

    const favouriteWrapper = event.target.closest(".favorite-item");
    const favouriteId = +favouriteWrapper.id;

    favourites.removeChild(favouriteWrapper);
    favouritesList.removeFavourites(favouriteId);
    checkEmptyFav(favourites);
  }

  function checkEmptyFav(container) {
    const favouriteItems = container.querySelectorAll(".favorite-item");

    if (!favouriteItems.length) return favoritesUI.showEmptyMessage();

    return;
  }

  async function onFormSubmit() {
    loader.showLoader(tickets);
    // собрать данные из input
    const origin = locations.getCityCodeByKey(formUI.origin.value);
    const destination = locations.getCityCodeByKey(formUI.destination.value);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    const id = locations.index;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
      id,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    loader.removePreloader(tickets);
  }
});

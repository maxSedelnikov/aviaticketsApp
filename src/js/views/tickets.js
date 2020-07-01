import currencyUI from "../views/currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMessage();
      return;
    }

    let fragment = "";
    const currency = this.getСurrencySymbol();

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMessage() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>
    `;
  }

  static ticketTemplate(ticket, symbol) {
    return `
  <div class="col s12 m6">
    <div id="${ticket.ticketId}" class="card ticket-card">
      <div class="ticket-airline d-flex align-items-center">
        <img
          src="${ticket.airlineLogo}"
          class="ticket-airline-img"
        />
        <span class="ticket-airline-name"
          >${ticket.airlineName}</span
        >
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.originName}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destinationName}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price teal lighten-3 ml-auto">${symbol}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      </div>
      <a class="waves-effect waves-light btn-small purple lighten-1 add-favorite ml-auto">Add to favorites</a>
    </div>
  </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;

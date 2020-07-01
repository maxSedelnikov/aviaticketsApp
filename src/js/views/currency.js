class CurrencyUi {
  constructor() {
    this.currency = document.getElementById("currency");
    this.dictionary = {
      USD: "$",
      EUR: "€",
    };
  }

  get currencyValue() {
    return this.currency.value;
  }

  getСurrencySymbol() {
    return this.dictionary[this.currencyValue];
  }
}

const currencyUI = new CurrencyUi();

export default currencyUI;

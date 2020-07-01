import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Init dropdown
const dropdowns = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dropdowns, {
  closeOnClick: false,
});

//init select
const select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

// init autocoplete

const autocompete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocompete, {
  data: {
    Apple: null,
    Microsoft: null,
    Google: "https://placehold.it/250x250",
  },
});

export function getAutoCompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

// init datepicker

const datepickers = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: "yyyy-mm",
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}

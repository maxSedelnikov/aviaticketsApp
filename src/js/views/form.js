import {
  getAutoCompleteInstance,
  getDatePickerInstance,
} from "../plugins/materialize";

class FormUI {
  constructor(autocompeteInstance, datepickerInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");
    this.originAutocomplete = autocompeteInstance(this.origin);
    this.destinationAutocomplete = autocompeteInstance(this.destination);
    this.departPicker = datepickerInstance(this.depart);
    this.returnPicker = datepickerInstance(this.return);
  }

  getForm() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departPicker.toString();
  }

  get returnDateValue() {
    return this.returnPicker.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutoCompleteInstance, getDatePickerInstance);

export default formUI;

class Loader {
  constructor() {
    this.layout = `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  `;
  }

  showLoader(container) {
    container.insertAdjacentHTML("afterbegin", this.layout);
  }

  removePreloader(container) {
    const loader = container.querySelector(".progress");

    if (loader) loader.remove();
  }
}

const loader = new Loader();

export default loader;

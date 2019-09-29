import { ModelFilter } from '../Filter/ModelFilter.js';
import { ViewFilter } from '../Filter/ViewFilter.js';


class ControllerFilter{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelFilter(this);
    this.view = new ViewFilter(this);
  }

  filterProductList() {
    return this.model.filterProductList();
  }

  rebuildProductList() {
    this.mainController.buildProducts();
  }

  getSearchValue() {
    return this.view.getSearchValue();
  }

  setFilterStatus(name, state) {
    this.model.setFilterStatus(name, state);
  }

  clearCancelButtonsDiv() {
    this.view.clearCancelButtonsDiv();
  }

  renderCancelButton(type) {
    this.view.renderCancelButton(type);
  }
}

export { ControllerFilter }
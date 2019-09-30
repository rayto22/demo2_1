import { ModelFilter } from '../Filter/ModelFilter.js';
import { ViewFilter } from '../Filter/ViewFilter.js';


class ControllerFilter{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelFilter(this);
    this.view = new ViewFilter(this);

    this.model.initFilterStatus();
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

  setSearchValue(value) {
    this.view.setSearchValue(value);
  }

  setFilterProperty(filterName, property, val) {
    this.model.setFilterProperty(filterName, property, val);
  }

  clearCancelButtonsDiv() {
    this.view.clearCancelButtonsDiv();
  }

  renderCancelButton(type) {
    this.view.renderCancelButton(type);
  }
}

export { ControllerFilter }
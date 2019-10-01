import { ModelSort } from '../Sort/ModelSort.js';
import { ViewSort } from '../Sort/ViewSort.js';


class ControllerSort{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelSort(this);
    this.view = new ViewSort(this);
  }
  
  initSortStatus() {
    this.model.initSortStatus();
  }

  setSortStatus(sortType) {
    this.model.setSortStatus(sortType);
  }

  rebuildProductList() {
    this.mainController.buildProductList();
  }

  sortProductList(prodArr) {
    return this.model.sortProductList(prodArr);
  }

  setOrderIconToButton(sortStatus) {
    this.view.setOrderIconToButton(sortStatus);
  }

  unsetOrderIconToButton(sortType) {
    this.view.unsetOrderIconToButton(sortType);
  }
}

export { ControllerSort }
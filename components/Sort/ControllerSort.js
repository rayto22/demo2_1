import { ModelSort } from '../Sort/ModelSort.js';
import { ViewSort } from '../Sort/ViewSort.js';


class ControllerSort{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelSort(this);
    this.view = new ViewSort(this);
  }

  setSortStatus(sortType) {
    this.model.setSortStatus(sortType);
  }

  rebuildProductList() {
    this.mainController.buildProducts();
  }

  sortProductList(prodArr) {
    return this.model.sortProductList(prodArr);
  }
}

export { ControllerSort }
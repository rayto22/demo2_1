import { ModelSort } from '../Sort/ModelSort.js';
import { ViewSort } from '../Sort/ViewSort.js';


class ControllerSort{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelSort(this);
    this.view = new ViewSort(this);
  }

  beginSortProcess() {
    this.model.beginSortProcess();
  }

  buildSortedProductList(prodArr) {
    this.mainController.product.buildProductList(prodArr);
  }


}

export { ControllerSort }
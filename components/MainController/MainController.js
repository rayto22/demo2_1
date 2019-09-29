import { ControllerProduct } from '../Product/ControllerProduct.js';
import { ControllerFilter } from '../Filter/ControllerFilter.js';
import { ControllerSort } from '../Sort/ControllerSort.js';


class MainController {
  constructor() {
    if (!!MainController.instance) {
        return MainController.instance;
    }
    MainController.instance = this;

    this.product = new ControllerProduct(this);
    this.filter = new ControllerFilter(this);
    this.sort = new ControllerSort(this);

    this.buildProducts();

    return this;
  }

  buildProducts() {
    let prodArr = this.filter.filterProductList();
    this.sort.sortProductList(prodArr);
    this.product.buildProductList(prodArr);
  }
}

export { MainController };
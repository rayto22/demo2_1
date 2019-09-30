import { ControllerProduct } from '../Product/ControllerProduct.js';
import { ControllerFilter } from '../Filter/ControllerFilter.js';
import { ControllerSort } from '../Sort/ControllerSort.js';


class MainController {
  constructor() {
    if (!!MainController.instance) {
        return MainController.instance;
    }
    MainController.instance = this;

    this.filter = new ControllerFilter(this);
    this.sort = new ControllerSort(this);
    this.product = new ControllerProduct(this);

    this.initPage();

    return this;
  }

  initPage() {
    this.product.getProductList().then(
      
    );
  }

  buildProductList() {
    let prodArr = JSON.parse(localStorage.getItem('productList'));
    prodArr = this.filter.filterProductList(prodArr);
    this.sort.sortProductList(prodArr);
    this.product.renderProductList(prodArr);
  }
}

export { MainController };
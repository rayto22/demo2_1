import { ModelProduct } from '../Product/ModelProduct.js';
import { ViewProduct } from '../Product/ViewProduct.js';

class ControllerProduct{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelProduct(this);
    this.view = new ViewProduct(this);
  }

  buildProductList() {
    this.mainController.buildProductList();
  }

  renderProductList(prodArr) {
    this.view.renderProductList(prodArr);
  }

  getProductList() {
    return this.model.getProductList();
  }
}

export { ControllerProduct }
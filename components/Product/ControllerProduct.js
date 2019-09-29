import { ModelProduct } from '../Product/ModelProduct.js';
import { ViewProduct } from '../Product/ViewProduct.js';

class ControllerProduct{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelProduct(this);
    this.view = new ViewProduct(this);
  }

  buildProductList(prodArr) {
    this.view.buildProductList(prodArr);
  }

}

export { ControllerProduct }
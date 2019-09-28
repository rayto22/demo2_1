import { ModelProduct } from '../Product/ModelProduct.js';
import { ViewProduct } from '../Product/ViewProduct.js';

class ControllerProduct{
  constructor(router) {
    this.router = router;
    this.model = new ModelProduct(this);
    this.view = new ViewProduct(this);

    this.initProductList();
  }

  initProductList() {
    this.model.initProductList();
  }

  buildProductList(prodArr) {
    this.view.buildProductList(prodArr);
  }

}

export { ControllerProduct }
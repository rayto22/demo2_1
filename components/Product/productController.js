import { ProductModel } from '../product/productModel.js';
import { ProductView } from '../product/productView.js';

class ProductController{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ProductModel(this);
    this.view = new ProductView(this);
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

export { ProductController }
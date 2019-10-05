import { ProductCardModel } from '../productCard/productCardModel.js';
import { ProductCardView } from '../productCard/productCardView.js';

class ProductCardController {
  constructor(prodData, eventManager) {
    this.eventManager = eventManager;
    this.model = new ProductCardModel(prodData);
    this.view = new ProductCardView(this);
  }

  removeProductCard() {
    const productId = this.model.getProductData('id');
    this.view.removeProductCard(productId);
  }

  renderProductCard() {
    const productData = this.model.getProductData();
    this.view.renderProductCard(productData);
  }

  buyProduct() {
    console.log("have bought a prod");
  }

  openModalWindowAddInfo() {
    this.view.renderModalWindowAddInfo();
  }
}

export { ProductCardController };
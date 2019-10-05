class ProductCardModel {
  constructor(prodData) {
    this.productData = prodData;
  }

  getProductData(propertyName) {
    if(arguments.length === 0){
      return this.productData;
    } else {
      return this.productData[propertyName];
    }
  }
}

export { ProductCardModel };
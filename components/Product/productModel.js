class ProductModel{
  constructor(contr) {
    this.controller = contr;
  }

  getProductList() {
    // localStorage.removeItem('productList');

    return fetch('/data/products.json').then(answ => answ.json())
      .then((d) => {
        d.forEach(prodObj => {
          if(prodObj.type === 'fish'){
            prodObj.features = [];
            if(prodObj.rapacity === true){
              prodObj.features.push('rapacity');
            }
            if(prodObj.freshwater === true){
              prodObj.features.push('freshwater');
            }
          }
          if(prodObj.type === 'bird'){
            prodObj.features = [];
            if(prodObj.flying === true){
              prodObj.features.push('flying');
            }
            if(prodObj.talking === true){
              prodObj.features.push('talking');
            }
            if(prodObj.singing === true){
              prodObj.features.push('singing');
            }
          }
        });
        localStorage.setItem('productList', JSON.stringify(d));
      });
  }
}

export { ProductModel };
class ModelProduct{
  constructor(contr) {
    this.controller = contr;
  }

  getProductList() {
    localStorage.removeItem('productList');

    return fetch('/demo2_1/data/products.json').then(answ => answ.json())
      .then((d) => {
        localStorage.setItem('productList', JSON.stringify(d));
      });
  }


}

export { ModelProduct };
class ModelProduct{
  constructor(contr) {
    this.controller = contr;
  }

  initProductList() {
    if(Boolean(localStorage.getItem("productList")) === false){
      fetch('/data/products.json').then(answ => {
        return answ.json();
      }).then((d) => {
        localStorage.setItem("productList", JSON.stringify(d));
        this.controller.buildProductList(d);
      });
    } else {
      this.controller.buildProductList(JSON.parse(localStorage.getItem("productList")));
    }
  }


}

export { ModelProduct };
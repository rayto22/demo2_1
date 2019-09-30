class ModelProduct{
  constructor(contr) {
    this.controller = contr;
  }

  initProductList() {
    // localStorage.removeItem('productList');
    if(Boolean(localStorage.getItem('productList')) === false){
      fetch('/data/products.json').then(answ => {
        return answ.json();
      }).then((d) => {
        console.log(d);
        localStorage.setItem('productList', JSON.stringify(d));
      });
    }
  }


}

export { ModelProduct };
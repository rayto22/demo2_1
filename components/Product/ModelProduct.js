class ModelProduct{
  constructor(contr) {
    this.controller = contr;
  }

  initProductList() {
    // localStorage.removeItem('productList');
    if(Boolean(localStorage.getItem('productList')) === false){
        fetch('https://gentle-coast-49966.herokuapp.com/get-goods').then(answ => {
        return answ.json();
      }).then((d) => {
        console.log(d);
        localStorage.setItem('productList', JSON.stringify(d));
      });
    }
  }


}

export { ModelProduct };
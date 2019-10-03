import { Templater } from '../templater/templater.js';

class ProductView{
  constructor(contr) {
    this.controller = contr;
    this.templater = new Templater;

    this.productListDOM = document.querySelector('.product_list');
  }

  renderProductList(prodArr) {
    this.productListDOM.innerHTML = "";

    prodArr.forEach(prod => {

      if(prod.quantity <= 0){
        return;
      }

      let arrOfData = [
        {
          id: prod.id,
          type: prod.type, 
          name: prod.name,
          quantity: prod.quantity,
          price: prod.price
        }];

      // let eventObj = {
      //   one: [{
      //     selector: `.${this.cancelBtnObj[type].className}`,
      //     eventName: 'click',
      //     funName: () => this[this.cancelBtnObj[type].funName]('cancel', type)
      //   }],
      //   all: []}

      this.templater.initTemplate('productCardTemplate', arrOfData, this.productListDOM, undefined, true);
    });
  }
}

export { ProductView };
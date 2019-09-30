import { Templater} from '../Templater/Templater.js';

class ViewProduct{
  constructor(contr) {
    this.controller = contr;
    this.productListDOM = document.querySelector('.product_list');

    this.templatePath = {
      productCard: '/components/Product/productCardTemplate.html'
    };

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

      new Templater(this.templatePath.productCard, arrOfData, this.productListDOM, undefined, true);
    });
  }
}

export { ViewProduct };
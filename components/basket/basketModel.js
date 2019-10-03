class BasketModel{
  constructor(contr) {
    this.controller = contr;

    // this.DOMStorage = {
    //   basketButton: {
    //     divDOM: 
    //   }
    // }

    this.templatePath = {
      basketBtn: '/components/basket/basketBtnTemplate.html'
    };
  }

  initBasket() {

    let arrOfData = [
      {
        buttonName: "Your basket",
        basketQuantity: "0"
      }];

    new Templater(this.templatePath.basketBtn, arrOfData, this.DOMStorage.category.divDOM, eventObj);
  }
}

export { BasketModel };
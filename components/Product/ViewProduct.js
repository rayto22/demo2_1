class ViewProduct{
  constructor(contr) {
    this.controller = contr;
    this.productListDOM = document.querySelector('.productList');
  }

  buildProductList(prodArr) {
    this.productListDOM.innerHTML = "";

    prodArr.forEach(prod => {
      this.productListDOM.innerHTML += `
      <div class="product_div column">
        <div class="prod_image box center">
          <div>Image</div>
        </div>
        <div class="center prod_name_div">${prod.type} ${prod.name} ${prod.color.join('/')}</div>
        <div class="has-text-right">${prod.price} $</div>
      </div>`
    });
  }
}

export { ViewProduct };
class ModelSort{
  constructor(contr) {
    this.controller = contr;

    window.addEventListener('unload', () => this.saveSortStatus());
  }

  initSortStatus() {
    localStorage.removeItem('sortStatus');
    if(Boolean(localStorage.getItem('sortStatus')) === false){
      localStorage.setItem('sortStatus', JSON.stringify(
        {
          status: "cancel",
          orderStrict: true,
          counter: 0
        }
      ));
    }
    this.sortStatus = JSON.parse(localStorage.getItem('sortStatus'));
  }

  saveSortStatus(){
    localStorage.setItem('sortStatus', JSON.stringify(this.sortStatus));
  }

  setSortStatus(sortType) {
    if(this.sortStatus.status !== 'cancel'){
      this.controller.unsetOrderIconToButton(this.sortStatus.status);
    }

    if(this.sortStatus.counter === 2 && this.sortStatus.status === sortType){
      this.sortStatus.status = 'cancel';
      this.sortStatus.orderStrict = true;
      this.sortStatus.counter = 0;
    } else if(this.sortStatus.status === sortType && sortType !== "cancel"){
      this.sortStatus.orderStrict = !this.sortStatus.orderStrict;
      this.sortStatus.counter += 1;
    } else {
      this.sortStatus.status = sortType;
      this.sortStatus.orderStrict = true;
      this.sortStatus.counter = 1;
    }

    this.controller.setOrderIconToButton(this.sortStatus);
  }

  sortProductList(prodArr) {
    if(this.sortStatus.status !== "cancel"){

      prodArr.sort((a,b) => {
        if (a[this.sortStatus.status] < b[this.sortStatus.status]) {
          return -1
        } else {
          return 1
        }
      })

      if(this.sortStatus.orderStrict === false){
        prodArr.reverse();
      }
    }
    return prodArr;
  }
}

export { ModelSort };
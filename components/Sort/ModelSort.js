class ModelSort{
  constructor(contr) {
    this.controller = contr;

    window.addEventListener('unload', () => this.saveSortStatus());

    this.initSortStatus();
  }

  initSortStatus() {
    localStorage.removeItem('sortStatus');
    if(Boolean(localStorage.getItem('sortStatus')) === false){
      localStorage.setItem('sortStatus', JSON.stringify(
        {
          status: "cancel",
          orderStrict: true
        }
      ));
    }
    this.sortStatus = JSON.parse(localStorage.getItem('sortStatus'));
  }

  saveSortStatus(){
    localStorage.setItem('sortStatus', JSON.stringify(this.sortStatus));
  }

  setSortStatus(sortType) {
    if(this.sortStatus.status === sortType && sortType !== "cancel"){
      this.sortStatus.orderStrict = !this.sortStatus.orderStrict;
    } else {
      this.sortStatus.status = sortType;
      this.sortStatus.orderStrict = true;
    }
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
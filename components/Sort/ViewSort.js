class ViewSort{
  constructor(contr) {
    this.controller = contr;
    this.btnColl = {};

    this.sortTypesBtnsDOMcoll = document.querySelectorAll('.sort');

    [...this.sortTypesBtnsDOMcoll].forEach((sortTypeBtnDOM) => {
      let sortType = sortTypeBtnDOM.getAttribute('data-sort-name');
      sortTypeBtnDOM.addEventListener('click', () => this.initSort(sortType));
      this.btnColl[sortType] = sortTypeBtnDOM;
    });
  }

  initSort(sortType){
    this.controller.setSortStatus(sortType);
    this.controller.rebuildProductList();
  }

  unsetOrderIconToButton(sortType) {
      this.btnColl[sortType].querySelector('span').innerHTML = '';
  }

  setOrderIconToButton(sortStatus) {
    if(sortStatus.status !== 'cancel'){
      if(sortStatus.orderStrict === true){
        this.btnColl[sortStatus.status].querySelector('span').innerHTML = '<i class="fas fa-long-arrow-alt-down"></i>';
      } else {
        this.btnColl[sortStatus.status].querySelector('span').innerHTML = '<i class="fas fa-long-arrow-alt-up"></i>';
      }
    }
  }
}

export { ViewSort };
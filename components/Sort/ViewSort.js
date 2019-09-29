class ViewSort{
  constructor(contr) {
    this.controller = contr;

    this.sortTypesDOMcoll = document.querySelectorAll('.sort');

    [...this.sortTypesDOMcoll].forEach((sortType) => {
      sortType.addEventListener('click', () => this.initSort(sortType.getAttribute('data-sort-name')));
    });
  }

  initSort(sortType){
    this.controller.setSortStatus(sortType);
    this.controller.rebuildProductList();
  }

}

export { ViewSort };
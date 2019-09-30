class Templater{
  constructor(link, arrOfData, dom, eventObj, containerFlag){

    fetch(link).then(l=>l.text())
    .then(t=>{
      this.template = t;
      this.render(arrOfData, dom, containerFlag);
      if(Boolean(eventObj) === true) {
        this.hangEvents(eventObj);
      }
    });
  }

  render(arrOfData, dom, containerFlag) {
    let answ = this.template;


    const result = arrOfData.reduce((str, obj) => {
      return str + Object.entries(obj).reduce((domEl, keyValueArr) => {
        const re = new RegExp(`{{ ${keyValueArr[0]} }}`,"g");
        return domEl.replace(re, keyValueArr[1]);
      }, answ);
    }, "");

    if(containerFlag === true){
      const container = document.createElement('span');
      container.innerHTML += result;
      dom.appendChild(container);
    } else {
      dom.innerHTML += result;
    }
    
  }

  hangEvents(eventObj) {
    eventObj.one.forEach(ev => {
      console.log(document.querySelector(ev.selector));
      document.querySelector(ev.selector).addEventListener(ev.eventName, ev.funName);
    });

    eventObj.all.forEach(ev => {
      let coll = document.querySelector(ev.selector);
      [...coll].forEach(elDOM => {
        elDOM.addEventListener(ev.eventName, ev.funName);
      });
    });
  }
}

export { Templater };
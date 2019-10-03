class EventManager {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, func) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(func);
  }

  publish(eventName, data) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(fn => {
        fn(data);
      });
    }
  }

  unsubscribe(eventName, handler) {

  }
}

export { EventManager };
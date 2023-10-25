export class Element {
  constructor(creator) {
    [this.element, this.events] = creator();
  }
  render() {
    return this.element;
  }
  remove() {
    this.events.forEach((eventObject) => {
      const { type, element, handlerFunc } = eventObject;
      element.removeEventListener(type, handlerFunc);
    });
  }
}

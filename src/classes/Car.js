import Vehicle from '@Src/classes/Vehicle';

class Car extends Vehicle {
  constructor(name, type) {
    super(name);
    this._type = type;
  }

  get type () {
    return this._type;
  }

  set type (type) {
    this._type = type;
  }

  startEngine () {
    super.startEngine();
    console.log('pschiiiiiit');
  }
}

export default Car;

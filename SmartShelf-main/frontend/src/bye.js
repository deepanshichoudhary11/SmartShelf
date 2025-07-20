console.log('bye.js loaded');

export function sayGoodbye() {
  console.log('Goodbye from sayGoodbye function!');
}

export default function farewell() {
  console.log('Farewell from the default export!');
}

export const farewellMessage = 'This is a farewell message from the module.';

export class Farewell {
  constructor(name) {
    this.name = name;
  }

    sayFarewell() {
    console.log(`Farewell, ${this.name}!`);
  }
}

// Named export
export const farewellFunction = () => {
  console.log('This is a farewell function!');
};

// Another named export
export const farewellObject = {
  message: 'This is a farewell object.',
  showMessage() {
    console.log(this.message);
  }
};
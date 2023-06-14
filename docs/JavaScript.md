# Les bases du JavaScript

## Variables

À l'avènement du JavaScript, la définition des variables se faisaient avec [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).
<br> Avec l'arrivée d'ES6, un standard d'écriture JavaScript, deux nouvelles manières de créer des variables sont introduites avec [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) et [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).

`let` est identique à `var` en terme de réassignation. Hormis que `let` ne peut pas sortir de sa zone d'action, appelé scope.
`const`, quant à lui, ne peut être réassigné mais se comporte comme `let` en terme de scope.
```js
const both = 'tomato';
let fruit = 'apple';
var vegetable = 'potato';

console.log(both);
console.log(fruit);
console.log(vegetable);

for (let i = 0; i < 1; i++ ){
  const both = 'eggplant';
  let fruit = 'cherry';
  var vegetable = 'yam';

  console.log(both);
  console.log(fruit);
  console.log(vegetable);
}

console.log(both);
console.log(fruit);
console.log(vegetable);
```

```js
// Before loop
tomato
apple
potato
// Inside loop
eggplant
cherry
yam
// After loop
tomato
apple
yam
```

On voit ici que `var` n'est pas limité par son scope ce qui provoque des mutations non voulues, et même voulues ce n'est pas une bonne approche.

- `const` à utiliser de base
- `let` à utiliser en cas de mutation
- `var` à ne plus utiliser

## Template Literal

#### [Chaîne](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings) standard

```js
// Single Line
let fruitSalad = 'let\'s put some apples with cherries';
```

```js
// Multi Line
let fruitSalad = 'let\'s put some' +
      ' apples with cherries';
```

```js
// Concatened string with vars
const fruits = ['apples', 'cherries'];
let fruitSalad = 'let\'s put some ' + fruits[0] + ' with ' + fruits[1];
```

#### Chaîne type ["littéraux de gabarits"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

```js
// Single Line
let fruitSalad = `let's put some apples with cherries`;
```

```js
// Multi Line
let fruitSalad = `let's put some
    apples with cherries`;
```

```js
// String interpolation with vars
const fruits = ['apples', 'cherries'];
let fruitSalad = `let's put some ${ fruits[0] } with ${ fruits[1] }`;
```

  Les avantages des littéraux sont multiples :
- les simples `'` et doubles quotes `"` n'ont plus besoin d'être "escape" avec `\ `, leur utilisation est bien plus fréquente qu'une back quote
- des chaînes de caractère sur plusieurs lignes sans opérateur de concaténation
- plus d'oubli d'espace à chaque concatenation
- en soit une meilleure lisibilité de code

## Fonctions
Les [fonctions fléchées](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) sont des [fonctions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) avec une syntaxe simplifiée et qui redéfinissent leur contexte, ou scope, `this` avec celui du parent.

#### Fonction standard

```js
// Regular function
function sum(a, b) {
  return a + b;
}
```

#### Fonction fléchée

```js
// Arrow function
const sum = (a, b) => {
  return a + b;
};
// or
const sum = (a, b) => a + b;
```

Sans les accolades, le `return` est implicite, ce qui n'est pas possible avec une fonction standard.

## Scopes

Pour comprendre comment fonctionnent les contextes/scopes en JavaScript et les utiliser avec `this`, voici un exemple.
<br> La définition d'une [`Class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) fait qu'elle possède automatiquement un contexte `this` où sont accessibles ses attributs
et ses méthodes.
<br> Il en est de même pour un [Objet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) classique.

#### Définition de classe

```js
class Vehicle {
  constructor(name, type) {
    this._name = name;
    this._type = type;
    
    const bike = {
      name: 'Ducati',
      type: 'Moto',
      arrowFunction: () => console.log(this),
      regularFunction () { console.log(this); },
    };
    const arrowFunction = () => console.log(this);
    function regularFunction() { console.log(this); }

    bike.arrowFunction();
    bike.regularFunction();
    arrowFunction();
    regularFunction();
    this.startEngine();
  }

  // Method definition, function is value, name function is key
  startEngine () { // same as regularFunction: function () {}
    console.log(this);
  }
}
```

#### Instance de classe

```js
const car = new Vehicle('Jeep', 'Voiture');
```

#### Résultat console

```js
// bike.arrowFunction();
> Object { _name: "Jeep", _type: "Voiture" }
// bike.regularFunction();
> Object { name: "Ducati", type: "Moto", arrowFunction: arrowFunction(), plainFunction: plainFunction() }
// arrowFunction();
> Object { _name: "Jeep", _type: "Voiture" }
// regularFunction();
> undefined
// this.startEngine();
> Object { _name: "Jeep", _type: "Voiture" }
```

On voit qu'à chaque appel de `this` dans une fonction fléchée, on appelle le contexte du parent alors qu'avec des fonctions
standards on appelle le contexte courant.

## Synchrone & Asynchrone

Le [synchrone](https://developer.mozilla.org/en-US/docs/Glossary/Synchronous) se traduit par une communication où chaque
partie attend la réponse de l'autre comme une discussion entre deux personnes.

```js
let fruit = 'apple';

fruit.toUpperCase(); // APPLE
fruit.replace('apple', 'cherry'); // cherry
fruit.slice(2, 4); // pl
```

L'[asynchrone](https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous) se traduit quant à lui par plusieurs
évènements qui se déclenchent en même temps.
<br> Cela pose problème lorsque l'on essaie d'acceder à un résultat dans un même contexte sans spécifier d'attendre une réponse.

```js
let fruits = [];

fetch('https://get-fruits.com')
  .then(response => {
    fruits = response;
    console.log(fruits); // ['apple', 'banana', 'cherry']
  })
;

console.log(fruits); // undefined
```

[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Pour contourner ce problème, on crée une fonction asynchrone avec [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

```js
const getFruits = async () => {
  let fruits = await fetch('https://get-fruits.com');

  console.log(fruits); // ['apple', 'banana', 'cherry']
};
```

Inconvénient, on ne peut pas utiliser `await` en dehors d'un contexte `asyn`.

```js
const getFruits = async () => await fetch('https://get-fruits.com');

let fruits = getFruits();

console.log(fruits); // Promise { <state>: "pending" }
```

## Callback

Un [callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) est une fonction qui est passée
dans un paramètre d'une autre fonction. Le fonction de callback est ensuite appelée dans l'autre fonction.

```js
const getFruits = async (callback) => {
  callback(await fetch('https://get-fruits.com'));
};

let fruits = getFruits((response) => {
  console.log(response); // ['apple', 'banana', 'cherry']
});
```

Attention à ne pas les enchainer, les contextes sont déjà une notion peu intuitive, donc chainer les callback rendra le
code illisible et difficile à maintenir.

```js
getFruits((response) => {
  getGarden((response1) => {
    getHouse((response2) => {
      getCity((response3) => {
        getState((response4) => {
          getCountry((response5) => {
            if (response5 === null) {
              if (response3 === false && !!response2) {
                console.log('whereami?');
              }
            }
          });
        });
      });
    });
  });
});
```

## Promise

Une [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) est un résultat
d'une instruction asynchrone. Les promises redirigent nativement le résultat dans `then()` en cas de résultat réussi ou
`catch()` en cas d'erreur. `finally()` sera la dernière instruction lancée en cas de réussite ou d'erreur.

```js
const getOneFruitByType = (type = 'apple') => {
  const fruits = ['apple', 'banana', 'cherry'];
  
  return new Promise((resolve, reject) => setTimeout(() => {
    const idx = fruits.indexOf(type);
    
    if (idx > -1) {
      resolve(fruits[idx]);
    } else {
      reject(`Can't find ${ type }`);
    }
  }, 2500));
};
```

```js
getOneFruitByType('cherry')
  .then((fruit) => {
    console.log(`I found ${ fruit }!`)
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Promise done');
  })
;
```

#### Exemple

Voici une démonstration de comment s'enchaine les instructions en fonction de leur contexte, une promise, un callback
et d'executer un contexte synchrone alors qu'il est asynchrone.

```js
const getFruits = (cb = undefined) => {
  return new Promise((resolve, reject) => setTimeout(() => {
    const stashedFruits = ['apple', 'banana', 'cherry'];

    if (cb) {
      cb(stashedFruits);
    }

    resolve(stashedFruits);
  }, 2500));
};
```

```js
(async () => {
  let fruits = getFruits((data = undefined) => {
    console.log('1');
    console.log(data);
  });

  console.log('2');
  console.log(fruits);

  let fruitsAsync = await getFruits((data = undefined) => {
    console.log('3');
    console.log(data);
  });

  console.log('4');
  console.log(fruitsAsync);
})()
```

```js
> 2
> Promise { <state>: "pending" }
> 1
> Array(3) [ "apple", "banana", "cherry" ]
> 3
> Array(3) [ "apple", "banana", "cherry" ]
> 4
> Array(3) [ "apple", "banana", "cherry" ]
```
'use strict';

// create some product objects
// will have an array of product objects, and randomly display 3 different on the page
// we will click on these products to vote
// // we will track our clicks
// when we hit 10 clicks, remove event listener - close polls
// when the polls have closed, we render the results
// te results will be the name of the product, the number of times it was viewed, and number of votes received


//global variables
var allProducts = [];
var totalClicksAllowed = 25;
var clicks = 0;
var myContainer = document.getElementById('container');
var imgOneEl = document.getElementById('image-one');
var imgTwoEl = document.getElementById('image-two');
// var imgThreeEl = document.getElementById ('image-three');
var myList = document.getElementById('list');


//constructor
function Product(name) {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.source = `img/${name}.jpg`;
  allProducts.push(this);
}

//function
function getRandomProductsIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

//executable code
new Product('bag');
new Product('banana');
new Product('bag');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');



console.log(getRandomProductsIndex());

function renderallProducts() {
  var productOne = getRandomProductsIndex(); //this is an INDEX
  var productTwo = getRandomProductsIndex(); //this is an INDEX
  // var productThree = getRandomProductsIndex();
  // with three indexes this gets more complex!!! maybe use an array, maybe see if the index in question is included in that array, if it is, choose another index
  // NOTE:  we've used myArray.push.  how do you remove something from an array? how do we add something to the FRONT of an array?  remove from the FRONT, how do you remove from the BACK?
  // *** I found splice() to remove arbitrary item, shift() to remove from beginning and pop() to remove from end


  while (productOne === productTwo) {
    productTwo = getRandomProductsIndex();
    // productThree = getRandomProductsIndex();
  }

  imgOneEl.src = allProducts[productOne].source;
  imgOneEl.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imgTwoEl.src = allProducts[productTwo].source;
  imgTwoEl.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;

  // imgThreeEl.src = allProducts[productThree].source;
  // imgThreeEl.alt = allProducts[productThree].name;

}

function renderResults(){
  for (var i = 0; i < allProducts.length; i++) {
    // create element
    var li = document.createElement('li');
    // give it content
    li.textContent = `${allProducts[i].name} had ${allProducts[i].votes}, and was seen ${allProducts[i].views} times`;
    // append it to the dom
    myList.appendChild(li);

  }
}

renderallProducts();

//event handler
// event handler takes 1 parameter: event or atfen "e"
function handleClick(event) {
  // this grabs the image alt property - which is the same as the product name property
  var clickedProduct = event.target.alt;
  clicks++;

  for (var i = 0; i < allProducts.length; i++){
    // we are looking at ALL the name properties inside the product array and comparing them to our image alt property
    if(clickedProduct === allProducts[i].name){
      // if true, we KNOW we have the correct product and we can increment its votes!
      allProducts[i].votes++;
    }
  }


  renderallProducts();
  if (clicks === totalClicksAllowed) {
  // remove event listener takes parameters: event, and the callback functions.
    myContainer.removeEventListener('click', handleClick);
    // renders our results in a list
    renderResults();
  }

  // console.log(clickedProduct);
}


// console.log(getRandomProductsIndex());





//event listener takes 2 parameters: event, and the callback function

myContainer.addEventListener('click', handleClick);

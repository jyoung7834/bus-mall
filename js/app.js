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
var imgThreeEl = document.getElementById('image-three');
var myList = document.getElementById('list');
var view = [];
var selections = [];
var productlabels = [];
var renderQ = [];


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

var retrievedResults = localStorage.getItem('productResults');
if (retrievedResults) {
  var parsendRetrievedResults = JSON.parse(retrievedResults);
  allProducts = parsendRetrievedResults;
} else {
  //executable code
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
}


// console.log(getRandomProductsIndex());
function populateRenderQ() {
  while (renderQ.length > 3) {
    renderQ.shift();
  }
  while (renderQ.length < 6) {
    var uniqueProd = getRandomProductsIndex();
    while (renderQ.includes(uniqueProd)) {
      uniqueProd = getRandomProductsIndex();
    }
    renderQ.push(uniqueProd);
  }
  // console.log(renderQ);
}

function retrieveData() {
  for (var i = 0; i < allProducts.length; i++) {
    view.push(allProducts[i].views);
    productlabels.push(allProducts[i].name);
    selections.push(allProducts[i].votes);
  }
}


function renderallProducts() {
  populateRenderQ();
  var productOne = renderQ[0];
  var productTwo = renderQ[1];
  var productThree = renderQ[2];
  // with three indexes this gets more complex!!! maybe use an array, maybe see if the index in question is included in that array, if it is, choose another index
  // NOTE:  we've used myArray.push.  how do you remove something from an array? how do we add something to the FRONT of an array?  remove from the FRONT, how do you remove from the BACK?
  // *** I found splice() to remove arbitrary item, shift() to remove from beginning and pop() to remove from end

  // THIS WHILE LOOP IS NO LONGER NEEDED BECAUSE AN ARRAY WAS CREATED WITH A UNIQUE PRODUCT
  // while (productOne === productTwo) {
  //   productTwo = getRandomProductsIndex();
  //   // if (productThreee === productTwo || productOne) {
  //   //     productThree = getRandomProductsIndex();
  // }

  imgOneEl.src = allProducts[productOne].source;
  imgOneEl.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imgTwoEl.src = allProducts[productTwo].source;
  imgTwoEl.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;

  imgThreeEl.src = allProducts[productThree].source;
  imgThreeEl.alt = allProducts[productThree].name;
  allProducts[productThree].views++;

}

function renderResults() {
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

  for (var i = 0; i < allProducts.length; i++) {
    // we are looking at ALL the name properties inside the product array and comparing them to our image alt property
    if (clickedProduct === allProducts[i].name) {
      // if true, we KNOW we have the correct product and we can increment its votes!
      allProducts[i].votes++;
    }
  }

  console.log(view, selections, productlabels);
  renderallProducts();
  if (clicks === totalClicksAllowed) {
    // remove event listener takes parameters: event, and the callback functions.
    myContainer.removeEventListener('click', handleClick);
    retrieveData();
    renderChart();
    // renders our results in a list
    renderResults();

    var stgringifiedResults = JSON.stringify(allProducts);
    localStorage.setItem('productResults', stgringifiedResults);
  }

  // console.log(clickedProduct);
}


// console.log(getRandomProductsIndex());





//event listener takes 2 parameters: event, and the callback function

myContainer.addEventListener('click', handleClick);



// chart javascript


var ctx = document.getElementById('myChart').getContext('2d');
function renderChart() {

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productlabels,
      datasets: [{
        label: '# of Votes',
        data: selections,
        backgroundColor: 'rgba(255, 255, 51)',
        borderColor: 'rgba(255, 255, 51)',
        borderWidth: 1
      }, {
        label: '# of View',
        data: view,
        backgroundColor: 'rgba(0, 255, 0)',
        borderColor: 'rgba(0, 255, 0)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

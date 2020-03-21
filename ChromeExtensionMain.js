// store contents and parent of contents
let contents = $('#primary');
let contentsParent = contents.parent();

// colors to be cycled
const colors = ['black', 'IndianRed', 'gray'];

// Returns a random number between min (inclusive) and max (exclusive)
// random of input: colors or images, array
function getRandomArbitrary(type, min = 0, max = 3) { //we'll get a random value from 0-2 on line 11
  return type[Math.floor(Math.random() * (max - min) + min)]; //colors[0], colors[1], colors[2]
}

// content to be added
//1. you have to create a div element
//2. write my quote 
//3. on line 20, i want to append the quote to the div
const div = $('<div></div>').attr('class', 'focus');
const quote = $('<h1>No Time To Relax,<br>Go Back To Work</h1>').attr('class', 'beautText').css('color', getRandomArbitrary(colors));
quote.appendTo(div);

// add content to page
div.appendTo(contentsParent);

// remove YouTube videos immediately, replace with motivational image
contents.remove() //.remove() is a jquery method

// animate quote text
quote.animate({
  fontSize: '7.5em', opacity: '0.5',
});

// helper function for retrieving a new, random image when image is clicked 
function getNewImage(e) { //from line 53, clicks will trigger helper function
  $.ajax({
    method: 'GET',
    url: 'https://unsplash.it/list',
    success: result => { //if success, an array of all unsplash images is received in the form of objects (993 objects)
      const image = getRandomArbitrary(result, 0, result.length);
      $(e.target).attr('src', 'https://unsplash.it/1200/800?image=' + image.id);
    },
    error: err => console.log(err)
  });
}

// get a random image from unsplash and add it to the page in place of distracting content
$.ajax({
  method: 'GET',
  url: 'https://unsplash.it/list',
  success: result => { //if success, an array of all unsplash images is received in the form of objects (993 objects)
    const image = getRandomArbitrary(result, 0, result.length); console.log(image); //image is an object chosen at random
    $('<img>').attr('src', `https://unsplash.it/1200/800?image=` + image.id) //<img src="https://unsplash.it/1200/800?image=100 />
      .attr('height', '500px').attr('width', 'auto')
      .click(e => getNewImage(e)) // generate new, random image when image is clicked
      .appendTo(div) // add to page
      .hide().fadeIn('slow'); // fade in image
  },
  error: err => console.log(err)
});

/*
function getRandomArbitrary(type, min = 0, max = 3) {
  return type[Math.floor(Math.random() * (max - min) + min)];
}
*/

// $.ajax({
//   method: 'GET',
//   url: 'URL',
//   success: result => console.log(result)
//   },
//   error: err => console.log(err)
// });



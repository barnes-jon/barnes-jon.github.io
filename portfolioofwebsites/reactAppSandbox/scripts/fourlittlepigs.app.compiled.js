(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var animals = exports.animals = {
  petunia: {
    image: '/images/dolphin.jpg',
    facts: ['petunia loves food', 'petunia loves snuggles with her mom', 'petunia enjoys blowing bubbles in the water']
  },
  hank: {
    image: '/images/lobster.jpg',
    facts: ['hank is a sweetheart', 'hank loves savory food','hank really enjoys classical gas']
  },
  mabelline: {
    image: 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/269956177_137531585364995_3443264728112918611_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=ZDXG6WtbrZkAX9Uz7vU&edm=AABBvjUBAAAA&ccb=7-4&oh=00_AT-YMGtKXZuWTS5zIz0Wt9R_et7RMWoQXaQJKwzpHVQMzA&oe=627119EC&_nc_sid=83d603',
    facts: ['mabelline is the bravest pig', 'mabelline loves eggs', 'mabelline helps get daisy']
  },
  potatoe: {
    image: 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/270157362_359436139281607_4670004192799682639_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=nKpOSt5nBQ8AX8SWLlO&edm=AABBvjUBAAAA&ccb=7-4&oh=00_AT_E10LxupxjT6XL_AS6OxqINYw5Ha1XHbJZYqbdXJeSjQ&oe=62701AF6&_nc_sid=83d603',
    facts: ['potatoe loves eating grass', 'potatoe wakes up very early', 'potatoe loves her brother and sisters']
  }
};

},{}],2:[function(require,module,exports){
'use strict';

var _animals = require('./animals');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var title = "";

var showBackground = true;

var background = _react2.default.createElement('img', {
  className: 'background',
  alt: 'ocean',
  src: 'https://p2.piqsels.com/preview/737/288/33/barn-farm-autumn-fall.jpg'
});

var images = [];
for (var animal in _animals.animals) {
  images.push(_react2.default.createElement('img', {
    key: animal,
    className: 'animal',
    alt: animal,
    src: _animals.animals[animal].image,
    ariaLabel: animal,
    role: 'button',
    onClick: displayFact
  }));
}

function displayFact(e) {
  var selectedAnimal = e.target.alt;
  var animalInfo = _animals.animals[selectedAnimal];
  var optionIndex = Math.floor(Math.random() * animalInfo.facts.length);

  var funFact = animalInfo.facts[optionIndex];
  document.getElementById('fact').innerHTML = funFact;
}

var animalFacts = _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    'h1',
    null,
    title == "" ? "Click an animal for a fun fact" : title
  ),
  showBackground && background,
  _react2.default.createElement('p', { id: 'fact' }),
  _react2.default.createElement(
    'div',
    { className: 'animals' },
    images
  )
);

_reactDom2.default.render(animalFacts, document.getElementById("root"));

},{"./animals":1,"react":undefined,"react-dom":undefined}]},{},[2]);


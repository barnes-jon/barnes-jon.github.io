(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var animals = exports.animals = {
  petunia: {
    image: 'images/petunia.png',
    facts: ['petunia loves food', 'petunia loves snuggles with her mom', 'petunia enjoys blowing bubbles in the water']
  },
  hank: {
    image: 'images/hank.png',
    facts: ['hank is a sweetheart', 'hank loves savory food','hank really enjoys classical gas']
  },
  mabelline: {
    image: 'images/mabelline.png',
    facts: ['mabelline is the bravest pig', 'mabelline loves eggs', 'mabelline helps get daisy']
  },
  potatoe: {
    image: 'images/potatoe.png',
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
  src: 'images/barn-farm-autumn-fall.jpeg'
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


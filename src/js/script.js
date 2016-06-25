var $ = require('jquery');
var Auth = require('./auth')

var login = function(type){
  Auth
    .init()
    .login(type);
};
$(document).ready(function () {
  login('anonymous');
})
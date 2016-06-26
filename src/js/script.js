var $ = require('jquery');
var Auth = require('./auth')

var login = function(type){
    Auth.login(type);
};
$(document).ready(function () {
  Auth.init()
  login('anonymous');
})
var $ = require('jquery');
var Auth = require('./auth')
var errorIndex = 0;

var login = function(type, data){
  return Auth.login(type, data);
};
var redirect = function(to) {
  window.location = to;
}
var redirectToHome = function(user) {
  if(user){
    redirect('index.html');
  }
}
var redirectToLogin = function(user) {
  if(user){
    redirect('login.html');
  }
}
var showError = function(errorObject){

}

var currentPage = function(){
  var page = window.location.pathname.replace('/', '').replace('\.html', '');
  console.log(page)
  return page == '' ? 'index' : page;
}

$(document).ready(function () {
  Auth.init();

  if( currentPage() == 'index' ){
    if( Auth.checkLoggedInUser() === null ){
      redirectToLogin()
    }
  } 

  console.log('Init Done');

  $('#anonymous,#facebook,#twitter,#google,#github').on('click', function(e) {
    login($(this).attr('id'))
      .then(redirectToHome)
  })

  $('#register').on('click', function(e) {
    e.preventDefault();
    $('#email, #password').val('')
    var data = {email: $('#email').val(), password: $('#password').val()}
    console.log(data);
    Auth
      .register(data)
      .then(redirectToHome)
  })

  $('#login').on('click', function(e) {
    e.preventDefault();
    var data = {email: $('#email').val(), password: $('#password').val()}
    console.log(data);
    $('#email, #password').val('')
    login('email', data)
      .then(redirectToHome)
  })
})
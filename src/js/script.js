var $ = require('jquery');
var Auth = require('./auth')

//Error box indexes
var errorIndex = 0;

//Login Wrapper
var login = function(type, data){
  return Auth.login(type, data);
};

//Redirect to some Page or URL
var redirect = function(to) {
  window.location = to;
}

//Redirect to Home
var redirectToHome = function(user) {
  if(user){
    redirect('index.html');
  }
}

//Redirect to Login
var redirectToLogin = function(user) {
  if(!user){
    redirect('login.html');
  }
}

//Error show and hide controller, will be using the ErrorIndex
var showError = function(errorObject){

}

//Gets the currently open page, can evolve to a router
var currentPage = function(){
  var page = window.location.pathname.split('/')
  page = page[page.length - 1].replace('\.html', '');
  console.log(page)
  return page == '' ? 'index' : page;
}

//Function to ensure the redirects on user auth state
var authStateRouter = function(){
  console.log('Auth Router')
  //Check and Set the user status
  var user = Auth.checkLoggedInUser();

  if( user === null ){ //User is not logged in
    if( currentPage() !== 'login' ){//IF user is not on login page
      //Open the login page
      redirectToLogin(user)
    }
  } else { //User is logged in
    //Check if page is login page
    if( currentPage() === 'login' ){//User is on login page
      //Redirect to the Home page
      redirectToHome(user);
    } else { //User is not on login page
      //Show and Hide the appropriate button in the Header
      $('.logout-link').show();
      $('.login-link').hide();
    }
  }
}

$(document).ready(function () {
  //Initialize the Firebase App
  Auth.init(authStateRouter);

  //Logout Button
  $('.logout-link').on('click', function (e) {
    if( Auth.logout() ){
      redirectToLogin();
    }
  })

  //Social and Anonymous Auth Scheme Login
  $('#anonymous,#facebook,#twitter,#google,#github').on('click', function(e) {
    login($(this).attr('id'))
      .then(redirectToHome)
  })

  //Register for Email Auth Scheme
  $('#register').on('click', function(e) {
    e.preventDefault();
    var data = {email: $('#email').val(), password: $('#password').val()}
    console.log(data);
    $('#email, #password').val('')
    Auth
      .register(data)
      .then(redirectToHome)
  })

  //Email Auth Scheme Login
  $('#login').on('click', function(e) {
    e.preventDefault();
    var data = {email: $('#email').val(), password: $('#password').val()}
    console.log(data);
    $('#email, #password').val('')
    login('email', data)
      .then(redirectToHome)
  })
})
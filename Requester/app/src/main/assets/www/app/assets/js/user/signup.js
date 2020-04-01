$(function() {
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

  populate('#form', {
    "first": "Tito",
    "last": "Oladeji",
    "email": "diltony@yahoo.com",
    "phone": "+2347030290744",
    "password": "lagos"
  }, 0);


  $('#form').on('submit', function() {

    fdata = $(this).serializeJson();

    if (fdata.first.length < 3) {
      walert('Enter your first name');
      $('#first').focus();
      return false;
    } else if (fdata.last.length < 3) {
      walert('Enter your last name');
      $('#last').focus();
      return false;
    } else if(!validateEmail(fdata.email)) {
      walert('Enter a valid email');
      $('#email').focus();
      return false;
    } else if (fdata.phone.length != 11) {
      walert('Enter a valid phone number (11 digits)');
      $('#phone').focus();
      return false;
    }

    store_cred(fdata, ['email', 'password']);

    fetch_data(
      'user/register', fdata,
      function(response) {
        !authorize(response);
      }
    );

    return false;
  });



});

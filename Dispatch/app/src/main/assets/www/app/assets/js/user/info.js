$('.collapsible').collapsible();

var applet = new function() {
  this.initialized = false;

  this.initialize = function() {
    this.render();
  };

  this.render = function() {
    if (this.initialized) {
      return;
    }

    $('.form #first').val(user_data.first).focus();
    $('.form #last').val(user_data.last).focus();
    $('#emailady').html(user_data.email);
    $('#email').val(user_data.email).focus();
    $('.form #phone').val(user_data.phone).focus();


    $('#user_avatar_big').attr('src', user_data.avatar);

    $('#send1').focus();


    this.initialized = true;
  }

};



$('#profile').on('submit', function() {

  fdata = $(this).serializeJson();

  if (fdata.first.length < 3) {
    walert('Enter your first name');
    $('#first').focus();
    return false;
  } else if (fdata.last.length < 3) {
    walert('Enter your last name');
    $('#last').focus();
    return false;
  } else if (fdata.phone.length != 11) {
    walert('Enter a valid phone number (11 digits)');
    $('#phone').focus();
    return false;
  }

  fetch_data(
    'profile/update/info', fdata,
    function(response) {
      psync(response);
      walert("Your profile was updated successfully.");

      setTimeout(function() {
        redirect("user/bvn");
      },3000);
    });

  return false;
});

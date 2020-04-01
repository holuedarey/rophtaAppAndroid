$(function() {

  populate('#form', {
    "bvn": fdata_get('user_bvn'),
    "address": fdata_get('user_address'),
    "dob": fdata_get('user_dob'),
  }, 1);


  //$('#dob').val("Jan 01, 1980");


  $('#form').on('submit', function() {

    fdata = $(this).serializeJson();

    if(fdata.address.length<10) {
      walert("Please enter your address");
      return false;
    }

    //store for ref
    fdata_set('user_bvn',fdata.bvn);
    fdata_set('user_address',fdata.address);
    fdata_set('user_dob',fdata.dob);


    if(!validateDate(fdata.dob)) {
      walert("Please enter a validate date of birth e.g. 1983-03-25");
      return false;
    }


    fetch_data(
      'profile/update/bvn', fdata,
      function(response) {
        walert("Your BVN has been validated successfully!");
          authorize(response);
          location.reload();
      });

    return false;
  });



});

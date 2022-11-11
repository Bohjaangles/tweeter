// Function is called in client.js so to have only one document.ready call. function declared here as per instructions from compass.

function charCount(event) {
  let textAreaLen = 0;
  textAreaLen =  $(this).val().length;
  let counterNum = 140 - textAreaLen;
  $( "#counter1" ).text(counterNum);
  if ($('#counter1').val() < 0) {
    $('.counter').addClass('negInt');
  } else {
    $('.counter').removeClass('negInt');
  }; 
};

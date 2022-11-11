
// function to update the number of chars entered into input field and to use that info to also update the counter displayed in the bottom right below the input field

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

$(document).ready(function() {
  $('#tweet-text').on("keyup", charCount);
});
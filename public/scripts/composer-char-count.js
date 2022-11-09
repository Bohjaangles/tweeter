
// function to update the number of chars entered into input field and to use that info to also update the counter displayed in the bottom right below the input field
$(document).ready(function() {
  $('#tweet-text').keypress(function() {
    let textAreaLen = 1;
    textAreaLen =  $(this).val().length + 1;
    let counterNum = 140 - textAreaLen;
    $( "#counter1" ).text(counterNum);
  });
});




$(document).ready(function() {
  $('#tweet-text').keypress(function() {
    let textAreaLen = 1;
    textAreaLen =  $(this).val().length + 1;
    let counterNum = 140 - textAreaLen;
    $( "#counter1" ).text(counterNum);
  });
});



// $(() => {
//   $('#counter1').val().change(function(){
//     $('#counter1').val() = counterNum;
//   }) 
// });



// $(selector).val(function(index, currentvalue))

/*
1. Make a var that will equal the length of the input field
2. use this function on counter: $("#id").change(function(){}
3. have it equal the getter function
*/


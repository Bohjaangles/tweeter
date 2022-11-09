$(document).ready(function() {
  $('article').hover(function() {
    $( "article" ).css('box-shadow', '12px 12px 2px 1px rgba(55, 44, 182, 0.2)');
  }, function() {
    $('article').css('box-shadow', 'inherit');
  });
});


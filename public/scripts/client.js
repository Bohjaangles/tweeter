/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//                                                                    |  \\
//  Group 1 - functions that load tweets onto main page from /tweets  |  \\
//                                                                    V  \\
const createTweetElement = function(tweetObject) {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div><i class="fa-solid fa-user"></i><h3>${tweetObject.user.name}</h3></div><h4 id="usertag">${tweetObject.user.handle}</h4>
    </header>
  <p>${tweetObject.content.text}</p>
    <footer>
      <h6 class="footerAlign">${timeago.format(tweetObject.created_at)}</h6><div class="footerAlign"><i class="fa-solid fa-flag fa-2xs"></i><i class="fa-solid fa-retweet fa-s"></i><i class="fa-solid fa-heart fa-2xs">  </i></div>
    </footer>
  </article>`);
  return $tweet;
};

const renderTweets = function($tweets) {
  // loops through tweets arr
  for (const $tweet of $tweets) {
    $('#tweets-container').prepend(createTweetElement($tweet));
  };
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      renderTweets(data);
    },
    error: (error) => {
      console.log('this request failed and this was the error', error);
    }
  });
};



// $(() => {
//   $('.newTweet').click(function(event) {
//     event.preventDefault();
//     loadTweets();
//   });
// });

//                                                               |  \\
// group 2 - functions that validate and post tweets to /tweets  |  \\
//                                                               V  \\

function postTweet(event) {
  event.preventDefault();
  const formData = $(this).serialize();

  const string = formData.replace(/%20/g, " ");
  if (string.length > 140) {
    alert('Too many characters, limit is 140!');
    return;
  }
  console.log(formData);
  if (formData === 'text=') {
    alert('Cannot post an empty tweet. Please enter something and post!');
    return;
  }
  const emptyStr = '';
  $.ajax({
    url: '/tweets/',
    method: 'POST',
    data: formData
  })
  .then(() => loadTweets())
  .then(() => $('#newTweetForm')[0].reset());

}

$(document).ready(function() {
  loadTweets();
  $('.newTweet').on("submit", postTweet);
});


/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



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
  // loops through tweets
  for (const $tweet of $tweets) {
      $('#tweets-container').append(createTweetElement($tweet));
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

$(document).ready(function() {
  $('.newTweet').submit(function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: '/tweets',
      method: 'POST',
    })
    .then(console.log('hey'));
  })
});

$(document).ready(() => {
  loadTweets();
});
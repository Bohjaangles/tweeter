// fix me! - ran out of time - tried importing charCount from composer-char-count.js so only have one document ready trigger going, but it broke everything, come back later to troubleshoot and implement.

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObject) {
  const escape = function (str) {
    let div = document.createElement("p");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div><i class="fa-solid fa-user"></i><h3>${tweetObject.user.name}</h3></div><h4 id="usertag">${tweetObject.user.handle}</h4>
    </header>
  <p>${escape(tweetObject.content.text)}</p>
    <footer>
      <h6 class="footerAlign">${timeago.format(tweetObject.created_at)}</h6><div class="footerAlign"><i class="fa-solid fa-flag fa-2xs"></i><i class="fa-solid fa-retweet fa-s"></i><i class="fa-solid fa-heart fa-2xs">  </i></div>
    </footer>
  </article>`);
  return $tweet;
};

const renderTweets = function($tweets) {
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

function postTweet(event) {
  event.preventDefault();
  $('#errorElement').hide('slow');
  $('#errorElement').text('');
  const formData = $(this).serialize();
  const string = formData.replace(/%20/g, " ");
  if (string.length > 145) {
    const errMsg = document.getElementById('errorElement');
    errMsg.textContent += 'Too many characters, limit is 140!';
    $('#errorElement').show('slow');
    return;
  }
  console.log(formData);
  if (formData === 'text=') {
    const errMsg = document.getElementById('errorElement');
    errMsg.textContent += 'Cannot post an empty tweet. Please enter something and post!';
    $('#errorElement').show('slow');
    return;
  }
  const emptyStr = '';
  $.ajax({
    url: '/tweets/',
    method: 'POST',
    data: formData
  })
  .then(() => loadTweets())
  .then(() => $('#newTweetForm')[0].reset())
  .then(() => $('#counter1').val(140));
}

$(document).ready(function() {
  loadTweets();
  $('#errorElement').hide();
  $('.newTweet').on("submit", postTweet);
  $('#tweet-text').on("keyup", charCount);
});


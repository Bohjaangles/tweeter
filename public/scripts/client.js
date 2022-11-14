

// function that is called to render tweets based lines 11 to 19 directly into index.html
const createTweetElement = function(tweetObject) {
  // Escape function on lines 6 - 10 is to prevent people typing in text into tweet field that can execute a script
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
  $('#tweets-container').empty(); 
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
//
//
//
// postTweets is a large function. come back later to refactor into multple more modular functons. Ran out of time for this to be included in version 1.0.0
/* lines 50,51,53-65 are to ensure that tweets are not empty or exceed 140 chars and provide error messages if they do. lines 52, 67-71 are to update '/tweets/' with new tweets input by users. 
line 73 and 74 to reset the char counter in new tweet section */
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
  $('#tweet-text').on("input", charCount);
});


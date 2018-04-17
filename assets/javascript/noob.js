$(document).ready(function() {

  var database = firebase.database();

  var userLanguage;
  var userSkillLevel;
  var userKeywords;
  var favoriteButton;


  // AUTHORIZE USER LOG-IN
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      console.log('logged in as ' + firebase.auth().currentUser.email);
      user = firebase.auth().currentUser;
      userId = firebase.auth().currentUser.uid;

      getUserData(userId);
    } else {
      console.log('logged out');
    }
  })

  $('.slider').slick({
    dots: true,
    autoplay:true,
    autoplaySpeed: 3500,
    infinte: true,
    accessibility: true,
    arrows:true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '.slick-next',
    prevArrow: '.slick-prev',
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      // {
      //   breakpoint: 980,
      //   settings: "unslick"
      // }

    ]
  });

  // TAKE VALUES FROM DROPDOWN MENUS
  $(".dropdown-language li").on('click', function(){
    $(".language-button").html($(this).html());

    userChoice = $(this).attr('id');
    userLanguage = userChoice;
    console.log("User's programming language: " + userChoice);

  });

  $(".dropdown-skill-level li").on('click', function(){
    $(".skill-level-button").text($(this).text());

    userSkillLevel = $(this).attr('id');
    console.log("User's skill level: " + userSkillLevel);

  });


  // SUBMIT BUTTON
  $('#submit-button').click(function(event) {
    
    event.preventDefault();

    userKeywords = $('#keywords-input').val().trim();
    console.log("User's keyword: " + userKeywords);

    userId = firebase.auth().currentUser.uid;
    console.log('userid: ' + userId);

    // STORE DATA INTO FIREBASE
    database.ref('/users/' + userId).push({
      userLanguage: userLanguage,
      userSkillLevel: userSkillLevel,
      userKeywords: userKeywords,
      favorite: userSkillLevel + ' ' + userLanguage
    }); // end WRITE DATA from firebase

    // CLEAR SEARCH FIELDS
    $('.language-button').text('choose a programming concept');
    $('.skill-level-button').text('choose your skill level');
    $('#keywords-input').val('');

    meetupfunk();

  }); // end SUBMIT BUTTON

  // READ DATA FROM FIREBASE AND DISPLAY IN WINDOW
  function getUserData(userId) {
    database.ref('/users/' + userId).on('child_added', function(snapshot) {
      var ts = snapshot.val();
      console.log(ts);
  
  
      // CREATE 'FAVORITE' BUTTON BASED ON USER SELECTIONS
      var favoriteButtonsDiv = $('.favorite-buttons-div');
      favoriteButton = $('<button class="favorite-button">');
      favoriteButton.attr('favorite-data', ts.favorite);

      if (ts.userSkillLevel == 'beginner') {
        favoriteButton.attr('id', 'beginner-button');
      } else if (ts.userSkillLevel == 'intermediate') {
        favoriteButton.attr('id', 'intermediate-button');
      } else if (ts.userSkillLevel == 'advanced') {
        favoriteButton.attr('id', 'advanced-button');
      }

      favoriteButton.html(ts.userLanguage + ' - ' + ts.userKeywords);
      favoriteButtonsDiv.append(favoriteButton);

      var youTubeUpperCase = (ts.favorite).toUpperCase();
      $('.youtube-header').html('YOUTUBE RESULTS FOR ' + youTubeUpperCase);

  
      // ============== YOUTUBE API ================ //
      var youTubeId = 'AIzaSyBtv3FuM4yag2Qpr17dHewi4EmhFzeWEy0';
      var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + ts.userLanguage + "+" + ts.userSkillLevel + "+" + ts.userKeywords + "&maxResults=10" + "&key=" + youTubeId + '&type=video';
  
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {

        console.log(response);

          $('#youtube-video-1').attr('src', 'https://www.youtube.com/embed/' + response.items[0].id.videoId);

          $('#youtube-video-2').attr('src', 'https://www.youtube.com/embed/' + response.items[1].id.videoId);

          $('#youtube-video-3').attr('src', 'https://www.youtube.com/embed/' + response.items[2].id.videoId);

          $('#youtube-video-4').attr('src', 'https://www.youtube.com/embed/' + response.items[3].id.videoId);

          $('#youtube-video-5').attr('src', 'https://www.youtube.com/embed/' + response.items[4].id.videoId);

          $('#youtube-video-6').attr('src', 'https://www.youtube.com/embed/' + response.items[5].id.videoId);

          $('#youtube-video-7').attr('src', 'https://www.youtube.com/embed/' + response.items[6].id.videoId);

          $('#youtube-video-8').attr('src', 'https://www.youtube.com/embed/' + response.items[7].id.videoId);

          $('#youtube-video-9').attr('src', 'https://www.youtube.com/embed/' + response.items[8].id.videoId);

          $('#youtube-video-10').attr('src', 'https://www.youtube.com/embed/' + response.items[9].id.videoId);
        


      });


      // $('#google-maps-display').attr('src', "https://www.google.com/maps/embed/v1/place?key=AIzaSyBhSBjmU-q9Jf9qFxhho_cfQjWwo2aJcYs&q=" + ts.destination);

  
  
      // ON 'FAVORITE' BUTTON CLICK
      $('.favorite-button').on('click', function() {
        userFavorite = $(this).attr('favorite-data');
        console.log('Favorite: ' + userFavorite);

        var youTubeUpperCase = (userFavorite).toUpperCase();
        $('.youtube-header').html('YOUTUBE RESULTS FOR ' + youTubeUpperCase);
  
         youTubeId = 'AIzaSyBtv3FuM4yag2Qpr17dHewi4EmhFzeWEy0';
         queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + userFavorite + "&key=" + youTubeId + '&maxResults=10' + '&type=video';
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {

            console.log(response);

          $('#youtube-video-1').attr('src', 'https://www.youtube.com/embed/' + response.items[0].id.videoId);

          $('#youtube-video-2').attr('src', 'https://www.youtube.com/embed/' + response.items[1].id.videoId);

          $('#youtube-video-3').attr('src', 'https://www.youtube.com/embed/' + response.items[2].id.videoId);

          $('#youtube-video-4').attr('src', 'https://www.youtube.com/embed/' + response.items[3].id.videoId);

          $('#youtube-video-5').attr('src', 'https://www.youtube.com/embed/' + response.items[4].id.videoId);

          $('#youtube-video-6').attr('src', 'https://www.youtube.com/embed/' + response.items[5].id.videoId);

          $('#youtube-video-7').attr('src', 'https://www.youtube.com/embed/' + response.items[6].id.videoId);

          $('#youtube-video-8').attr('src', 'https://www.youtube.com/embed/' + response.items[7].id.videoId);

          $('#youtube-video-9').attr('src', 'https://www.youtube.com/embed/' + response.items[8].id.videoId);

          $('#youtube-video-10').attr('src', 'https://www.youtube.com/embed/' + response.items[9].id.videoId);
        
        $('.slider').slick({
          dots: true,
          infinite: true,
          autoplay:true,
          autoplaySpeed: 2000,
          arrows:true,
          slidesToShow: 4,
          nextArrow: '.slick-next',
          prevArrow: '.slick-prev'
        });
    

        }); // end AJAX call

      }); // end FAVORITE BUTTON click
  
    }); // end READ DATA from firebase

  }; // end writeUserData()
  

//Submit button for Meetup API

// $('#submit-button').click(function(event) {

     
         //Function to call the meetup api on the submit function
    function meetupfunk(){

      //API KEY and URL
      meetupId = 'key=5b52473129397b281452467819f1446';
    var queryURL = "https://api.meetup.com/find/events/?" + meetupId + "&sign=true&photo-host=public&page=1&text=" + userLanguage + "&radius=20";

        $.ajax({
            url: queryURL,
            dataType: 'jsonp',
            method: 'GET'

        }).then(function(data) {
          var results = data;
          console.log(results.data[0].name);


            // Add the results of the Meetup API, the first upcoming event related to the language input by the user

            $('.meetup-results').append("<div class = 'card-header text-dark text-center font-weight-bold'>" + results.data[0].name + "</div>");
            $('.card-header').append("<ul class = 'list-group list-group-flush text-dark'> </ul>");
            $('.list-group').append("<div class = 'list-group-item text-dark'> DATE: " + results.data[0].local_date + "</div>");

            //convert time from meetup to standard time
            var militaryTime = (results.data[0].local_time)
            var time = moment(militaryTime ,'HH:mm').format('hh:mm a');

            console.log(time);

            //display time, address, venue name
            $('.list-group').append("<div class = 'list-group-item text-dark'>TIME (PST): " + time + "</div>");
            $('.list-group').append("<div class = 'list-group-item text-dark'> VENUE NAME: " + results.data[0].venue.name + "</div>");
            $('.list-group').append("<div class = 'list-group-item text-dark'>ADDRESS: " + results.data[0].venue.address_1 + "</div>");
            $('.list-group').append("<div class = 'list-group-item text-dark'>LINK: " + results.data[0].link + "</div>");



            var meetupAddress = results.data[0].venue.address_1;



            console.log(JSON.stringify(data));


        });
      };
    // });

    // LOG OUT
  $('#btnLogout').on('click', function() {

      firebase.auth().signOut().then(function() {

          location.replace('index.html');

      }); // end firebase LOT OUT

  }); // end BUTTON LOG OUT


}); // end document

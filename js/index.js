var brkDur = $(".brkDur").html();
var sesDur = $(".sesDur").html();
var inSession = true;
var isPaused = false;
var timer = new Timer();
var brkTimer = new Timer();
var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'http://knanthony.com/showcase/pomodorotimer/bell.wav');


$(".break .minus").click(function() {
  if (brkDur > 1) brkDur--;
  $(".brkDur").html(brkDur);
});
$(".break .plus").click(function() {
  brkDur++;
  $(".brkDur").html(brkDur);
});
$(".session .minus").click(function() {
  if (sesDur > 1) sesDur--;
  $(".sesDur").html(sesDur);
  $(".time").html(sesDur);
});
$(".session .plus").click(function() {
  sesDur++;
  $(".sesDur").html(sesDur);
  $(".time").html(sesDur);
});

$(".pause, .stop").hide();

function sessionStarts() {
  inSession = true;
  $("#status").html("Session");

  timer.start({
    countdown: true,
    startValues: { seconds: $('.sesDur').html() * 60 },
    target: { seconds: 0 }
  });
  $(".time").html(timer.getTimeValues().toString());
  //run the countdown
  timer.addEventListener("secondsUpdated", function(e) {
    $(".time").html(timer.getTimeValues().toString());
  });
  timer.addEventListener("targetAchieved", function(e) {
    setTimeout(breakStarts, 1000);
    audioElement.play();
  });
}

function breakStarts() {
  inSession = false;
  $("#status").html("Break!");

  brkTimer.start({
    countdown: true,
    startValues: { seconds: $('.brkDur').html() * 60 }
  });
  $(".time").html(brkTimer.getTimeValues().toString());
  //run the countdown
  brkTimer.addEventListener("secondsUpdated", function(e) {
    $(".time").html(brkTimer.getTimeValues().toString());
  });
  brkTimer.addEventListener("targetAchieved", function(e) {
    setTimeout(sessionStarts, 1000);
    audioElement.play();
  });
}

function resetTimer(){
   timer.stop();
   brkTimer.stop();
   $('.time').html(sesDur);
   $('#status').html('Session');
   $(".pause, .stop").hide();
   $(".start").show();
  $(".minus, .plus").prop("disabled", false);
  inSession = true;
}

$(".pause").click(function() {
  if (inSession) {
    timer.pause();
  } else {
    brkTimer.pause();
  }
  $(".minus, .plus").prop("disabled", false);
  $("session .minus, .session .plus").click(function(){
    resetTimer();
  });
  $(".start, .stop").show();
  $(".pause").hide();
});
$(".start").click(function() {
  $(this).hide();
  $(".pause, .stop").show();
  $(".minus, .plus").prop("disabled", true);
  if (inSession) {
    sessionStarts();
  } else {
    console.log(breakStarts);
    breakStarts();
  }
});
$(".stop").click(function() {
  resetTimer();
});
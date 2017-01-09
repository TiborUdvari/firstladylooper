console.log("Hey there. I like you. wink, wink!");
console.log("Here's the project on the githubs: https://github.com/TiborUdvari/firstladylooper");

var videos = [];
var videoNames = [
	"trim/fafsa.mov", 
	"trim/greatMoves.mov", 
	"trim/helloGiggles.mov", 
	"trim/playing.mov", 
	"trim/sweetPotato.mov", 
	"trim/turnup.mov", 
	"trim/veggiez.mov", 
	"trim/wow.mov",
	"trim/yougeta.mov",
	"trim/workingOut.mov"
	];

var song;
var v;
var divs = 10;
var noobTimeline = 0;
var timelineIncrement;
var s;
var keys = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g']; 
var timelineData = []; 
var keyToIdx = {};

var pVidIdx = -1;
var currentVidIdx = 0;
var pg;

function preload(){
	for (var i = 0; i < videoNames.length; i++){
		var v = createVideo( [ videoNames[i] ] );
		v.hide();
		videos.push(v);
	}

	song = loadSound('trim/lucky_dragons_-_power_melody.mp3');
}

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
	fill(255);

	s = height * .4;

	pg = createGraphics(s, s);

	timelineIncrement = s / divs;
	setInterval(function(){
		noobTimeline = (noobTimeline + 1) % divs;

		for (var i = 0; i < keys.length; i++){
			var beats = timelineData[i].beats;
			if (beats.indexOf(noobTimeline) > -1) {
				currentVidIdx = i;
				var vid = videos[currentVidIdx];
				var playing = vid.elt.currentTime > 0 && vid.elt.paused === false && vid.elt.ended === false;
				if (vid.elt.paused) {
						vid.play();
				}
				if ( !playing ){
				}
			} 
		}

		pVidIdx = currentVidIdx;
	}, 250);

	for (var i = 0; i < videos.length; i++){
		timelineData.push( {"key": keys[i], "beats": []} );
		keyToIdx[keys[i]] = i;
	}

	textAlign(RIGHT, CENTER);
  textSize(10);
  fill(255);
}

function draw() {
	background(0);
	fill(255);
	var vid = videos[currentVidIdx];
	var playing = vid.elt.currentTime > 0 && vid.elt.paused === false && vid.elt.ended === false;

	if (playing) {
		 image(videos[currentVidIdx], width / 2 - s / 2,  .1 * height, s, s); // draw the video frame to canvas
		 pg.image(videos[currentVidIdx], 0, 0, s, s);
	} else {
		//fill(255, 0, 0);
		//rect(width / 2 - s / 2,  .1 * height, s, s);
		image(pg, width / 2 - s / 2,  .1 * height, s, s);
	}

 	filter('GRAY');
  fill(255);
  push();

  translate(width / 2 - s / 2,  .5 * height);
  rect(0, 0, s, s );

  line(noobTimeline * timelineIncrement, 0, noobTimeline * timelineIncrement, s);
  stroke(0);

  var delta = s / videos.length;
  for (var i = 0; i < videos.length; i++) {
  	var y = (i + 1) * delta;
  	line(0, y, width, y);
  	fill(255);
  	text(keys[i].toUpperCase(), -10, y - delta / 2);

  	var beatsData = timelineData[i].beats;
  	beatsData.forEach(function(t) {
  		fill(0);
  		rect(t * timelineIncrement, i * delta, delta, delta);
  	});
  }

  pop();
}

function mousePressed(){
  var h = mouseY - height * .5;
  var delta = s / videos.length;
  var idx = Math.floor(h / delta);
  idx = constrain(idx, 0, videos.length - 1);
  handleInputForIdx(idx);
}

function handleInputForIdx(idx){
		var beats = timelineData[idx].beats;
		var beatIdx = beats.indexOf(noobTimeline);
		if (beatIdx > -1) {
			beats.splice(beatIdx, 1);
		} else {
			beats.push(noobTimeline);
			videos[idx].play();
		} 
}

function keyPressed() {
  var k = key.toLowerCase();
	if (keys.indexOf(k) > -1) {
		var idx = keyToIdx[k];
		handleInputForIdx(idx);
	}
}
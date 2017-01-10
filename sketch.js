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
var loopTime = 275;

var started = false;

function preload(){
	for (var i = 0; i < videoNames.length; i++){
		var v = createVideo( [ videoNames[i] ] );
		console.log(v);
		v.elt.setAttribute("playsinline", true);
		v.hide();
		videos.push(v);
	}
}

function setupValues(){
	s = height * .4;
	pg = createGraphics(s, s);
	timelineIncrement = s / divs;
}

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);

	setupValues();

	setInterval(function(){
		noobTimeline = (noobTimeline + 1) % divs;

		for (var i = 0; i < keys.length; i++){
			var beats = timelineData[i].beats;
			if (beats.indexOf(noobTimeline) > -1) {
				currentVidIdx = i;
				var vid = videos[currentVidIdx];
				var playing = vid.elt.currentTime > 0 && vid.elt.paused === false && vid.elt.ended === false;
				if (vid.elt.paused) {
					started = true;

					vid.play();
				}
				if ( !playing ){
				}
			} 
		}

		pVidIdx = currentVidIdx;
	}, loopTime);

	for (var i = 0; i < videos.length; i++){
		timelineData.push( {"key": keys[i], "beats": []} );
		keyToIdx[keys[i]] = i;
	}

	textAlign(RIGHT, CENTER);
	textSize(10);
	fill(255);

	var el = document.getElementsByTagName("canvas")[0];
	el.addEventListener("touchstart", handleStart, false);
	el.addEventListener("touchend", handleEnd, false);
	el.addEventListener("touchcancel", handleCancel, false);
	el.addEventListener("touchmove", handleMove, false);
}

function showTitle(){
	textSize(20);
	textAlign(LEFT, CENTER);

	text("first\nlady\nlooper", width / 2 , .3 * height);
	noFill();
	stroke(255);
	rect(width / 2 - s / 2 + 1,  .1 * height, s -2, s);
	fill(255);
}

function draw() {
	background(0);

	fill(255);
	var vid = videos[currentVidIdx];
	var playing = vid.elt.currentTime > 0 && vid.elt.paused === false && vid.elt.ended === false;
	
	if (!started) {
		showTitle();
	}

	stroke(0);
	textAlign(RIGHT, CENTER);
	textSize(10);

	if (playing) {// Update if playing ended
		 image(videos[currentVidIdx], width / 2 - s / 2,  .1 * height, s, s); // draw the video frame to canvas
		 pg.image(videos[currentVidIdx], 0, 0, s / window.devicePixelRatio, s / window.devicePixelRatio);
		} else {
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
			//text(keys[i].toUpperCase(), -10, y - delta / 2);

			var beatsData = timelineData[i].beats;
			beatsData.forEach(function(t) {
				fill(0);
				rect(t * timelineIncrement, i * delta, delta, delta);
			});
		}

		pop();
	}

	function touchStarted(){
		handleInputAt(touches[0].x, touches[0].y);
	}

	function mousePressed(){
		handleInputAt(mouseX, mouseY);
	}

	function handleInputAt(x, y) {
		var h = y - height * .5;
		var start = width / 2 - s / 2;
		var delta = s / divs;
		var timeIdx = 0;

		if ( x >= start && x <= start + divs * delta){
			timeIdx = Math.floor((x - start) / delta);
		} else {
			return;
		}

		var delta = s / videos.length;
		var idx = Math.floor(h / delta);
		idx = constrain(idx, 0, videos.length - 1);
		handleInputForIdx(idx, timeIdx);
	}

	function handleInputForIdx(idx, timeIdx){
		var beats = timelineData[idx].beats;
		var beatIdx = beats.indexOf(timeIdx);
		if (beatIdx > -1) {
			beats.splice(beatIdx, 1);
		} else {
			beats.push(timeIdx);
			videos[idx].play();
		} 
	}

	function keyPressed() {
		var k = key.toLowerCase();
		if (keys.indexOf(k) > -1) {
			var idx = keyToIdx[k];
			handleInputForIdx(idx, noobTimeline);
		}
	}

	function handleStart(e){
		e.preventDefault();
	}

	function handleEnd(e){
		e.preventDefault();
	}

	function handleCancel(e){
		e.preventDefault();
	}

	function handleMove(e){
		e.preventDefault();
	}

	function windowResized() {
		resizeCanvas(windowWidth, windowHeight);
		setupValues();
	}

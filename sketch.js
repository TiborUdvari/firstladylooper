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

var mobile = mobileAndTabletcheck();

function preload(){
	for (var i = 0; i < videoNames.length; i++){
		var v = createVideo( [ videoNames[i] ] );
		console.log(v);
		v.elt.setAttribute("playsinline", true);
		v.hide();
		videos.push(v);
	}
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
/*
	if (mobile) {
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(20);
			text("Doesn't work on mobile.\n Sad.", width / 2, height/2);
			noLoop();
			return;
	}*/


	fill(255);
	var vid = videos[currentVidIdx];
	var playing = vid.elt.currentTime > 0 && vid.elt.paused === false && vid.elt.ended === false;
	
	fill(255);
	rect(width / 2 - s / 2,  .1 * height, s, s);
	
	if (playing) {
		 image(videos[currentVidIdx], width / 2 - s / 2,  .1 * height, s, s); // draw the video frame to canvas
		 pg.image(videos[currentVidIdx], 0, 0, s, s);
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
		text(keys[i].toUpperCase(), -10, y - delta / 2);

		var beatsData = timelineData[i].beats;
		beatsData.forEach(function(t) {
			fill(0);
			rect(t * timelineIncrement, i * delta, delta, delta);
		});
	}

	pop();
}

function touchStarted(){
	console.log("touch started");
	handleInputAt(touches[0].x, touches[0].y);
}

function handleInputAt(x, y) {
	var h = y - height * .5;
	var delta = s / videos.length;
	var idx = Math.floor(h / delta);
	idx = constrain(idx, 0, videos.length - 1);
	handleInputForIdx(idx);
}

function mousePressed(){
	handleInputAt(mouseX, mouseY);
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
	if (mobile) return;
	var k = key.toLowerCase();
	if (keys.indexOf(k) > -1) {
		var idx = keyToIdx[k];
		handleInputForIdx(idx);
	}
}

function mobileAndTabletcheck() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};
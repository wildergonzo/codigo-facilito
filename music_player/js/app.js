$(document).ready(function(){
	initPlayer();
	getSongs();
});

var audio, music;

function initPlayer(){
	$('#shuffle').click(function(){
		$('#playlist').empty();
		console.log('shuffled:', shuffle(music.songs));
		getList(music);
		playSong(0);
	});
}

function getSongs(){
	$.getJSON("js/app.json", function(mjson){
		music = mjson;
		getList(music);
		console.log(music);
	});
}

function playSong(id){
	audio = document.getElementById('player');
	var long = music.songs;
	if(id>=long.length){
		console.log('list ended');
		audio.pause();
	} else {
		$('#img-album').attr('src', music.songs[id].image);
		$('#player').attr('src', music.songs[id].song);
		audio.play();
		scheduleSong(id);
	}
	
}

function getList(music) {
	$.each(music.songs, function(i,song){
		$('#playlist').append('<li class="list-group-item" id="' + i + '">' + song.name + '</li>');
	});
	$('#playlist li').click(function(){
		var selectedsong = $(this).attr('id');
		console.log(selectedsong);
		playSong(selectedsong);
	});
}

function scheduleSong(id){
	audio = document.getElementById('player');
	audio.onended = function(){
		console.log('song ended');
		playSong(parseInt(id)+1);
	}
}

function shuffle(array){
	for(var random, temp, position = array.length; position; random = Math.floor(Math.random() * position), temp = array[--position], array[position] = array[random], array[random] = temp);
		return array;
}
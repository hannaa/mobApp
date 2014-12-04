$(document).ready(function(){
	//ensimmäinen versio: löydä parit! :D
	
	function shuffle(array) {
		var l = array.length;
		while(l) {
			i = Math.floor(Math.random() * l--);
			t = array[l];
			array[l] = array[i];
			array[i] = t;
			}
		console.log(array);
		return array;
	}
	var random = [	'#kortti_1', 
					'#kortti_2', 
					'#kortti_3', 
					'#kortti_4', 
					'#kortti_5', 
					'#kortti_6', 
					'#kortti_7', 
					'#kortti_8',
					'#kortti_9', 
					'#kortti_10', 
					'#kortti_11', 
					'#kortti_12', 
					'#kortti_13', 
					'#kortti_14', 
					'#kortti_15', 
					'#kortti_16'];
					
	var color = [	'keltainen',
					'harmaa',
					'lila',
					'pink',
					'punainen',
					'sininen',
					'tsininen',
					'vihrea',
					'keltainen',
					'harmaa',
					'lila',
					'pink',
					'punainen',
					'sininen',
					'tsininen',
					'vihrea'];
	
	
	// Fisher-Yates - "shuffle" funktiota kutsutaan "kysymykset"-arrayhin. Ja näin pakka on sekaisin!
	$('#play_button').click(
		function(){ 
		shuffle(random);
		shuffle(color);
		for(i=0 ; i <= 15; i ++){
			$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
		};
		 
	}); 
	shuffle(random);
	
	
	for(i=0 ; i <= 15; i ++){
		$(random[i]).hide();
		$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
	};
	
	$('#kortti_takaa_1').click(function(){
		$('#kortti_takaa_1').hide();
		$('#kortti_1').show();
	});
	$('#kortti_takaa_2').click(function(){
		$('#kortti_takaa_2').hide();
		$('#kortti_2').show();
	});
	$('#kortti_takaa_3').click(function(){
		$('#kortti_takaa_3').hide();
		$('#kortti_3').show();
	});
	$('#kortti_takaa_4').click(function(){
		$('#kortti_takaa_4').hide();
		$('#kortti_4').show();
	});
	$('#kortti_takaa_5').click(function(){
		$('#kortti_takaa_5').hide();
		$('#kortti_5').show();
	});
	$('#kortti_takaa_6').click(function(){
		$('#kortti_takaa_6').hide();
		$('#kortti_6').show();
	});
	$('#kortti_takaa_7').click(function(){
		$('#kortti_takaa_7').hide();
		$('#kortti_7').show();
	});
	$('#kortti_takaa_8').click(function(){
		$('#kortti_takaa_8').hide();
		$('#kortti_8').show();
	});
	$('#kortti_takaa_9').click(function(){
		$('#kortti_takaa_9').hide();
		$('#kortti_9').show();
	});
	$('#kortti_takaa_10').click(function(){
		$('#kortti_takaa_10').hide();
		$('#kortti_10').show();
	});
	$('#kortti_takaa_11').click(function(){
		$('#kortti_takaa_11').hide();
		$('#kortti_11').show();
	});
	$('#kortti_takaa_12').click(function(){
		$('#kortti_takaa_12').hide();
		$('#kortti_12').show();
	});
	$('#kortti_takaa_13').click(function(){
		$('#kortti_takaa_13').hide();
		$('#kortti_13').show();
	});
	$('#kortti_takaa_14').click(function(){
		$('#kortti_takaa_14').hide();
		$('#kortti_14').show();
	});
	$('#kortti_takaa_15').click(function(){
		$('#kortti_takaa_15').hide();
		$('#kortti_15').show();
	});
	$('#kortti_takaa_16').click(function(){
		$('#kortti_takaa_16').hide();
		$('#kortti_16').show();
	});
	
	$('#kortti_1').click(function(){
		$('#kortti_1').hide();
		$('#kortti_takaa_1').show();
	});
	$('#kortti_2').click(function(){
		$('#kortti_2').hide();
		$('#kortti_takaa_2').show();
	});
	$('#kortti_3').click(function(){
		$('#kortti_3').hide();
		$('#kortti_takaa_3').show();
	});
	$('#kortti_4').click(function(){
		$('#kortti_4').hide();
		$('#kortti_takaa_4').show();
	});
	$('#kortti_5').click(function(){
		$('#kortti_5').hide();
		$('#kortti_takaa_5').show();
	});
	$('#kortti_6').click(function(){
		$('#kortti_6').hide();
		$('#kortti_takaa_6').show();
	});
	$('#kortti_7').click(function(){
		$('#kortti_7').hide();
		$('#kortti_takaa_7').show();
	});
	$('#kortti_8').click(function(){
		$('#kortti_8').hide();
		$('#kortti_takaa_8').show();
	});
	$('#kortti_9').click(function(){
		$('#kortti_9').hide();
		$('#kortti_takaa_9').show();
	});
	$('#kortti_10').click(function(){
		$('#kortti_10').hide();
		$('#kortti_takaa_10').show();
	});
	$('#kortti_11').click(function(){
		$('#kortti_11').hide();
		$('#kortti_takaa_11').show();
	});
	$('#kortti_12').click(function(){
		$('#kortti_12').hide();
		$('#kortti_takaa_12').show();
	});
	$('#kortti_13').click(function(){
		$('#kortti_13').hide();
		$('#kortti_takaa_13').show();
	});
	$('#kortti_14').click(function(){
		$('#kortti_14').hide();
		$('#kortti_takaa_14').show();
	});
	$('#kortti_15').click(function(){
		$('#kortti_15').hide();
		$('#kortti_takaa_15').show();
	});
	$('#kortti_16').click(function(){
		$('#kortti_16').hide();
		$('#kortti_takaa_16').show();
	});

	
	
});
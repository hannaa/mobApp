$(document).ready(function(){

/****************************** aloitusruutu ************************************************/

	// piilottaa pelielementit sis‰lt‰v‰n divin, kun sivu avautuu:
	$('#game_screen').hide(); 				
	
	// "PLAY!" -painiketta painaessa 
	$('#play_button').click(
		function(){ 
			// piilottaa aloitusruutu-divin ja n‰ytt‰‰ pelielementit sis‰lt‰v‰n divin
			$('#start_screen').hide();
			$('#game_screen').show();
			
			// asettaa laskurin sekunnit ja minuutit nollaksi
			s_time = 0;								
			m_time = 0;	
			
			// asettaa parilaskurin nollaksi ja poistaa parit pistekasasta
			pairs = 0;
			tries = 0;
			$('#points').empty();

			// sekoittaa kortin kuvat (funktio shuffle() lˆytyy alempaa
			shuffle(color);	

			// asettaa sekoitetut kortit pelipˆyt‰‰n
			for(i=0 ; i <= 15; i ++){
				$('#kortti_' + (i+1)).attr('src','kortit/kortti_' + color[i] +'.png');
				$('#kortti_takaa_' + (i+1)).attr('src','kortit/kortti_takaa.png');
			};
			
			//piilottaa korttien etupuolen kuvat sis‰lt‰v‰t divit ja n‰ytt‰‰ kuvat takaa
			for(var i=1;i<=16;i++){
				$('#kortti_' + i).hide();
				$('#kortti_takaa_' + i).show();
			}
		}
	);

/*************************** funktioita ja muuttujia ***************************************/

	// m‰‰ritell‰‰n muuttujat: 
	
		//ajastimen sekunneille ja minuuteille
	var s_time;								
	var m_time;	
	
		// pelilogiikan muuttujat
	var pairs;
	var tries;
	var open_cards = 0;
	var open_1;
	var open_2;
	var closed_1;
	var closed_2;
	var color_1;
	var color_2;
	
		// lis‰t‰‰n kortit (2x jokaista v‰ri‰) muuttujaan 'color'
	var color = [	
		'keltainen',
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
		'vihrea'
	];

	// korttien sekoittamiseen lainattu Fisher-Yates Shuffle -funktio
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
	
	// m‰‰ritell‰‰n ajastin kutsumaan funktiota sekunnin v‰lein
	var timer = setInterval(				
		function(){		
			// joka sekunti s_time kasvaa yhdell‰
			s_time ++;	
			
			// jos molemmat aikamuuttujat alle 10, lis‰‰ kummankin eteen nollan ja kirjoittaa ajastimen paikalle
			if(s_time < 10 && m_time < 10){						 
				$('#timer').text("0" + m_time + ":0" + s_time);
				
			// jos s_time yli 10 ja alle 60, lis‰‰ vain minuuteille nollan eteen, kirjoittaessaan arvot ajastimeen
			}else if(s_time < 60 && m_time < 10){				
				$('#timer').text("0" + m_time + ":" + s_time);
				
			// kun sekunnit ylitt‰v‰t 60, 
			}else{
				// minuuttilaskuri kasvaa yhdell‰ ja sekunttilaskuri nollataan
				m_time ++;					
				s_time = 0;
				
				// minuuttilaskurin saavuttaessa 10 (!lukua muuttamalla peliaika lyhenee)
				if(m_time > 9){		
					// laskuri tyhjennet‰‰n, peli katoaa n‰kyvist‰, ajastimen tilalle "Game over!"
					clearInterval(timer);
					$('.yksi').hide();
					$('.kaksi').hide();
					$('.kolme').hide();
					$('.nelja').hide();
					$('#timer').text("Game over!");
				}
			}
		}
	,
	1000);
	
	// avonaisten korttien j‰ljitt‰j‰ "opener()" kutsutaan kortin tunnuksella klikattaessa
	function opener(key){
		return function(){
				// kortin tunnus (1-16) tallennetaan j‰ljitt‰j‰n muuttujaan
				var o = key;

				// tunnusta vastaavan kortti k‰‰nnet‰‰n
				$('#kortti_takaa_' + o).hide();
				$('#kortti_' + o).show();
				
				// k‰‰nnetty kortti lis‰t‰‰n laskuriin
				open_cards++;

				// ensimm‰isen avatun kortin tiedot tallentuu
				if(open_cards == 1){
					open_1 = $('#kortti_' + o);
					closed_1 = $('#kortti_takaa_' + o);
					color_1 = color[ (o-1) ];
				}
				
				// toisen avatun kortin tiedot tallentuu
				if(open_cards == 2){
					open_2 = $('#kortti_' + o);
					closed_2 = $('#kortti_takaa_' + o);
					color_2 = color[ (o-1) ];
					paired();
				}
				
				//testing:
				console.log('slot: ' +o);
				console.log('open cards: ' +open_cards);
				console.log('pairs: ' + pairs);
				console.log('c1:' +  color_1);
				console.log('c2:' + color_2);
				/*
				console.log('open_1: ' + open_1);
				console.log('open_2: ' + open_2);
				console.log('closed_1: ' + closed_1);
				console.log('closed_2: ' + closed_2);
				*/
				}
	}
	
	
	// parittaja funktio "paired()" tarkistaa ovatko avatut kortit pari
	function paired(){
		tries ++;
		console.log("Try: " + tries);
		
		
		
		// jos kortit vastaavat toisiaan 
		//if(open_1.attr('src') == open_2.attr('src')){
		if(color_1 == color_2){
			// parilaskuri kasvaa yhdell‰
			pairs ++;
			if(pairs==8){
				win();
			}
			// k‰‰nnettyjen korttien laskuri nollataan
			open_cards = 0;
			
			// kutsutaan kuvann‰ytt‰j‰ funktio paria vastaavalla v‰rill‰
			showimage(color_1);
			
			// kortit n‰kyv‰t avoimina 0,7 sekuntia
			var closer = setTimeout(function(){
			
				
				
				// nelj‰ ensimm‰ist‰ paria kasautuvat ensimm‰iseen pinoon
				if(pairs <= 4){
					$('#points').html('<img id="pair_kuva" type="button" src="parit/parit_' + pairs + '.png">');
				
				// parit 5-8 kasautuvat toiseen pinoon				
				}else{
					$('#points').html(
						'<img id="pair_kuva" type="button" src="parit/parit_4.png">'
						+
						'<img id="pair_kuva_2" type="button" src="parit/parit_' + pairs + '.png">'
					);
				};
				
				// kasoihin siirtyv‰t kortit poistuvat pelist‰
				open_1.removeAttr('src');
				open_2.removeAttr('src');
				closed_1.removeAttr('src');
				closed_2.removeAttr('src');
				
				// tyhjennet‰‰n avattujen korttien v‰ritiedot
				color_1 = undefined;
				color_2 = undefined;
			}
			,
			1000);
		
		// jos kortit eiv‰t vastaa toisiaan kortit k‰‰ntyv‰t takaisin 0,7 sekunnin kuluttua
		}else{
			var closer = setTimeout(function(){
				for(var x = 1; x <= 16; x ++){
					$('#kortti_' + x).hide();
					$('#kortti_takaa_' + x).show();
				}
				
				// tyhjennet‰‰n avattujen korttien v‰ritiedot
				color_1 = undefined;
				color_2 = undefined;
			}
			,
			700);
		}
	}
	
	// funktio "showimage()" v‰l‰ytt‰‰ ruudulla saadun parin mukaisen kuvan
	function showimage(color_1){
	
		// m‰‰rittelee annetun v‰rin kuvann‰ytt‰j‰n sis‰iseen muuttujaan
		var c = color_1;
		
		// lis‰‰ peliruutuun paria vastaavan v‰risen kuvan
		$('#game_screen').append('<div id="got_pair"><img id="gp_image" src="parit/pari_' + c + '.png"></div>');
		
		// antaa k‰ytett‰v‰lle diville ja v‰l‰ht‰v‰lle kuvalle css:arvoja
		$("#got_pair").css({
			height: '100%',
			width: '100%',
			position: 'fixed',
			top: 0,
			left: 'auto',
			right: 'auto',
			display: 'none'
			}).show()
		$("#gp_image").css({
			width: '90%',
			left: 'auto',
			right: 'auto',
			top: '10%',
			bottom: '10%',
			display: 'none'
			}).show()
		
		// poistaa kuvadivin sekunnin kuluttua
		setTimeout(function() {
			$("#got_pair").remove();
			}, 
		1500)
	}

/***************************** peliruutu *****************************************************/
	
	// "BACK" -painiketta painettaessa
	$('#back_button').click(
		function(){
			// pelin sis‰lt‰v‰ divi piiloutuu ja aloitusruutu-divi palaa n‰kyviin
			$('#game_screen').hide();
			$('#start_screen').show();

			// asettaa ajastimen tekstin sek‰ sekunti- ja minuuttilaskurin nollille
			$('#timer').text("00:00");
			s_time = 0;
			m_time = 0;
		}
	);
	
	// kortin takakuvaa klikattaessa kutsutaan "opener()", joka vaihtaa takakuvan tilalle etukuvan
	for(var x = 1; x <= 16; x ++){
		$('#kortit').on('click', '#kortti_takaa_' + x, opener(x));
	}

	/*
	else{
		for(var x = 1; x <= 16; x ++){
		$('#kortit').off('click', '#kortti_takaa_' + x, opener(x));
	}
	}
	
	while(open_cards == 2){
	for(var x = 1; x <= 16; x ++){
		$('#kortit').off('click', '#kortti_takaa_' + x, opener(x));
	}
	}
	*/
	
	// klikattaessa korttien alueella mit‰ tahansa, k‰‰ntˆlaskuri on kaksi, se nollaantuu
	$('#kortit').click(
		function(){
			if(open_cards == 2){
				open_cards = 0;
			}
		}
	);
	
/***************************** voitto! *****************************************************/

	function win(){		
		$('#start_screen').show();
		$('#game_screen').hide();

		$.ajax({url:"win.txt",success:function(result){
			$("#win").html(result);
			$('#tries').append(tries + " tries ");
			$('#time').append(m_time + " minutes and " + s_time + " seconds");
		}});
		
	}
});
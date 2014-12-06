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
			
			// asettaa parilaskurin nollaksi
			pairs = 0;

			// sekoittaa kortin kuvat (funktio shuffle() lˆytyy alempaa
			shuffle(color);	

			// asettaa sekoitetut kortit pelipˆyt‰‰n
			for(i=0 ; i <= 15; i ++){
				$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
			};
			
			//piilottaa korttien etupuolen kuvat sis‰lt‰v‰t divit
			for(var i=1;i<=16;i++){
				$('#kortti_' + i).hide(); 		
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
	var open_cards = 0;
	var open_1;
	var open_2;
	var closed_1;
	var closed_2;
	
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
	
		// muuttuja korttien kuvapaikoille, sekoitettavissa
	var random = [16];
	for(i=0; i<=15; i++){
		random[i] = '#kortti_' + (i+1);
	}	
	
		// sekoittaa korttien kuvapaikat
	//shuffle(random);	
	
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
				
				// minuuttilaskurin saavuttaessa 10 
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
				}
				
				// toisen avatun kortin tiedot tallentuu
				if(open_cards == 2){
					open_2 = $('#kortti_' + o);
					closed_2 = $('#kortti_takaa_' + o);
				}
				
				//testing:
				console.log('slot: ' +o);
				console.log('open cards: ' +open_cards);
				console.log('pairs: ' + pairs);
				console.log('open_1: ' + open_1);
				console.log('open_2: ' + open_2);
				console.log('closed_1: ' + closed_1);
				console.log('closed_2: ' + closed_2);
				}
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
	
	// pelitoiminnallisuus
	$('#kortit').click(
		function(){
			if(open_cards == 2){
				open_cards = 0;
				if(open_1.attr('src') == open_2.attr('src')){
					pairs ++;
					var closer = setTimeout(function(){
						if(pairs <= 4){
							$('#points').html('<img id="pair_kuva" type="button" src="parit/parit_' + pairs + '.png">');
						}else{
							$('#points').html(
									'<img id="pair_kuva" type="button" src="parit/parit_4.png">'
									+
									'<img id="pair_kuva_2" type="button" src="parit/parit_' + pairs + '.png">'
							);
						};
						open_1.removeAttr('src');
						open_2.removeAttr('src');
						closed_1.removeAttr('src');
						closed_2.removeAttr('src');
						
					}
					,
					700);
				}else{
					var closer = setTimeout(function(){
						for(var x = 1; x <= 16; x ++){
							$('#kortti_' + x).hide();
							$('#kortti_takaa_' + x).show();
						
						}
					}
					,
					700);
				}
			}
		
		}
	);
	
	// kortin takakuvaa klikattaessa kutsutaan "opener()", joka vaihtaa takakuvan tilalle etukuvan
	$('#kortti_takaa_1').click(opener(1));
	$('#kortti_takaa_2').click(opener(2));
	$('#kortti_takaa_3').click(opener(3));
	$('#kortti_takaa_4').click(opener(4));
	$('#kortti_takaa_5').click(opener(5));
	$('#kortti_takaa_6').click(opener(6));
	$('#kortti_takaa_7').click(opener(7));
	$('#kortti_takaa_8').click(opener(8));
	$('#kortti_takaa_9').click(opener(9));
	$('#kortti_takaa_10').click(opener(10));
	$('#kortti_takaa_11').click(opener(11));
	$('#kortti_takaa_12').click(opener(12));
	$('#kortti_takaa_13').click(opener(13));
	$('#kortti_takaa_14').click(opener(14));
	$('#kortti_takaa_15').click(opener(15));
	$('#kortti_takaa_16').click(opener(16));
});

$(document).ready(function(){
	//ensimmäinen versio: löydä parit! :D

	//aloitusruutu

	$('#game_screen').hide(); 				// piilottaa pelielementit- sisältävän divin
	
	
	
	//peliruutu
	

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
	
	var random = [16];
	for(i=0; i<=15; i++){
		random[i] = '#kortti_' + (i+1);
	}
			
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
		function(){ 							// kun painetaan "play!"-painiketta
			$('#start_screen').hide();			// aloitusruutu-divi piiloutuu
			$('#game_screen').show();			// ja pelielementit sisältävä divi tulevat näkyviin
			s_time = 0;
			m_time = 0;
			shuffle(color);
			for(i=0 ; i <= 15; i ++){
				$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
			};
		 }
	); 
	//shuffle(random);
	
	/*
	for(i=0 ; i <= 15; i ++){
		$(random[i]).hide();
		$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
	};
	*/
	
	
	
	var s_time;								// määritellään muuttuja ajastimen sekunneille
	var m_time;								// määritellään muuttuja ajastimen minuuteille
	var timer = setInterval(				// määritellään ajastin kutsumaan funktiota sekunnin välein
		function(){							
			s_time ++;						// joka sekunti s_time kasvaa yhdellä
			if(s_time < 10 && m_time < 10){						// jos molemmat aikamuuttujat alle 10
				$('#timer').text("0" + m_time + ":0" + s_time);	// lisää kummankin eteen nollan
																// ja kirjoittaa ajastimen paikalle
			}else if(s_time < 60 && m_time < 10){				//jos s_time yli 10 ja alle 60 
				$('#timer').text("0" + m_time + ":" + s_time);	// lisää vain minuuteille nollan eteen
																// kirjoittaessaan arvot ajastimeen
			}else{							// kun sekunnit ylittävät 60  
				m_time ++;					// minuuttilaskuri kasvaa yhdellä
				s_time = 0;					// ja sekunttilaskuri nollataan
				if(m_time > 9){				// minuuttilaskurin saavuttaessa 10 
					clearInterval(timer);	// laskuri tyhjennetään
					$('#kortit').hide();	// peli katoaa näkyvistä
					$('#timer').text("Game over!");				// ajastimen tilalle "Game over!"
				}
			}
		}
	,
	1000);
	
	$('#back_button').click(function(){ 	// kun painetaan "back"-painiketta
		$('#game_screen').hide();			// pelin sisältävä divi piiloutuu
		$('#start_screen').show();			// ja aloitusruutu-divi palaa näkyviin
		$('#timer').text("00:00");			// asettaa näkyvän ajastimen nollaan
		s_time = 0;							// asettaa sekuntilaskurin nollaan
		m_time = 0;							// asettaa minuuttilaskurin nollaan
	});
	
	

	for(var i=1;i<=16;i++){ 				//välillä 1-16 
		$('#kortti_' + i).hide(); 		//piilottaa kaikki korttien etupuolen kuvat sisältävät divit
	}
	
	var pairs = 0;
	$('#kortit').click(
		function(){
			var open_cards = 0;
			var open_1;
			var open_2;
			var closed_1;
			var closed_2;
			
			for (var i = 1; i <= 16; i ++){
				if($('#kortti_' + i).is(':visible')){
					open_cards ++;
					if(open_cards == 1){
						open_1 = $('#kortti_' + i);
					}else{
						open_2 = $('#kortti_' + i);
					}					
				}
				if($('#kortti_takaa_' + i).is(':hidden')){
					if(open_cards == 1){
						closed_1 = $('#kortti_takaa_' + i);
					}else{
						closed_2 = $('#kortti_takaa_' + i);
					}					
				}
			}
			if(open_cards == 2){
				open_cards = 0;
				if(open_1.attr('src') == open_2.attr('src')){
					pairs ++;
					closed_1.removeAttr('src');
					closed_2.removeAttr('src');
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
					}
					,
					700);
				}else{
					var closer = setTimeout(function(){
						for(var x = 1; x <= 16; x ++){
							$(random[x-1]).hide();
							$('#kortti_takaa_' + x).show();
						}
					}
					,
					700);
				}
			}
		
		}
	);
	
	// kortit ovat käännettävissä klikkaamalla:
$('#kortti_takaa_1').click(function(){
		$('#kortti_takaa_1').hide();
		$(random[0]).show();
	});
	$('#kortti_takaa_2').click(function(){
		$('#kortti_takaa_2').hide();
		$(random[1]).show();
	});
	$('#kortti_takaa_3').click(function(){
		$('#kortti_takaa_3').hide();
		$(random[2]).show();
	});
	$('#kortti_takaa_4').click(function(){
		$('#kortti_takaa_4').hide();
		$(random[3]).show();
	});
	$('#kortti_takaa_5').click(function(){
		$('#kortti_takaa_5').hide();
		$(random[4]).show();
	});
	$('#kortti_takaa_6').click(function(){
		$('#kortti_takaa_6').hide();
		$(random[5]).show();
	});
	$('#kortti_takaa_7').click(function(){
		$('#kortti_takaa_7').hide();
		$(random[6]).show();
	});
	$('#kortti_takaa_8').click(function(){
		$('#kortti_takaa_8').hide();
		$(random[7]).show();
	});
		$('#kortti_takaa_9').click(function(){
		$('#kortti_takaa_9').hide();
		$(random[8]).show();
	});
	$('#kortti_takaa_10').click(function(){
		$('#kortti_takaa_10').hide();
		$(random[9]).show();
	});
	$('#kortti_takaa_11').click(function(){
		$('#kortti_takaa_11').hide();
		$(random[10]).show();
	});
	$('#kortti_takaa_12').click(function(){
		$('#kortti_takaa_12').hide();
		$(random[11]).show();
	});
	$('#kortti_takaa_13').click(function(){
		$('#kortti_takaa_13').hide();
		$(random[12]).show();
	});
	$('#kortti_takaa_14').click(function(){
		$('#kortti_takaa_14').hide();
		$(random[13]).show();
	});
	$('#kortti_takaa_15').click(function(){
		$('#kortti_takaa_15').hide();
		$(random[14]).show();
	});
	$('#kortti_takaa_16').click(function(){
		$('#kortti_takaa_16').hide();
		$(random[15]).show();
	});
	
	
	$(random[1]).click(function(){
		$(random[1]).hide();
		$('#kortti_takaa_1').show();
	});
	$(random[2]).click(function(){
		$(random[2]).hide();
		$('#kortti_takaa_2').show();
	});
	$(random[3]).click(function(){
		$(random[3]).hide();
		$('#kortti_takaa_3').show();
	});
	$(random[4]).click(function(){
		$(random[4]).hide();
		$('#kortti_takaa_4').show();
	});
	$(random[5]).click(function(){
		$(random[5]).hide();
		$('#kortti_takaa_5').show();
	});
	$(random[6]).click(function(){
		$(random[6]).hide();
		$('#kortti_takaa_6').show();
	});
	$(random[7]).click(function(){
		$(random[7]).hide();
		$('#kortti_takaa_7').show();
	});
	$(random[8]).click(function(){
		$(random[8]).hide();
		$('#kortti_takaa_8').show();
	});
	
	$(random[9]).click(function(){
		$(random[9]).hide();
		$('#kortti_takaa_9').show();
	});
	$(random[10]).click(function(){
		$(random[10]).hide();
		$('#kortti_takaa_10').show();
	});
	$(random[11]).click(function(){
		$(random[11]).hide();
		$('#kortti_takaa_11').show();
	});
	$(random[12]).click(function(){
		$(random[12]).hide();
		$('#kortti_takaa_12').show();
	});
	$(random[13]).click(function(){
		$(random[13]).hide();
		$('#kortti_takaa_13').show();
	});
	$(random[14]).click(function(){
		$(random[14]).hide();
		$('#kortti_takaa_14').show();
	});
	$(random[15]).click(function(){
		$(random[15]).hide();
		$('#kortti_takaa_15').show();
	});
	$(random[16]).click(function(){
		$(random[16]).hide();
		$('#kortti_takaa_16').show();
	});
});
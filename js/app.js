$(document).ready(function(){
	//ensimmäinen versio: löydä parit! :D
	
	var random = ['#kortti_1', '#kortti_2', '#kortti_3', '#kortti_4', '#kortti_5', '#kortti_6', '#kortti_7', '#kortti_8']
	
	$('#kortti_1').hide();
	$('#kortti_2').hide();
	$('#kortti_3').hide();
	$('#kortti_4').hide();
	$('#kortti_5').hide();
	$('#kortti_6').hide();
	$('#kortti_7').hide();
	$('#kortti_8').hide();
	
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

	
	
});
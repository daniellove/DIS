// Dropdowns

$(document).on('mouseenter', '.drop', function() {
	$(this).addClass('showing');

	return;
});

$(document).on('mouseleave', '.drop', function() {
	$(this).removeClass('showing');

	return;
});

$(document).on('click', '.drop_options span', function() {
	var ele = $(this);
	var container = ele.closest('.drop');
	var text = ele.text();
	container.find('.selected').text(text);
	container.removeClass('showing');

	if (ele.hasClass('activator')) {
		ele.siblings().each(function() {
			var sib = $(this);
			var rel = $(`.${sib.attr('activates')}`);
			rel.removeClass('showing');
		});

		$(`.${ele.attr('activates')}`).addClass('showing');
	};

	updateCharacter(
		[container.attr('id')],
		[ele.attr('option')]
	);

	return;
});

// Talents
var shiftdown = false
$(document).on('keydown', function(e) {
	if (e['originalEvent']['key'] == 'Shift') shiftdown = true;
	
	return;;
});

$(document).on('keyup', function(e) {
	if (e['originalEvent']['key'] == 'Shift') shiftdown = false;
	
	return;
});

$(document).on('click', '.talent', function(e) {
	e.preventDefault();

	var talent = $(this);
	var tValue = typeof talent.attr('level') != 'undefined' ? +talent.attr('level') : 0;
	var pValue = typeof talent.attr('point') != 'undefined' ? +talent.attr('point') : 0;
	var level = +$('#character_level').text();

	if (shiftdown) {
		if (pValue == 0) return;
		talent.attr('point', pValue - 1);
		talent.attr('level', tValue - 1);
		$('#character_level').text(level - 1);
	} else {
		if (tValue == 3) return;
		talent.attr('point', pValue + 1);
		talent.attr('level', tValue + 1);
		$('#character_level').text(level + 1);
	}

	var t_id = talent.attr('t_id')
		pValue = talent.attr('point')
	processTalent(t_id);
	updateCharacter(
		['character_level', t_id],
		[$('#character_level').text(), pValue]
	);

	return;
});

// Character creation

$('#create_character').on('click', function() {
	$('#character_info').addClass('showing');

	
});
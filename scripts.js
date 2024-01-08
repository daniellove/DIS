console.log(8)

const DROP_OPTIONS = {
	race: {
		Dragonborn: 't_1-1-0',
		Gnome: 't_1-1-0',
		Owlin: 't_1-1-0',

		Elf: 't_1-1-0',
		Halfling: 't_1-1-0',
		Human: 't_1-1-0',

		Dwarf: 't_1-1-0',
		Giant: 't_1-1-0',
		Orc: 't_1-1-0',
	},
	class: {
		Enchanted: '1',
		Agile: '2',
		Heavy: '3',
	}
};

const TALENT_ROWS = 50;
const TALENT_COLS = 30;

$(document).on('click', '.dropdown', function(event) {
	event.stopPropagation();
	var container = $(this).closest('.character_field');
	if (container.find('.drop_options').length > 0) return

	var options = DROP_OPTIONS[$(this).attr('options')];
	container.append(dropOptions(options));
	container.addClass('showingOptions')

	return
});

$(document).on('click', '.drop_options span', function(event) {
	event.stopPropagation();
	var container = $(this).closest('.character_field');
	var input = container.find('input')

	input.value($(this).text());
	input.value('option', $(this).attr('value'));

	processInput(input);
	closeDropOptions();

	return
});

$(document).on('click', closeDropOptions);

$(document).on('click', '.typing', function() {
	console.log('typing');
});

function dropOptions(options) {
	var eles = ['<div class="drop_options">'];
	for (var content in options) {
		var val = options[content];
		var ele = `<span class="option" option="${val}">${content}</span>`;
		eles.push(ele);
	};
	eles.push('</div>');

	return eles.join('\n');
};

function closeDropOptions() {
	$('.showingOptions').removeClass('showingOptions');
	$('.drop_options').remove();

	return
};

function processInput(input) {
	var type = input.attr('options');

	switch (type) {
	case 'race':
		console.log('race selected');
		break;
	case 'class':
		console.log('class selected');
		break;
	};

	return
};

$(function() {
	$('.talent_tree').each(function() {
		var container = $(this)
		container.prepend('<table class="talent_grid"></table>');

		var table = container.children('.talent_grid');
		for (var i = TALENT_ROWS; i > 0; i--) table.append('<tr></tr>');

		var rows = table.children('tr')
		for (var i = TALENT_COLS; i > 0; i--) rows.append('<td></td>');
	});

	$('[pos_x]').each(updateX);
	$('[pos_y]').each(updateY);
	$('[pos_x]').on('change', updateX);
	$('[pos_y]').on('change', updateY);

	function updateX() {
		var pos = +$(this).attr('pos_x');
		var left = 100 / TALENT_COLS * pos;
		$(this).css('left',  `${left}%`)
	};


	function updateY() {
		var pos = +$(this).attr('pos_y');
		var left = 100 / TALENT_ROWS * pos;
		$(this).css('top',  `${left}%`)
	};
});
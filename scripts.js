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

const TREE_LINES = {
	str: {
		horz: [],
		vert: [],
	
	},
	dex: {
		horz: [],
		vert: [],
	
	},
	int: {
		horz: [
			'12:3-11', // sorcery tree
			'12:19-27', // curses tree
		],
		vert: [
			'12-19:3', '5-19:7', '12-19:11', // sorcery tree
			'12-19:19', '5-19:23', '12-19:27', // curses tree
			'31-39:5', '31-45:7', // defences tree
			'31-39:23', '31-45:25', // defences tree
		],
	},
};

const TALENT_ROWS = 50;
const TALENT_COLS = 60;

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

	for (var stat in TREE_LINES) {
		var container = $(`#${stat}_talents .talent_grid`);

		var horz = TREE_LINES[stat]['horz'];
		for (var data of horz) {
			var d = data.split(':');
			var r = d[0] - 1;
			var row = $(container.children('tr')[+r]);
			var c = d[1].split('-');
			for (var i = +c[0]; i < +c[1]; i++) {
				var cell = $(row.children('td')[i]);
				cell.addClass('horz');
			}
		};

		var vert = TREE_LINES[stat]['vert'];
		for (var data of vert) {
			var d = data.split(':');
			var r = d[0].split('-');
			var col = d[1] - 1;
			for (var i = + r[0]; i <= r[1]; i++) {
				var row = $(container.children('tr')[i]);
				var cell = $(row.children('td')[col]);
				cell.addClass('vert');
			}
		};
	};

	$('[pos_x]').each(function () {
		var pos = +$(this).attr('pos_x');
		var left = 100 / TALENT_COLS * (pos * 2);
		$(this).css('left',  `${left}%`)
	});

	$('[pos_y]').each(function () {
		var pos = +$(this).attr('pos_y');
		var left = 100 / TALENT_ROWS * pos;
		$(this).css('top',  `${left}%`)
	});
});
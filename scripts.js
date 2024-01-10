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
			'12:6-22', // sorcery tree
			'12:38-54', // curses tree
		],
		vert: [
			'7-9:14', '12-18:6', '14-18:14', '12-18:22', // sorcery tree
			'7-9:46', '12-18:38', '14-18:46', '12-18:54', // curses tree
			'31-39:10', '31-45:14', // defences tree
			'31-39:46', '31-45:50', // defences tree
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

	// for (var stat in TREE_LINES) {
	// 	var container = $(`#${stat}_talents .talent_grid`);

	// 	var horz = TREE_LINES[stat]['horz'];
	// 	for (var data of horz) {
	// 		var d = data.split(':');
	// 		var r = d[0] - 1;
	// 		var row = $(container.children('tr')[+r]);
	// 		var c = d[1].split('-');
	// 		for (var i = +c[0]; i < +c[1]; i++) {
	// 			var cell = $(row.children('td')[i]);
	// 			cell.addClass('horz');
	// 		}
	// 	};

	// 	var vert = TREE_LINES[stat]['vert'];
	// 	for (var data of vert) {
	// 		var d = data.split(':');
	// 		var r = d[0].split('-');
	// 		var col = d[1] - 1;
	// 		for (var i = + r[0]; i <= r[1]; i++) {
	// 			var row = $(container.children('tr')[i]);
	// 			var cell = $(row.children('td')[col]);
	// 			cell.addClass('vert');
	// 		}
	// 	};
	// };

});

function populateTalents() {
	for (var row of TALENT_DATA) {
		var container = $(`#${row['talent_tree']}_talents`);
		container.append(rowEle(row));
		positionEle(row)
	};

	return

	function rowEle(row) {
		var t_id = row['talent_id'];
		if (t_id.includes('c')) {
			var ele = `<div join_id="${t_id}"></div>`;
		} else {
			var ele = [
				`<div class="talent" t_id="${row['talent_id']}">`,
					`<i class="talent_icon ${row['talent_icon']}"></i>`,
					`<div class="info">`,
						`<p class="name">${row['talent_name']}</p>`,
						`<p class="desc">${row['talent_description']}</p>`,
					`</div>`,
				`</div>`,
			].join('\n');
		};

		return ele;			
		
	};

	function positionEle(row) {
		var ele = $(`[t_id="${row['t_id']}"]`);
		var left = 100 / TALENT_COLS * row['talent_x'];
		var top = 100 / TALENT_ROWS * row['talent_y'];

		ele.css({
			'left':  `${left}%`,
			'top': `${top}%`,
		});

		return
	};
};
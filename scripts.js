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

	return
});

$(document).on('click', '.tri_activator', function() {
	$('.talent_tree').removeClass('active');
	var tree = $(this).attr('activates');
	$(`#${tree}`).addClass('active');

	return
})

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

function populateTalents() {
	for (var row of TALENT_DATA) {
		var container = $(`#${row['talent_tree']}_talents`);
		var id = row['talent_id'];
		container.append(rowEle(id, row));

		var ele = $(`[t_id="${id}"]`);
		positionEle(container, id, ele, row);
	};

	return

	function rowEle(id, row) {
		if (id.includes('c')) {
			var ele = `<div class="joiner" t_id="${id}"></div>`;
		} else {
			var ele = [
				`<div class="talent" t_id="${row['talent_id']}" requires="${row['requires']}">`,
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

	function positionEle(container, id, ele, row) {
		var left = 100 / TALENT_COLS * row['talent_x'];
		var top = 100 / TALENT_ROWS * row['talent_y'];

		ele.css({
			'left':  `${left}%`,
			'top': `${top}%`,
		});

		if (row['connects_to'] === 'FALSE') return
		var connections = row['connects_to'].split(', ')
		var directions = row['connection'].split(', ')
		for (var i in connections) connectEle(container, id, ele, row, connections[i], directions[i]);

		return
	};

	function connectEle(container, id, ele, row, connection, direction) {
		console.log(connection, direction)
		container.append(`<div class="connection" con_from="${id}" con_to="${connection}">`);
		var connectEle = container.children(`[con_from="${id}"]`);
		var relEle = $(`[t_id="${connection}"]`);
		connectEle.addClass(direction);


		switch (direction) {
			case 'left':
				var obj = leftObj();
				break;
			case 'right':
				var obj = rightObj();
				break;
			case 'top':
				var obj = topObj();
				break;
		};

		connectEle.css(obj);

		return

		function leftObj() {

			var left = +relEle.css('left').replace('px', '');
				left = left + relEle.outerWidth(true) / 2;
				left = left / container.width() * 100;
				left = Math.round(left * 10) / 10

			var top = +relEle.css('top').replace('px', '');
				top = top / container.height() * 100;
				top = Math.round(top * 10) / 10

			var right = +ele.css('left').replace('px', '');
				right = right - ele.outerWidth(true) / 2;
				right = right / container.width() * 100;
				right = 100 - right;
				right = Math.round(right * 10) / 10

			var obj = {
				left: `calc(${left}% - 1px)`,
				top: `calc(${top}% - 1px)`,
				right: `calc(${right}% - 1px)`,
			}

			return obj;
		};

		function rightObj() {

			var left = +ele.css('left').replace('px', '');
				left = left + ele.outerWidth(true) / 2;
				left = left / container.width() * 100;
				left = Math.round(left * 10) / 10

			var top = +ele.css('top').replace('px', '');
				top = top / container.height() * 100;
				top = Math.round(top * 10) / 10

			var right = +relEle.css('left').replace('px', '');
				right = right - relEle.outerWidth(true) / 2;
				right = right / container.width() * 100;
				right = 100 - right;
				right = Math.round(right * 10) / 10

			var obj = {
				left: `calc(${left}% - 1px)`,
				top: `calc(${top}% - 1px)`,
				right: `calc(${right}% + 0px)`,
			}

			return obj;
		};

		function topObj() {

			var left = +ele.css('left').replace('px', '');
				left = left / container.width() * 100;
				left = Math.round(left * 10) / 10

			var top = +relEle.css('top').replace('px', '');
				top = top + relEle.outerHeight(true) / 2;
				top = top / container.height() * 100;
				top = Math.round(top * 10) / 10

			var bottom = +ele.css('top').replace('px', '');
				bottom = bottom - ele.outerHeight(true) / 2;
				bottom = bottom / container.height() * 100;
				bottom = 100 - bottom;
				bottom = Math.round(bottom * 10) / 10

			var obj = {
				left: `calc(${left}% - 1px)`,
				top: `calc(${top}% - 1px)`,
				bottom: `calc(${bottom}% - 1px)`,
			}

			return obj;
		};

	};
};
console.log(6)

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

const LEVEL_DATA = {
	{level:1, cost: 1}, {level:2, cost: 2}, {level:3, cost: 3}, {level:4, cost: 4}, {level:5, cost: 6}, {level:6, cost: 8}, {level:7, cost: 12},
	{level:8, cost: 15}, {level:9, cost: 20}, {level:10, cost: 26}, {level:11, cost: 33}, {level:12, cost: 43}, {level:13, cost: 55}, {level:14, cost: 72}, {level:15, cost: 93}, {level:16, cost: 121},
	{level:17, cost: 145}, {level:18, cost: 174}, {level:19, cost: 209}, {level:20, cost: 251}, {level:21, cost: 301}, {level:22, cost: 361}, {level:23, cost: 433}, {level:24, cost: 520}, {level:25, cost: 624},
	{level:26, cost: 717}, {level:27, cost: 825}, {level:28, cost: 948}, {level:29, cost: 1091}, {level:30, cost: 1254}, {level:31, cost: 1442}, {level:32, cost: 1658}, {level:33, cost: 1907},
	{level:34, cost: 2145}, {level:35, cost: 2413}, {level:36, cost: 2715}, {level:37, cost: 3054}, {level:38, cost: 3436}, {level:39, cost: 3866}, {level:40, cost: 4349}, {level:41, cost: 4892}, {level:42, cost: 5504},
}

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
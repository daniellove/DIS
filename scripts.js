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
console.log(5)

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

$(document).on('click', '.dropdown', function(e) {
	e.stopPropagation()
	var options = DROP_OPTIONS[$(this).attr('options')];
	$(this).closest('.character_field').append(dropOptions(options));
});

$(document).on('click', function() {
	$('.drop_options').remove();
});

$(document).on('click', '.typing', function() {
	console.log('typing');
});

function dropOptions(options) {
	var eles = ['<div class="drop_options">'];
	for (var content in options) {
		var val = options[content];
		var ele = `<span class="option" value="${val}">${content}<span>`;
		eles.push(ele);
	};
	eles.push('</div>');

	return eles.join('\n');
};
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

	updateCharacter(container.attr('id'), ele.attr('option'));

	return;
});

// Talents

$(document).on('click', '.talent', function(e) {
	
});
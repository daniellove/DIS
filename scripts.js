const TALENT_ROWS = 50;
const TALENT_COLS = 60;

function updateCharacter(cols, data) {
	console.log('sending');
	console.log(cols);
	console.log(data);
	return;
};

function processTalent(t_id) {
	console.log('applying changes from ' + t_id);
	return;
};

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

	$(window).on('resize', function() {
		$('.connection').each(function() {
			var connector = $(this);
			var ele = connector.attr('con_from');
				ele = $(`[t_id="${ele}"]`);
			var relEle = connector.attr('con_to');
				relEle = $(`[t_id="${relEle}"]`);

			var container = connector.closest('.talent_tree');
			positionConnector(container, ele, relEle, connector);
		});

		return
	});

	return

	function rowEle(id, row) {
		if (id.includes('c')) {
			var ele = `<div class="joiner" t_id="${id}"></div>`;
			return ele;	
		};
		
		var desc = processDescription(row);
		var ele = [
			`<div class="talent" t_id="${row['talent_id']}" requires="${row['requires']}">`,
				`<i class="talent_icon ${row['talent_icon']}"></i>`,
				`<div class="info">`,
					`<p class="name">${row['talent_name']}</p>`,
					`<p class="desc">${desc}</p>`,
				`</div>`,
			`</div>`,
		].join('\n');

		return ele;			
	};

	function processDescription(row) {
		var desc = row['talent_description'];
		// console.log(row)
		if (desc.includes('{stat}')) {
			desc = desc.split('{stat}');
			var stats = row['stat_effected'].split(', ');
			for (var i = desc.length - 1; i > 0; i--) {
				var statLast = stats.length - 1;
				var string = `<span class="desc_stat">${stats[statLast]}</span>`;
				stats.splice(statLast, 1);
				desc.splice(i, 0, string);
			}
			desc = desc.join('');
		};
		if (desc.includes('{effect}')) {
			desc = desc.split('{effect}');
			var allEffects = [];
			for (var i = 1; i <= 3; i++) {
				var effects = row[`effect_${i}`].toString().split(', ');
				for (var j in effects) {
					var effectEle = `<span class="effects" tier="${i}">${effects[j]}</span>`;
					if (typeof allEffects[j] == 'undefined') {
						allEffects[j] = effectEle;
					} else allEffects[j] = allEffects[j] + ' / ' + effectEle;
				};
			};
			for (var i in allEffects) allEffects[i] = `( ${allEffects[i]} )`;
			for (var i = desc.length - 1; i > 0; i--) {
				var effectLast = allEffects.length - 1;
				var string = allEffects[effectLast];
				allEffects.splice(effectLast, 1);
				desc.splice(i, 0, string);
			}
			desc = desc.join('');
		};

		return desc;
	};

	function positionEle(container, id, ele, row) {
		var left = 100 / TALENT_COLS * row['talent_x'];
		var top = 100 / TALENT_ROWS * row['talent_y'];

		ele.css({
			'left':  `${left}%`,
			'top': `${top}%`,
		});

		if (row['connects_to'] === 'FALSE') return
		var rel_ids = row['connects_to'].split(', ')
		var dirs = row['connection'].split(', ')
		for (var i in rel_ids) connectEle(container, id, ele, row, rel_ids[i], dirs[i]);

		return
	};

	function connectEle(container, id, ele, row, rel_id, dir) {
		container.append(`<div class="connection" con_from="${id}" con_to="${rel_id}">`);
		var connector = container.children(`[con_from="${id}"][con_to="${rel_id}"]`);
		var relEle = $(`[t_id="${rel_id}"]`);
		connector.addClass(dir);

		positionConnector(container, ele, relEle, connector);

		return
	};
};

function positionConnector(container, ele, relEle, connector) {

	switch (true) {
		case connector.hasClass('left'):
			var obj = leftObj();
			break;
		case connector.hasClass('right'):
			var obj = rightObj();
			break;
		case connector.hasClass('top'):
			var obj = topObj();
			break;
	};

	connector.css(obj);

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

}
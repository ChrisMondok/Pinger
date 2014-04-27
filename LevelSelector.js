function makeLevelTable() {
	var i;

	var tbody = document.getElementsByTagName('tbody')[0];

	while(tbody.firstChild)
		tbody.removeChild(tbody.firstChild);

	var scores = JSON.parse(localStorage.getItem('scores')) || {};

	var locked = false;
	var total = 0;

	for(i = 0; i < levels.length; i++) {
		var level = levels[i];
		var row = document.createElement('tr');

		var levelNumber = document.createElement('td');
		levelNumber.innerHTML = i + 1;
		row.appendChild(levelNumber)

		var levelName = document.createElement('td');
		row.appendChild(levelName);

		var btn = document.createElement('button');
		btn.disabled = locked;
		btn.innerHTML = level.name;
		btn.addEventListener('click', startLevel.bind(window, level));

		levelName.appendChild(btn);

		var scoreCell = document.createElement('td');
		var score = scores[level.name] || null;
		scoreCell.innerHTML = score || '';
		if(score === null)
			locked = true;
		else
			total += score;
		row.appendChild(scoreCell);

		tbody.appendChild(row);
	}

	if(!locked) {
		var finalRow = document.createElement('tr');
		var l = document.createElement('td');
		l.innerHTML = 'Total';

		finalRow.appendChild(document.createElement('td'));
		finalRow.appendChild(l);

		var r = document.createElement('td');
		r.innerHTML = total;
		finalRow.appendChild(r);

		tbody.appendChild(finalRow);
	}
}

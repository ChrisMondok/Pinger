function makeLevelTable() {
	var table = document.getElementsByTagName('table')[0];

	var scores = JSON.parse(localStorage.getItem('scores')) || [];

	for(var i = 0; i < levels.length; i++) {
		var level = levels[i];
		var row = document.createElement('tr');
		var levelName = document.createElement('td');
		row.appendChild(levelName);

		var btn = document.createElement('button');
		btn.innerHTML = level.name;
		btn.addEventListener('click', startLevel.bind(window, level));

		levelName.appendChild(btn);

		var scoreCell = document.createElement('td');
		scoreCell.innerHTML = scores[i] || '';
		row.appendChild(scoreCell);

		table.appendChild(row);

	}
}

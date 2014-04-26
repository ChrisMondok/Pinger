function makeLevelTable() {
	var table = document.getElementsByTagName('table')[0];

	var scores = JSON.parse(localStorage.getItem('scores')) || [];

	for(var i = 0; i < levels.length; i++) {
		var row = document.createElement('tr');
		var levelName = document.createElement('td');
		levelName.innerHTML = 'Level '+i+1;
		row.appendChild(levelName);

		var scoreCell = document.createElement('td');
		scoreCell.innerHTML = scores[i] || '';
		row.appendChild(scoreCell);

		table.appendChild(row);
	}
}

var teams = EC_teams.data
selected_keys = ['int_weight', 'int_overall_rating', 'int_potential_rating', 'int_best_overall_rating']
possibles_keys = [ 'int_height', 'int_weight', 'int_overall_rating', 'int_potential_rating', 'int_best_overall_rating', 'int_finishing','int_heading_accuracy', 'int_short_passing', 'int_volleys', 'int_defensive_awareness', 'int_standing_tackle', 'int_sliding_tackle','int_diving', 'int_handling', 'int_kicking']
		
function FCapitalize(s) {
	  if (typeof s !== 'string') return ''
	  return s.charAt(0).toUpperCase() + s.slice(1)
	}

	function pretty_writing(str){
		return FCapitalize(str.substring(4)).replaceAll('_' ,' ') 
	}


	// Dataset are teams data 
	function get_values(dataset, list_keys){ 
		values = []
		for(var k in dataset){
			if (list_keys.includes(k)) {
				values.push(dataset[k])
			}
		}
		return values 
	}


	function get_labels(dataset, list_keys){
		labels = []
		for(var k in dataset){
			if (list_keys.includes(k)) {
				labels.push(pretty_writing(k));
			}
		}
		return labels 
	}


	function get_team(team_name){
		found_team = null 
			teams.forEach((team) => {
				if (team.team_name == team_name){
					found_team = team
				}	
	    })
	    return found_team
	}


	document.addEventListener("DOMContentLoaded", function(event) { 

	dic_to_pretty = {}
	dic_to_ugly = {}
	for (var s in possibles_keys){
		pretty = pretty_writing(possibles_keys[s])
		dic_to_pretty[possibles_keys[s]] = pretty;
		dic_to_ugly[pretty] = possibles_keys[s];
	}

	
	buttons_labels = get_labels(team1average[0], possibles_keys)
	labels = get_labels(team1average[0], selected_keys)
	var ctx = document.getElementById('radarchart-team1').getContext('2d');
	ctx.height = 500;
	var myChart = new Chart(ctx, {
	  type: 'radar',
	  data: {
	      labels: labels,
	      datasets: [
	      {
	          label: team2.team_name,
	          name: "t1",
	          data: get_values(team2average[0], selected_keys),
	          backgroundColor: [
	              'rgba(255, 99, 132,0.2)'
	          ],
	          borderColor: [
	              'rgba(255, 99, 132, 1)'
	          ],
	          borderWidth: 1
	      }
	      ]
	  },
	  options: {
	    responsive: true,
    	maintainAspectRatio: false
	  }
	});

var ctx = document.getElementById('radarchart-team2').getContext('2d');
	ctx.height = 500;
	var myChart = new Chart(ctx, {
	  type: 'radar',
	  data: {
	      labels: labels,
	      datasets: [{
	          label: team1.team_name,
	          name: "t2",
	          data: get_values(team1average[0], selected_keys),
	          backgroundColor: [
	              'rgba(75, 192, 192, 0.2)'
	          ],
	          borderColor: [
	              'rgba(75, 192, 192, 1)'
	          ],
	          borderWidth: 1
	      }
	      ]
	  },
	  options: {
	    responsive: true,
    	maintainAspectRatio: false
	  }
	});


var ctx = document.getElementById('myChart').getContext('2d');
	ctx.height = 500;
	var myChart = new Chart(ctx, {
	  type: 'radar',
	  data: {
	      labels: labels,
	      datasets: [{
	          label: team1.team_name,
	          name: "t2",
	          data: get_values(team1average[0], selected_keys),
	          backgroundColor: [
	              'rgba(75, 192, 192, 0.2)'
	          ],
	          borderColor: [
	              'rgba(75, 192, 192, 1)'
	          ],
	          borderWidth: 1
	      },
	      {
	          label: team2.team_name,
	          name: "t1",
	          data: get_values(team2average[0], selected_keys),
	          backgroundColor: [
	              'rgba(255, 99, 132,0.2)'
	          ],
	          borderColor: [
	              'rgba(255, 99, 132, 1)'
	          ],
	          borderWidth: 1
	      }
	      ]
	  },
	  options: {
	    responsive: true,
    	maintainAspectRatio: false
	  }
	});

		function addData(chart, label, data) {
	    chart.data.labels.push(label);
	    var i = 0
	    chart.data.datasets.forEach((dataset) => {

	    	dataset.data.push(data[i]);
	    	i++;
	    });
	    chart.update();
	}

	function removeData(chart, label) {
    index = chart.data.labels.indexOf(label)
    chart.data.labels = arrayRemove(chart.data.labels, chart.data.labels[index]);
    chart.data.datasets.forEach((dataset) => {
    	console.log(dataset.data)
    	console.log(index)
      dataset.data = arrayRemove(dataset.data, dataset.data[index]);
      console.log(dataset.data)
    });
    chart.update();
}

	function arrayRemove(arr, value) { 

	  return arr.filter(function(ele){ 
	      return ele != value; 
	  });
	}

	function alerted(s){
		console.log(s)
		str = dic_to_ugly[s]
		console.log(str)
		if (selected_keys.includes(str)){
			selected_keys = arrayRemove(selected_keys, str)
			removeData(myChart, s)
			console.log(myChart)

		}
		else { 
			selected_keys.push(str)
			addData(myChart, s, [team1.averages[0][str], team2.averages[0][str]])	
		}
		myChart.update();
		
	}

  var buttonsWanted = buttons_labels.length;
  var doc = document;
  var docFrag = document.createDocumentFragment();
  var showbutton = false

  if(showbutton){
	  for(var x = 0; x < buttonsWanted; x++){
	    var button = doc.createElement('button');
	    console.log(labels[x])
	    button.setAttribute("id", buttons_labels[x]);
	    button.setAttribute("type", "button");
	    button.setAttribute("value", buttons_labels[x]);

	    var tag = document.createElement("p");
	    var text = document.createTextNode(buttons_labels[x]);
	    tag.appendChild(text);
	    button.appendChild(tag);

	    button.addEventListener("click", function() {
			    alerted(this.value);
			}, false);

	    docFrag.appendChild(button);
	  }

	  doc.getElementById('container').appendChild(docFrag);
	}


});
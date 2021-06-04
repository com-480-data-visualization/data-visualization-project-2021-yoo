var teams = EC_teams.data
selected_keys = ['int_overall_rating', 'int_short_passing', 'int_defensive_awareness']
possibles_keys = ['int_age', 'int_overall_rating', 'int_finishing','int_heading_accuracy', 'int_short_passing', 'int_volleys', 'int_defensive_awareness', 'int_standing_tackle', 'int_sliding_tackle','int_diving', 'int_handling', 'int_kicking']

let strategy = 'cros'
let first_team = 'Germany'
let second_team = 'France'

let att_team = first_team
let def_team = second_team

let first_color = 'red'
let second_color = 'blue'

const flag_map = {
    'Turkey': 'flag-icon-tr',
    'Italy': 'flag-icon-it',
    'Wales': 'flag-icon-gb-wls',
    'Switzerland': 'flag-icon-ch',
    'Denmark': 'flag-icon-dk',
    'Finland': 'flag-icon-fi',
    'Belgium': 'flag-icon-be',
    'Russia': 'flag-icon-ru',
    'Netherlands': 'flag-icon-nl',
    'Ukraine': 'flag-icon-ua',
    'Austria': 'flag-icon-at',
    'North Macedonia': 'flag-icon-mk',
    'England': 'flag-icon-gb',
    'Croatia': 'flag-icon-hr',
    'Czech Republic': 'flag-icon-cz',
    'Scotland': 'flag-icon-gb-sct',
    'Spain': 'flag-icon-es',
    'Sweden': 'flag-icon-se',
    'Poland': 'flag-icon-pl',
    'Slovakia': 'flag-icon-sk',
    'Portugal': 'flag-icon-pt',
    'France': 'flag-icon-fr',
    'Germany': 'flag-icon-de',
    'Hungary': 'flag-icon-hu',

}

const strategy_map = {
    'poss': ['Keeping Possesion', 'Chance creation', 'Scoring'],
    'coat': ['Fast transition', 'One on One', 'Scoring'],
    'hipr': ['Press high', 'Explosive attack', 'Scoring'],
    'cros': ['Crossing', 'Aerial duels', 'Direct shooting'],
    'deba': ['Crossing', 'One on One', 'Long shots']
}


const middlePos = 383
const wid = 767
const hei = 390


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

	function get_team_color(team_name){
		return team_colors[team_name]
	}

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

	function alerted(chart, s){
		console.log(s)
		str = dic_to_ugly[s]
		console.log(str)
		if (selected_keys.includes(str)){
			selected_keys = arrayRemove(selected_keys, str)
			removeData(chart, s)
			console.log(chart)

		}
		else { 
			selected_keys.push(str)
			addData(chart, s, [team_1.averages[0][str], team_2.averages[0][str]])	
		}
		chart.update();
		
	}


	dic_to_pretty = {}
	dic_to_ugly = {}
	for (var s in possibles_keys){
		pretty = pretty_writing(possibles_keys[s])
		dic_to_pretty[possibles_keys[s]] = pretty;
		dic_to_ugly[pretty] = possibles_keys[s];
	}

	




	var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

team_1 = get_team(first_team)
team_2 = get_team(second_team)

buttons_labels = get_labels(team_1.averages[0], possibles_keys)
labels = get_labels(team_1.averages[0], selected_keys)


whenDocumentLoaded(() => {

	 console.log('DOM fully loaded and parsed');


    waitForEl('#radarchart-team2', function(){
	    var ctx_team2 = document.getElementById('radarchart-team2').getContext('2d');
			ctx_team2.height = 500;
			window.radarChartTeam2 = new Chart(ctx_team2, {
		  type: 'radar',
		  data: {
		      labels: labels,
		      datasets: [{
		          label: team_2.team_name,
		          name: "t2",
		          data: get_values(team_2.averages[0], selected_keys),
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
		var buttonsWanted = buttons_labels.length;
		var doc = document;
		var docFrag = document.createDocumentFragment();
		var showbutton = true

		if(showbutton){
		  for(var x = 0; x < buttonsWanted; x++){
		    var button = doc.createElement('button');
		    console.log(labels[x])
		    button.setAttribute("id", buttons_labels[x]);
		    button.setAttribute("type", "button");
		    button.setAttribute("value", buttons_labels[x]);
		    button.setAttribute("class", "btn btn-sm btn-secondary")

		    var tag = document.createElement("p");
		    var text = document.createTextNode(buttons_labels[x]);
		    tag.appendChild(text);
		    button.appendChild(tag);

		    button.addEventListener("click", function() {
				    alerted(window.radarChartTeam2, this.value);
				}, false);

		    docFrag.appendChild(button);
		  }
		  doc.getElementById('radarchart-buttons-second-team').appendChild(docFrag);
		}else {
		  document.addEventListener('DOMContentLoaded', function () {
		      console.log( 'Non' )
		});
	}
	});



    waitForEl('#radarchart-team1', function(){
	    var ctxteam1 = document.getElementById('radarchart-team1').getContext('2d');
	    ctxteam1.height = 500;
	    window.radarChartTeam1 = new Chart(ctxteam1, {
	      type: 'radar',
	      data: {
	          labels: labels,
	          datasets: [
	          {
	              label: team_1.team_name,
	              name: "t1",
	              data: get_values(team_1.averages[0], selected_keys),
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
	    var buttonsWanted = buttons_labels.length;
		var doc = document;
		var docFrag = document.createDocumentFragment();
		var showbutton = true

		if(showbutton){
		  for(var x = 0; x < buttonsWanted; x++){
		    var button = doc.createElement('button');
		    console.log(labels[x])
		    button.setAttribute("id", buttons_labels[x]);
		    button.setAttribute("type", "button");
		    button.setAttribute("value", buttons_labels[x]);
		    button.setAttribute("class", "btn btn-sm btn-secondary")

		    var tag = document.createElement("p");
		    var text = document.createTextNode(buttons_labels[x]);
		    tag.appendChild(text);
		    button.appendChild(tag);

		    button.addEventListener("click", function() {
				    alerted(window.radarChartTeam1, this.value);
				}, false);

		    docFrag.appendChild(button);
		  }
		  doc.getElementById('radarchart-buttons-first-team').appendChild(docFrag);
		}else {
		  document.addEventListener('DOMContentLoaded', function () {
		      console.log( 'Non' )


		  });
		}
	});

    waitForEl('#radarchart-both-team', function(){
	    var ctx = document.getElementById('radarchart-both-team').getContext('2d');
			ctx.height = 500;
			window.radarChartBothTeam = new Chart(ctx, {
			  type: 'radar',
			  data: {
			      labels: labels,
			      datasets: [{
			          label: team_1.team_name,
			          name: "t2",
			          data: get_values(team_1.averages[0], selected_keys),
			          backgroundColor: [
			              'rgba(75, 192, 192, 0.2)'
			          ],
			          borderColor: [
			              'rgba(75, 192, 192, 1)'
			          ],
			          borderWidth: 1
			      },
			      {
			          label: team_2.team_name,
			          name: "t1",
			          data: get_values(team_2.averages[0], selected_keys),
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


		  var buttonsWanted = buttons_labels.length;
		  var doc = document;
		  var docFrag = document.createDocumentFragment();
		  var showbutton = true

		  if(showbutton){
			  for(var x = 0; x < buttonsWanted; x++){
			    var button = doc.createElement('button');
			    console.log(labels[x])
			    button.setAttribute("id", buttons_labels[x]);
			    button.setAttribute("type", "button");
			    button.setAttribute("value", buttons_labels[x]);
			    button.setAttribute("class", "btn btn-sm btn-secondary")

			    var tag = document.createElement("p");
			    var text = document.createTextNode(buttons_labels[x]);
			    tag.appendChild(text);
			    button.appendChild(tag);

			    button.addEventListener("click", function() {
					    alerted(window.radarChartBothTeam, this.value);
					}, false);

			    docFrag.appendChild(button);
			  }
			  doc.getElementById('radarchart-buttons').appendChild(docFrag);
			}else {
			  document.addEventListener('DOMContentLoaded', function () {
			      console.log( 'Non' )


			  });
		}
	});
});

function loadradar_team_1(){
    waitForEl('#radarchart-team1', function(){
    	labels = get_labels(team_1.averages[0], selected_keys)

	    var ctxteam1 = document.getElementById('radarchart-team1').getContext('2d');
	    ctxteam1.height = 500;

	    if(window.radarChartTeam1 != null){
			   window.radarChartTeam1.destroy();
			}	
	    window.radarChartTeam1 = new Chart(ctxteam1, {
	      type: 'radar',
	      data: {
	          labels: labels,
	          datasets: [
	          {
	              label: team_1.team_name,
	              name: "t1",
	              data: get_values(team_1.averages[0], selected_keys),
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
		});
}


function loadradar_team_2(){
	waitForEl('#radarchart-team2', function(){
		labels = get_labels(team_1.averages[0], selected_keys)

	    var ctx_team2 = document.getElementById('radarchart-team2').getContext('2d');
			ctx_team2.height = 500;

			if(window.radarChartTeam2 != null){
			   window.radarChartTeam2.destroy();
			}	

			window.radarChartTeam2 = new Chart(ctx_team2, {
		  type: 'radar',
		  data: {
		      labels: labels,
		      datasets: [{
		          label: team_2.team_name,
		          name: "t2",
		          data: get_values(team_2.averages[0], selected_keys),
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
		
	})
		
};



function loadradar_team_both(){
	waitForEl('#radarchart-both-team', function(){
		labels = get_labels(team_1.averages[0], selected_keys)

	    var ctx = document.getElementById('radarchart-both-team').getContext('2d');
			ctx.height = 500;

			if(window.radarChartBothTeam != null){
			   window.radarChartBothTeam.destroy();
			}	

			window.radarChartBothTeam = new Chart(ctx, {
			  type: 'radar',
			  data: {
			      labels: labels,
			      datasets: [{
			          label: team_1.team_name,
			          name: "t2",
			          data: get_values(team_1.averages[0], selected_keys),
			          backgroundColor: [
			              'rgba(75, 192, 192, 0.2)'
			          ],
			          borderColor: [
			              'rgba(75, 192, 192, 1)'
			          ],
			          borderWidth: 1
			      },
			      {
			          label: team_2.team_name,
			          name: "t1",
			          data: get_values(team_2.averages[0], selected_keys),
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


	});
};


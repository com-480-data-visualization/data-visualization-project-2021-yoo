function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action)
    } else {
        // `DOMContentLoaded` already fired
        action()
    }
}


    let team_par1 = left_team
    let team_par2 = right_team

    var color = d3.scaleOrdinal().domain([team_par1, team_par2]).range(["white", "#3248c8"]);


    // set the dimensions and margins of the graph
  var margin = {top: 66, right: 110, bottom: 500, left: 110 },
    width = document.body.clientWidth - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom,
    innerHeight = height - 2;

  // Define the different types of attributes we want to show in the graph
  var types = {
        "Number": {
        key: "Number",
      coerce: function (d) { return +d; },
      extent: d3.extent,
      within: function (d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
      defaultScale: d3.scaleLinear().range([innerHeight, 0])
    },
    "Team1": {
        key: "String",
      coerce: String,
      extent: function (data) { return data.sort(); },
      within: function (d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
      defaultScale: d3.scalePoint().range([0, innerHeight])
    },
    "Team2": {
        key: "String",
      coerce: String,
      extent: function (data) { return data.sort(); },
      within: function (d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
      defaultScale: d3.scalePoint().range([0, innerHeight])
    },
    "String": {
        key: "String",
      coerce: String,
      extent: function (data) { return data.sort(); },
      within: function (d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
      defaultScale: d3.scalePoint().range([0, innerHeight])
    }
  };

  let mode = 'overall'
  var dimensions = return_dimensions(mode)

  const mode_radio = document.getElementById('comparison_mode')

  let position_filter = 'no_filter'

  const filter_radio = document.getElementById('filter_position')

  mode_radio.addEventListener('click', ({target}) => { // handler fires on root container click
        new_mode = target.htmlFor
    dimensions = return_dimensions(new_mode)
    plot_graph(dimensions, position_filter)
  })


  filter_radio.addEventListener('click', ({target}) => { // handler fires on root container click
        new_filter = target.htmlFor
    console.log(new_filter)
    plot_graph(dimensions, new_filter)
  })


  plot_graph(dimensions, position_filter)



  function plot_graph(dimensions, position_filter) {
    var xscale = d3.scalePoint()
      .domain(d3.range(dimensions.length))
      .range([0, width]);

    var yAxisLeft = d3.axisLeft();
    var yAxisRight = d3.axisRight();

    console.log(d3.select("#my_dataviz").selectAll('div'))
    d3.select("#my_dataviz").selectAll('div').remove()
    var container = d3.select("#my_dataviz").append("div")
      .attr("class", "parcoords")
      .style("width", width + margin.left + margin.right + "px")
      .style("height", height + margin.top + margin.bottom + "px");

    var svg = container.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var canvas = container.append("canvas")
      .attr("width", width * devicePixelRatio)
      .attr("height", height * devicePixelRatio)
      .style("width", width + "px")
      .style("height", height + "px")
      .style("margin-top", margin.top + "px")
      .style("margin-left", margin.left + "px");

    var ctx = canvas.node().getContext("2d");
    ctx.globalCompositeOperation = 'darken';
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = 1.5;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    var axes = svg.selectAll(".axis")
      .data(dimensions)
      .enter().append("g")
      .attr("class", function (d) { return "axis " + d.key.replace(/ /g, "_"); })
      .attr("transform", function (d, i) { return "translate(" + xscale(i) + ")"; });

    d3.json("/website/data/teams_basic_skills.json").then(function (data) {
      var data_filtered
      if (position_filter == 'no_filter') {
        data_filtered = data.filter(x => (x['str_nationality'] == team_par1) | (x['str_nationality'] == team_par2))
    } else {
        const filtered_positions = return_valid_positions(position_filter)
        console.log(filtered_positions)
        data_filtered = data.filter(x => (x['str_nationality'] == team_par1) | (x['str_nationality'] == team_par2)).filter(x => filtered_positions.includes(x['str_best_position']))
      }
      console.log(data_filtered)

      data_filtered.forEach(function (d) {
        dimensions.forEach(function (p) {
            d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);
        });

        // truncate long text strings to fit in data table
        for (var key in d) {
          if (d[key] && d[key].length > 35) d[key] = d[key].slice(0, 36);
        }
      });

      // type/dimension default setting happens here
      dimensions.forEach(function (dim) {
        if (!("domain" in dim)) {
          // detect domain using dimension type's extent function
          if (dim.description == team_par1) {
        dim.domain = d3_functor(dim.type.extent)(data_filtered.filter(x => (x['str_nationality'] == team_par1))
            .map(function (d) { return d[dim.key]; }));
          }
          else if (dim.description == team_par2) {
        dim.domain = d3_functor(dim.type.extent)(data_filtered.filter(x => (x['str_nationality'] == team_par2))
            .map(function (d) { return d[dim.key]; }));
          }
          else {
        dim.domain = d3_functor(dim.type.extent)(data_filtered.map(function (d) { return d[dim.key]; }));
          }

        }
        if (!("scale" in dim)) {
        // use type's default scale for dimension
        dim.scale = dim.type.defaultScale.copy();
        }
        dim.scale.domain(dim.domain);
      });

      var render = renderQueue(draw).rate(5);

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = d3.min([1.15 / Math.pow(data_filtered.length, 0.25), 1]);
      render(data_filtered);

      axes.append("g")
        .each(function (d) {
          if (d.description == team_par2) {
            var renderAxis = "axis" in d
              ? d.axis.scale(d.scale)  // custom axis
              : yAxisRight.scale(d.scale);  // default axis
            d3.select(this).call(renderAxis);
          } else {
            var renderAxis = "axis" in d
              ? d.axis.scale(d.scale)  // custom axis
              : yAxisLeft.scale(d.scale);  // default axis
            d3.select(this).call(renderAxis);
          }
        })
        .append("text")
        .attr("class", "title")
        .attr("text-anchor", "start")
        .text(function (d) { return "description" in d ? d.description : d.key; });

      // Add and store a brush for each axis.
      axes.append("g")
        .attr("class", "brush")
        .each(function (d) {
        d3.select(this).call(d.brush = d3.brushY()
            .extent([[-10, 0], [10, height]])
            .on("start", brushstart)
            .on("brush", brush)
            .on("end", brush)
        )
    })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

      d3.selectAll(".axis.Name.tick text")
        .style("fill", color);


      function project(d) {
        return dimensions.map(function (p, i) {
          // check if data element has property and contains a value
          if (
            !(p.key in d) ||
            d[p.key] === null
          ) return null;

          return [xscale(i), p.scale(d[p.key])];
        });
      };

      function draw(d) {
        ctx.strokeStyle = color(d.str_nationality);
        ctx.lineWidth = 3;
        ctx.beginPath();
        var coords = project(d);
        coords.forEach(function (p, i) {
          // this tricky bit avoids rendering null values as 0
          if (p === null) {
            // this bit renders horizontal lines on the previous/next
            // dimensions, so that sandwiched null values are visible
            if (i > 0) {
              var prev = coords[i - 1];
              if (prev !== null) {
        ctx.moveTo(prev[0], prev[1]);
                ctx.lineTo(prev[0] + 6, prev[1]);
              }
            }
            if (i < coords.length - 1) {
              var next = coords[i + 1];
              if (next !== null) {
        ctx.moveTo(next[0] - 6, next[1]);
              }
            }
            return;
          }

          if (i == 0) {
        ctx.moveTo(p[0], p[1]);
            return;
          }

          ctx.lineTo(p[0], p[1]);
        });
        ctx.stroke();
      };

      function brushstart() {
        d3.event.sourceEvent.stopPropagation();
      }

      // Handles a brush event, toggling the display of foreground lines.
      function brush() {
        render.invalidate();

        var actives = [];
        svg.selectAll(".axis .brush")
          .filter(function (d) {
            return d3.brushSelection(this);
          })
          .each(function (d) {
        actives.push({
            dimension: d,
            extent: d3.brushSelection(this)
        });
          });
        var selected = data_filtered.filter(function (d) {
          if (actives.every(function (active) {
            var dim = active.dimension;
            if ((dim.description == team_par1) & (d['str_nationality'] == team_par2)) {
              return true
            }
            if ((dim.description == team_par2) & (d['str_nationality'] == team_par1)) {
              return true
            }
            // test if point is within extents for each active brush
            return dim.type.within(d[dim.key], active.extent, dim);
          })) {
            return true;
          }
        });

        // show ticks for active brush dimensions
        // and filter ticks to only those within brush extents

        svg.selectAll(".axis")
          .filter(function (d) {
            return actives.indexOf(d) > -1 ? true : false;
          })
          .classed("active_brush", true)
          .each(function (dimension, i) {
            var extent = extents[i];
            d3.select(this)
              .selectAll(".tick text")
              .style("display", function (d) {
                var value = dimension.type.coerce(d);
                return dimension.type.within(value, extent, dimension) ? null : "none";
              });
          });

        // reset dimensions without active brushes
        svg.selectAll(".axis")
          .filter(function (d) {
            return actives.indexOf(d) > -1 ? false : true;
          })
          .classed("active_brush", false)
          .selectAll(".tick text")
          .style("display", null);


        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = d3.min([0.85 / Math.pow(selected.length, 0.3), 1]);
        render(selected);

      };


    });
  }

  function return_valid_positions(position_filter) {
    if (position_filter == 'filter_attack') {
      return ['ST', 'CF', 'LW', 'RW', 'LM', 'RM']
    }
    if (position_filter == 'filter_middlefield') {
      return ['CDM', 'CM', 'CAM']
    }
    if (position_filter == 'filter_defense') {
      return ['CB', 'LB', 'RB', 'RWB', 'LWB']
    }
    if (position_filter == 'filter_goalkeeper') {
      return ['GK']
    }

  }

  function return_dimensions(mode) {

    if (mode == 'overall') {
      var dimensions = [
        {
        key: "str_player_name",
          description: team_par1,
          type: types["Team1"]
        },
        {
        key: "age",
          description: "Age",
          type: types["Number"]
        },
        {
        key: "int_height",
          description: "Height",
          type: types["Number"]
        },
        {
        key: "int_overall_rating",
          description: "Overall rating",
          type: types["Number"]
        },
        {
        key: "int_aggression",
          description: "Aggression",
          type: types["Number"]
        },
        {
        key: "int_agility",
          description: "Agility",
          type: types["Number"]
        },
        {
        key: "str_player_name",
          description: team_par2,
          type: types["Team2"]
        }
      ];
    }

    else if (mode == 'defense') {
      var dimensions = [
        {
        key: "str_player_name",
          description: team_par1,
          type: types["Team1"]
        },
        {
        key: "int_sliding_tackle",
          description: "Sliding tackle",
          type: types["Number"]
        },
        {
        key: "int_standing_tackle",
          description: "Standing tackle",
          type: types["Number"]
        },
        {
        key: "int_aggression",
          description: "Aggression",
          type: types["Number"]
        },
        {
        key: "int_defensive_awareness",
          description: "Defensive awarness",
          type: types["Number"]
        },
        {
        key: "int_agility",
          description: "Agility",
          type: types["Number"]
        },
        {
        key: "int_interceptions",
          description: "Interceptions",
          type: types["Number"]
        },
        {
        key: "str_player_name",
          description: team_par2,
          type: types["Team2"]
        }
      ];
    }

    else if (mode == 'attack') {
      var dimensions = [
        {
        key: "str_player_name",
          description: team_par1,
          type: types["Team1"]
        },
        {
        key: "int_crossing",
          description: "Crossing",
          type: types["Number"]
        },
        {
        key: "int_finishing",
          description: "Finishing",
          type: types["Number"]
        },
        {
        key: "int_heading_accuracy",
          description: "Heading accuracy",
          type: types["Number"]
        },
        {
        key: "int_volleys",
          description: "Volleys",
          type: types["Number"]
        },
        {
        key: "int_shot_power",
          description: "Shot power",
          type: types["Number"]
        },
        {
        key: "int_long_shots",
          description: "Long shots",
          type: types["Number"]
        },
        {
        key: "str_player_name",
          description: team_par2,
          type: types["Team2"]
        }
      ];
    }

    else if (mode == 'physical') {
      var dimensions = [
        {
        key: "str_player_name",
          description: team_par1,
          type: types["Team1"]
        },
        {
        key: "int_acceleration",
          description: "Acceleration",
          type: types["Number"]
        },
        {
        key: "int_sprint_speed",
          description: "Spring speed",
          type: types["Number"]
        },
        {
        key: "int_agility",
          description: "Agility",
          type: types["Number"]
        },
        {
        key: "int_weight",
          description: "Weight",
          type: types["Number"]
        },
        {
        key: "int_height",
          description: "Height",
          type: types["Number"]
        },
        {
        key: "int_reactions",
          description: "Reactions",
          type: types["Number"]
        },
        {
        key: "int_jumping",
          description: "Jumping",
          type: types["Number"]
        },
        {
        key: "int_balance",
          description: "Balance",
          type: types["Number"]
        },
        {
        key: "int_strength",
          description: "Strenth",
          type: types["Number"]
        },
        {
        key: "str_player_name",
          description: team_par2,
          type: types["Team2"]
        }]
    }
    else if (mode == 'goalkeeping') {
      var dimensions = [
        {
        key: "str_player_name",
          description: team_par1,
          type: types["Team1"]
        },
        {
        key: "int_diving",
          description: "Diving",
          type: types["Number"]
        },
        {
        key: "int_handling",
          description: "Handling",
          type: types["Number"]
        },
        {
        key: "int_kicking",
          description: "Kicking",
          type: types["Number"]
        },
        {
        key: "int_gk_positioning",
          description: "Positioning",
          type: types["Number"]
        },
        {
        key: "int_height",
          description: "Height",
          type: types["Number"]
        },
        {
        key: "int_reactions",
          description: "Reactions",
          type: types["Number"]
        },
        {
        key: "int_reflexes",
          description: "Reflexes",
          type: types["Number"]
        },
        {
        key: "int_jumping",
          description: "Jumping",
          type: types["Number"]
        },
        {
        key: "str_player_name",
          description: team_par2,
          type: types["Team2"]
        }
      ];

    }
    return dimensions
  }

  function d3_functor(v) {
    return typeof v === "function" ? v : function () { return v; };
  };

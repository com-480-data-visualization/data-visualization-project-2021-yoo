let strategy = 'cros'
let first_team = 'Germany'
let second_team = 'France'

let att_team = first_team
let def_team = second_team

let first_color = 'red'
let second_color = 'blue'

const middlePos = 383
const wid = 767
const hei = 390

function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action)
    } else {
        // `DOMContentLoaded` already fired
        action()
    }
}

function showFootballPitch(container_element) {

    let linecolour = "#ffffff"
    let fillcolour = "#A1C349"

    let holder = d3.select(container_element) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("id", "pitch_canvas")
        .attr("width", 767)
        .attr("height", 390)

    // Total Grass    
    holder.append("rect")        // attach a rectangle
        .attr("x", 0)         // position the left of the rectangle
        .attr("y", 0)          // position the top of the rectangle
        .attr("height", 390)    // set the height
        .attr("width", 767)    // set the width
        .style("fill", fillcolour)   // set the fill colour    

    // draw a rectangle pitch outline    
    holder.append("rect")        // attach a rectangle
        .attr("x", 33)         // position the left of the rectangle
        .attr("y", 25)          // position the top of the rectangle
        .attr("height", 340)    // set the height
        .attr("width", 700)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)   // set the line colour
        .style("fill", fillcolour)    // set the fill colour     

    // // draw a rectangle - half 1
    holder.append("rect")        // attach a rectangle
        .attr("x", 33)         // position the left of the rectangle
        .attr("y", 25)          // position the top of the rectangle
        .attr("height", 340)    // set the height
        .attr("width", 350)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)   // set the line colour
        .style("fill", "none")    // set the fill colour

    // // draw a rectangle - half 2
    holder.append("rect")        // attach a rectangle
        .attr("x", 383)         // position the left of the rectangle
        .attr("y", 25)          // position the top of the rectangle
        .attr("height", 340)    // set the height
        .attr("width", 350)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour 


    // // draw a circle - center circle
    holder.append("circle")          // attach a circle
        .attr("cx", 383)             // position the x-centre
        .attr("cy", 195)             // position the y-centre
        .attr("r", 45.75)               // set the radius
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)      // set the line colour
        .style("fill", "none")     // set the fill colour


    // draw a rectangle - penalty area 1
    holder.append("rect")        // attach a rectangle
        .attr("x", 33)         // position the left of the rectangle
        .attr("y", 94.25)          // position the top of the rectangle
        .attr("height", 201.5)    // set the height
        .attr("width", 110)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour 


    // // draw a rectangle - penalty area 2
    holder.append("rect")        // attach a rectangle
        .attr("x", 623)         // position the left of the rectangle
        .attr("y", 94.25)          // position the top of the rectangle
        .attr("height", 201.5)    // set the height
        .attr("width", 110)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour 

    // // draw a rectangle - six yard box 1
    holder.append("rect")        // attach a rectangle
        .attr("x", 33)         // position the left of the rectangle
        .attr("y", 149.25)          // position the top of the rectangle
        .attr("height", 91.5)    // set the height
        .attr("width", 36.67)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour 

    // // draw a rectangle - six yard box 2
    holder.append("rect")        // attach a rectangle
        .attr("x", 696.333)         // position the left of the rectangle
        .attr("y", 149.25)          // position the top of the rectangle
        .attr("height", 91.5)    // set the height
        .attr("width", 36.67)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour 

    // // draw a rectangle - goalmouth 1
    holder.append("rect")        // attach a rectangle
        .attr("x", 16.67)         // position the left of the rectangle
        .attr("y", 176.7)          // position the top of the rectangle
        .attr("height", 36.6)    // set the height
        .attr("width", 16.67)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour

    // // draw a rectangle - goalmouth 2
    holder.append("rect")        // attach a rectangle
        .attr("x", 733.333)         // position the left of the rectangle
        .attr("y", 176.7)          // position the top of the rectangle
        .attr("height", 36.6)    // set the height
        .attr("width", 16.67)    // set the width
        .style("stroke-width", 2.5)    // set the stroke width
        .style("stroke", linecolour)    // set the line colour
        .style("fill", "none")    // set the fill colour


    // // draw a circle - penalty spot 1
    holder.append("circle")        // attach a circle
        .attr("cx", 106.667)           // position the x-centre
        .attr("cy", 195)           // position the y-centre
        .attr("r", 2.5)             // set the radius
        .style("fill", linecolour)     // set the fill colour

    // // draw a circle - penalty spot 2
    holder.append("circle")        // attach a circle
        .attr("cx", 660)           // position the x-centre
        .attr("cy", 195)           // position the y-centre
        .attr("r", 2.5)             // set the radius
        .style("fill", linecolour)     // set the fill colour

    // // draw a circle - center spot
    holder.append("circle")        // attach a circle
        .attr("cx", 383.333)           // position the x-centre
        .attr("cy", 195)           // position the y-centre
        .attr("r", 2.5)             // set the radius
        .style("fill", linecolour)     // set the fill colour


    // // penalty box semi-circle 1
    let vis = d3.select(container_element).append("svg")
    let pi = Math.PI

    let arc = d3.arc()
        .innerRadius(44.5)
        .outerRadius(47)
        .startAngle(0.64) //radians
        .endAngle(2.5) //just radians

    let arc2 = d3.arc()
        .innerRadius(44.5)
        .outerRadius(47)
        .startAngle(-0.64) //radians
        .endAngle(-2.5) //just radians
    holder.append("path")
        .attr("d", arc)
        .attr("fill", linecolour)
        .attr("transform", "translate(117,195)")
    holder.append("path")
        .attr("d", arc2)
        .attr("fill", linecolour)
        .attr("transform", "translate(650,195)")
}

function getFirstTeamValue(first_state) {
    sec_att = document.getElementById('secondt-att')
    sec_def = document.getElementById('secondt-def')

    if (first_state === 'att') {
        sec_att.classList.remove('active')
        sec_def.classList.add('active')
        att_team = first_team
        def_team = second_team

    }

    if (first_state === 'def') {
        sec_att.classList.add('active')
        sec_def.classList.remove('active')
        att_team = second_team
        def_team = first_team
    }
}

function getSecondTeamValue(second_state) {
    first_att = document.getElementById('first-att')
    first_def = document.getElementById('first-def')

    if (second_state === 'att') {
        first_att.classList.remove('active')
        first_def.classList.add('active')
        att_team = second_team
        def_team = first_team
    }

    if (second_state === 'def') {
        first_att.classList.add('active')
        first_def.classList.remove('active')
        att_team = first_team
        def_team = second_team
    }
}

function getStrategy(new_strategy) {
    strategy = new_strategy
    const div_shooting = document.getElementById('bars')
    const div_defense = document.getElementById('defenseBar')
    const div_aerial = document.getElementById('aerialBar')
    const div_skills = document.getElementById('skillsBar')
}

function highlightArea(pitch_elem) {
    let holder = d3.select(pitch_elem) // select the 'body' element

    holder.selectAll('.highlight').remove()
    let linecolour = '#9D37E3'
    const rects = []
    let rec1 = {}
    let rec2 = {}
    let rec3 = {}
    switch (strategy) {
        case 'poss':
            rec1 = { x: middlePos - 66.667, y: 25, height: 340, width: 266.667 }
            rects.push(rec1)
            break
        case 'coat':
            rec1 = { x: 598, y: 25, height: 340, width: 133.33 }
            rec2 = { x: 33, y: 25, height: 340, width: 133.33 }
            rects.push(rec1, rec2)
            break
        case 'hipr':
            rec1 = { x: 383, y: 25, height: 340, width: 166.67 }
            rec2 = { x: -145 + wid, y: 125, height: 50, width: 50 }
            rects.push(rec1, rec2)
            break
        case 'cros':
            rec1 = { x: 558, y: 25, height: 340, width: 173.33 }
            rects.push(rec1)
            break
        case 'deba':
            rec1 = { x: 33, y: 25, height: 68, width: 700 }
            rec2 = { x: 33, y: 296.75, height: 68, width: 700 }
            rec3 = { x: 598, y: 25, height: 340, width: 133.33 }
            rects.push(rec1, rec2, rec3)
            break

        default:
            break
    }
    // draw a rectangle - half 1
    rects.forEach((r) => {
        console.log(r)
        holder.append("rect")        // attach a rectangle
            .attr("x", r.x)         // position the left of the rectangle
            .attr("y", r.y)          // position the top of the rectangle
            .attr("height", r.height)    // set the height
            .attr("width", r.width)    // set the width
            .attr("fill-opacity", "0.8")
            .attr("class", "highlight")
            .style("fill", linecolour)    // set the fill colour
    })

    let data = [1, 5]

    let barHeight = 100

    var bar = d3.select("svg")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")" })

    bar.append("rect")
        .attr("width", 100)
        .attr("height", barHeight - 1)

    // bar.append("text")
    //     .attr("x", function (d) { return x(d) - 3 })
    //     .attr("y", barHeight / 2)
    //     .attr("dy", ".35em")
    //     .text(function (d) { return d })

}

function loadPlayers() {
    return $.getJSON('data/teams_basic_skills.json')
        .then(response => {
            return response
        })
}

function stackedBar(bind, data, config) {
    config = {
        f: d3.format('.1f'),
        margin: { top: 2, right: 2, bottom: 2, left: 2 },
        width: 800,
        height: 100,
        barHeight: 10,
        colors: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'],
        ...config
    }
    const { f, margin, width, height, barHeight, colors, total } = config
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    const halfBarHeight = barHeight / 2

    const _data = data

    // set up scales for horizontal placement
    const xScale = d3.scaleLinear()
        .domain([0, total])
        .range([0, w])

    console.log(_data[0].percent)

    let cx = w * _data[0].percent / 100

    d3.select(bind).select('svg').remove()


    // create svg in passed in div
    const selection = d3.select(bind)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // selection.selectAll('rect').remove()
    let r = 15

    let mid_color

    if (_data[0].percent > _data[1].percent)
        mid_color = first_color
    else
        mid_color = second_color

    // stack rect for each data value
    selection.selectAll('rect')
        .data(_data)
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('x', d => xScale(d.cumulative))
        .attr('y', h / 2 - halfBarHeight)
        .attr('height', barHeight)
        .attr('width', d => xScale(d.value))
        .attr("rx", r)								// how much to round corners - to be transitioned below
        .attr("ry", r)								// how much to round corners - to be transitioned below
        .style('fill', (d, i) => colors[i])

    selection.selectAll('circle')
        .data(_data)
        .enter().append('circle')
        .attr("cx", cx)           // position the x-centre
        .attr("cy", (h / 2 - halfBarHeight) + barHeight / 2)           // position the y-centre
        .attr("r", 10)             // set the radius
        .style("fill", mid_color)     // set the fill colour


    // add values on bar
    // selection.selectAll('.text-value')
    //     .data(_data)
    //     .enter().append('text')
    //     .attr('class', 'text-value')
    //     .attr('text-anchor', 'middle')
    //     .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
    //     .attr('y', (h / 2) + 5)
    //     .text(d => d.value)

    // // add some labels for percentages
    // selection.selectAll('.text-percent')
    //     .data(_data)
    //     .enter().append('text')
    //     .attr('class', 'text-percent')
    //     .attr('text-anchor', 'middle')
    //     .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
    //     .attr('y', (h / 2) - (halfBarHeight * 1.1))
    //     .text(d => f(d.percent) + ' %')

    // // add the labels
    // selection.selectAll('.text-label')
    //     .data(_data)
    //     .enter().append('text')
    //     .attr('class', 'text-label')
    //     .attr('text-anchor', 'middle')
    //     .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
    //     .attr('y', (h / 2) + (halfBarHeight * 1.1) + 20)
    //     .style('fill', (d, i) => colors[i])
    //     .text(d => d.label)
}

function getStackedAttributes(elem, countryPlayers, oppositePlayers, con_attrs_pos, opp_attrs_pos) {

    let con_pos_arr = con_attrs_pos['pos']
    countryPlayers = countryPlayers.filter(p => con_pos_arr.includes(p.str_best_position))
    let con_attrs = con_attrs_pos['attr']

    let opp_pos_arr = opp_attrs_pos['pos']
    oppositePlayers = oppositePlayers.filter(p => opp_pos_arr.includes(p.str_best_position))
    let opp_attrs = opp_attrs_pos['attr']

    let shooting = _.map(countryPlayers, p => { let su = 0; _.forEach(con_attrs, attr => su += p[attr]); return su; });
    shooting = (_.sum(shooting) / (countryPlayers.length * 4));
    let oppositeShooting = _.map(oppositePlayers, p => { let su = 0; _.forEach(opp_attrs, attr => su += p[attr]); return su; });
    oppositeShooting = (_.sum(oppositeShooting) / (oppositePlayers.length * 4));

    console.log(shooting, oppositeShooting);
    const totalShooting = shooting + oppositeShooting;
    let percent = d3.scaleLinear()
        .domain([0, totalShooting])
        .range([0, 100])
    const shootingStack = [{
        value: shooting,
        // want the cumulative to prior value (start of rect)
        cumulative: 0,
        label: first_team,
        percent: percent(shooting)
    }, {
        value: oppositeShooting,
        cumulative: shooting,
        label: second_team,
        percent: percent(oppositeShooting)
    }];

    stackedBar(elem, shootingStack, { total: totalShooting });
}

function findAttrsAtt() {
    let firstAttrs
    let secondAttrs
    let thirdAttrs
    switch (strategy) {
        case 'poss': // possession
            firstAttrs = { 'attr': ['int_short_passing', 'int_reactions', 'int_ball_control'], 'pos': ['CDM', 'CM', 'CAM', 'LM', 'RM'] }
            secondAttrs = { 'attr': ['int_vision', 'int_agility', 'int_dribbling'], 'pos': ['CM', 'CAM', 'LM', 'RM', 'LW', 'RW'] }
            thirdAttrs = { 'attr': ['int_positioning', 'int_finishing', 'int_composure'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST'] }
            break
        case 'coat': //counter attack
            firstAttrs = { 'attr': ['int_sprint_speed', 'int_acceleration', 'int_long_passing'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST', 'CAM', 'CM'] }
            secondAttrs = { 'attr': ['int_dribbling', 'int_ball_control', 'int_agility'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST'] }
            thirdAttrs = { 'attr': ['int_positioning', 'int_finishing', 'int_composure'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST'] }
            break
        case 'hipr': // high press
            firstAttrs = { 'attr': ['int_interceptions', 'int_aggression', 'int_standing_tackle'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST', 'CAM', 'CM'] }
            secondAttrs = { 'attr': ['int_dribbling', 'int_vision', 'int_acceleration'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST', 'CAM'] }
            thirdAttrs = { 'attr': ['int_positioning', 'int_finishing', 'int_composure'], 'pos': ['LW', 'RW', 'LF', 'RF', 'CF', 'ST'] }
            break
        case 'cros': // deadball
            firstAttrs = { 'attr': ['int_crossing', 'int_long_passing', 'int_vision'], 'pos': ['CAM', 'CM', 'RM', 'LM'] }
            secondAttrs = { 'attr': ['int_jumping', 'int_strength', 'int_heading_accuracy'], 'pos': ['ST', 'CB', 'CF', 'LW', 'RW'] }
            thirdAttrs = { 'attr': ['int_fk_accuracy', 'int_curve', 'int_shot_power'], 'pos': ['CAM', 'CM', 'RW', 'LW', 'LM', 'RM'] }
            break
        case 'deba': // wing play
            firstAttrs = { 'attr': ['int_crossing', 'int_long_passing', 'int_vision'], 'pos': ['LB', 'RB', 'LWB', 'RWB', 'LM', 'RM', 'LW', 'RW'] }
            secondAttrs = { 'attr': ['int_dribbling', 'int_ball_control', 'int_agility'], 'pos': ['LM', 'RM', 'LW', 'RW'] }
            thirdAttrs = { 'attr': ['int_long_shots', 'int_curve', 'int_shot_power'], 'pos': ['LM', 'RM', 'LW', 'RW'] }
            break

        default:
            break
    }
    return [firstAttrs, secondAttrs, thirdAttrs]
}

function findAttrsDef() {
    let firstAttrs
    let secondAttrs
    let thirdAttrs
    switch (strategy) {
        case 'poss': // possession
            firstAttrs = { 'attr': ['int_interceptions', 'int_aggression', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'CM', 'LB', 'RB', 'LWB', 'RWB'] }
            secondAttrs = { 'attr': ['int_interceptions', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB', 'LWB', 'RWB'] }
            thirdAttrs = { 'attr': ['int_defensive_awareness', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB'] }
            break
        case 'coat': //counter attack
            firstAttrs = { 'attr': ['int_sprint_speed', 'int_acceleration', 'int_interceptions'], 'pos': ['CB', 'CDM', 'LB', 'RB', 'LWB', 'RWB'] }
            secondAttrs = { 'attr': ['int_strength', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB',] }
            thirdAttrs = { 'attr': ['int_defensive_awareness', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB',] }
            break
        case 'hipr': // high press
            firstAttrs = { 'attr': ['int_reactions', 'int_ball_control', 'int_short_passing'], 'pos': ['CB', 'CDM', 'CM', 'LB', 'RB', 'LWB', 'RWB'] }
            secondAttrs = { 'attr': ['int_interceptions', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB', 'LWB', 'RWB'] }
            thirdAttrs = { 'attr': ['int_defensive_awareness', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB', 'LWB', 'RWB'] }
            break
        case 'cros': // deadball
            firstAttrs = { 'attr': ['int_interceptions', 'int_defensive_awareness', 'int_aggression'], 'pos': ['CB', 'CDM', 'LB', 'RB'] }
            secondAttrs = { 'attr': ['int_jumping', 'int_strength', 'int_heading_accuracy'], 'pos': ['CB', 'CDM', 'CF', 'ST'] }
            thirdAttrs = { 'attr': ['int_gk_positioning', 'int_reflexes', 'int_diving'], 'pos': ['GK'] }
            break
        case 'deba': // wing play
            firstAttrs = { 'attr': ['int_interceptions', 'int_defensive_awareness', 'int_aggression'], 'pos': ['CB', 'CDM', 'LB', 'RB'] }
            secondAttrs = { 'attr': ['int_strength', 'int_sliding_tackle', 'int_standing_tackle'], 'pos': ['CB', 'CDM', 'LB', 'RB', 'LWB', 'RWB'] }
            thirdAttrs = { 'attr': ['int_gk_positioning', 'int_reflexes', 'int_diving'], 'pos': ['GK'] }
            break

        default:
            break
    }
    return [firstAttrs, secondAttrs, thirdAttrs]
}

function showBars(bar_elem, defense_elem, aerial_elem, players, strategy) {

    let [firstAttrsAtt, secondAttrsAtt, thirdAttrsAtt] = findAttrsAtt()
    let [firstAttrsDef, secondAttrsDef, thirdAttrsDef] = findAttrsDef()

    let countryPlayers = players.filter(p => p.str_nationality === att_team)
    let oppositePlayers = players.filter(p => p.str_nationality === def_team)

    getStackedAttributes(bar_elem, countryPlayers, oppositePlayers, firstAttrsAtt, firstAttrsDef)
    getStackedAttributes(defense_elem, countryPlayers, oppositePlayers, secondAttrsAtt, secondAttrsDef)
    getStackedAttributes(aerial_elem, countryPlayers, oppositePlayers, thirdAttrsAtt, thirdAttrsDef)
}

whenDocumentLoaded(() => {
    const div_output = document.getElementById('pitch')
    const div_shooting = document.getElementById('bars')
    const div_defense = document.getElementById('defenseBar')
    const div_aerial = document.getElementById('aerialBar')
    const first_team_radio = document.getElementById('first_team_state')
    const second_team_radio = document.getElementById('second_team_state')
    const strategy_radio = document.getElementById('strategy')
    showFootballPitch(div_output)
    const pitch_elem = document.getElementById('pitch_canvas')

    first_team_radio.addEventListener('click', ({ target }) => { // handler fires on root container click
        getFirstTeamValue(target.htmlFor)
        loadPlayers().then(players => showBars(div_shooting, div_defense, div_aerial, players, strategy))
    })

    loadPlayers().then(players => showBars(div_shooting, div_defense, div_aerial, players, strategy))
    second_team_radio.addEventListener('click', ({ target }) => { // handler fires on root container click
        getSecondTeamValue(target.htmlFor)
        loadPlayers().then(players => showBars(div_shooting, div_defense, div_aerial, players, strategy))
    })

    strategy_radio.addEventListener('click', ({ target }) => { // handler fires on root container click
        getStrategy(target.htmlFor)
        loadPlayers().then(players => showBars(div_shooting, div_defense, div_aerial, players, strategy))
        highlightArea(pitch_elem)
    })

})


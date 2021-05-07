# Milestone 2

As a reminder, we want to provide a easy comparison tool for football teams competiting for the Euro 2021. 

The goal is to have a comprehensive and intuitive tool, that easily present rudimentary analysis, for a wider public, and also more specific comparisons for fan. 

## Sketches 

### Basic comparison

The competition teams are divided in groups for the pool phase. As we want to compare 2 teams we want to provide an easy selection, such as a drag and drop of national teams, based on their flags : 


![Alt text](./sketches/sketch1.jpg?raw=true "Title")


When 2 teams are selected basic statistic are provided. We select radar graphs, with a background part in gray of the average statistics, thanks to their intuitive representation.

The previous part allow anyone to understand how it works. We will add guideline to make it even clearer.

Then users are invited to scroll down to access advanced statistics, centered on players. Yet we don't know if we want to forbid scrolling before selecting teams, because statistics will be empty, so there is no point in terms of comparison, but meanwhile it could help user to understand the processus of selection. 


### Advanced statistics

Advanced statistics are about teams's player. Our goal is to make a dynamic graph, with filtering selection made by user, that represent player on differents statistics.  We are highly inspirated by a graph avalaible in first diapositives : 

![Alt text](./sketches/sketch2.jpg?raw=true "Title")

As represented with a light gray background, user can select there filters. Plus on hover the user will have more information on players. 
We will also provide a sliding effect, on sides, to access each team more precise data, such as number player and their score in main aspect of game.

The last will be about strength and weaknesses comparison. We aim to detect some statistical aspect of the game that can be judged as a weaknesses or strengths. Our 
We are mainly restrict to use team compositions because systems vary a lot and are not known in advance, as well as for titularized players. To counter that we can still show better player in each position. 

## Extra upgrades 

One of our thoughts as an upgrade will be to implement team composition, formation as well as those 11 players, in the matter of statistics. Therefore users could change as they wish the composition, at least for starting players.

## Tools 

As expected, to implement our project, we will use all lectures about HTML, CSS and Javascript. Our graphs require the use of 3D.js library. Plus for interaction and design, we will rely on lectures on interactions and perception colors. Two futurs lectures, graph and tabular data, will be useful as well for our comparison representation. It might gives us advice and tricks to adapt our graphs.

## Website 

A draft website is avalaible here 


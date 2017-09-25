// ================================================================================ Templates
var swarmTemplates = {
	"bee" : {
		"image" : "fish",
		"moveInSameDirection" : 0.5,
		"moveToCenterAlways" : 0.001,
		"moveToCenterWhenLonely" : 0.1,
		"moveAwayWhenTooClose" : 3,
		"moveAwayFromEdge" : 5.5,
		"minDistanceToEdge" : 50,
		"minDistanceToOthers" : 50,
		"maxDistanceToOthers" : 75,
		"frictionLoss" : 5
	},
	"beaaaae" : {
		"image" : "bee",
		"moveInSameDirection" : 0.4,
		"moveToCenterAlways" : 0.05,
		"moveToCenterWhenLonely" : 0.27,
		"moveAwayWhenTooClose" : 8,
		"moveAwayFromEdge" : 5.5,
		"minDistanceToEdge" : 50,
		"minDistanceToOthers" : 20,
		"maxDistanceToOthers" : 60,
		"frictionLoss" : 2
	},
	"BeesAlt" : {
		"image" : "bee",
		"moveInSameDirection" : 0.8,
		"moveToCenterAlways" : 0.02,
		"moveToCenterWhenLonely" : 0.07,
		"moveAwayWhenTooClose" : 6,
		"moveAwayFromEdge" : 5.5,
		"minDistanceToEdge" : 50,
		"minDistanceToOthers" : 20,
		"maxDistanceToOthers" : 60,
		"frictionLoss" : 2
	},
	"bee2" : {
		"image" : "blob",
		"moveInSameDirection" : 3.8,
		"moveToCenterAlways" : 0.32,
		"moveToCenterWhenLonely" : 2.07,
		"moveAwayWhenTooClose" : 15,
		"moveAwayFromEdge" : 25.5,
		"minDistanceToEdge" : 25,
		"minDistanceToOthers" : 7,
		"maxDistanceToOthers" : 25,
		"frictionLoss" : 2
	},
	"Fish" : {
		"image" : "fish",
		"moveInSameDirection" : 0.5,
		"moveToCenterAlways" : 0.001,
		"moveToCenterWhenLonely" : 0.1,
		"moveAwayWhenTooClose" : 3,
		"moveAwayFromEdge" : 5.5,
		"minDistanceToEdge" : 50,
		"minDistanceToOthers" : 50,
		"maxDistanceToOthers" : 75,
		"frictionLoss" : 5
	},
	"FishSmall" : {
		"image" : "small_fish",
		"moveInSameDirection" : 1.5,
		"moveToCenterAlways" : 0.005,
		"moveToCenterWhenLonely" : 0.1,
		"moveAwayWhenTooClose" : 2,
		"moveAwayFromEdge" : 5.5,
		"minDistanceToEdge" : 50,
		"minDistanceToOthers" : 20,
		"maxDistanceToOthers" : 35,
		"frictionLoss" : 3
	}
};
// ================================================================================ Function for Template Loading
function loadSwarmTemplate( swarm, template ) {
	var temp = swarmTemplates[ template ];
	swarm.templateObj = temp;
	var constFactor = 0.001;
	if( temp !== undefined ) {
		swarm.templateName = template;
		swarm.moveInSameDirection = temp[ "moveInSameDirection" ] * constFactor;
		swarm.moveToCenterAlways = temp[ "moveToCenterAlways" ] * constFactor;
		swarm.moveToCenterWhenLonely = temp[ "moveToCenterWhenLonely" ] * constFactor;
		swarm.moveAwayWhenTooClose = temp[ "moveAwayWhenTooClose" ] * constFactor;
		swarm.moveAwayFromEdge = temp[ "moveAwayFromEdge" ] * constFactor;
		swarm.minDistanceToOthers = temp[ "minDistanceToOthers" ];
		swarm.maxDistanceToOthers = temp[ "maxDistanceToOthers" ];
		swarm.minDistanceToEdge = temp[ "minDistanceToEdge" ];
		swarm.frictionLoss = (1000 - temp[ "frictionLoss" ]) * constFactor;
	}
};


// ================================================================================ Templates
var swarmTemplates = {
	"bee" : {
		"image" : "bee",
		"moveInSameDirection" : 0.5,
		"moveToCenterAlways" : 0.18,
		"moveToCenterWhenLonely" : 0.47,
		"moveAwayWhenTooClose" : 18,
		"moveAwayFromEdge" : 5.5,
		"minDistanceToEdge" : 50,
		"minDistanceToOthers" : 25,
		"maxDistanceToOthers" : 50,
		"frictionLoss" : 3
	},
	"bee UNUSED ALT" : {
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


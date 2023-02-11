var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('⬇️');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() != creep.store.getCapacity()) {
	        creep.memory.building = true;
	        creep.say('🚧');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // Build the oldest
                // if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff00', lineStyle: 'dotted'}});
                // }

                // Build the newest
                if(creep.build(targets[targets.length - 1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targets.length - 1], {visualizePathStyle: {stroke: '#00ff00', lineStyle: 'dotted'}});
                }
            }
	    }
	    else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == 'container') &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) != structure.store.getCapacity();
                }
            });
            if (sources.length) {
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }               
            } else {
                creep.moveTo(17, 12);
            }

	    }
	},

    builds: {
        default: [WORK, CARRY, MOVE],
        buffed: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    }
};

module.exports = roleBuilder;
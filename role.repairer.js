var roleRepairer = {

    run: function(creep) {

	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('⬇️');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() != creep.store.getCapacity()) {
	        creep.memory.repairing = true;
	        creep.say('🛠️');
	    }

	    if(creep.memory.repairing) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure);
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
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	},
    builds: {
        default: [WORK, CARRY, MOVE],
        buffed: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    }
};

module.exports = roleRepairer;
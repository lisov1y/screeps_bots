var roleHarvester = {

    run: function(creep) {
        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferring = false;
            creep.say('🔄');
	    }
	    if(!creep.memory.transferring && creep.store.getFreeCapacity() == 0) {
	        creep.memory.transferring = true;
	        creep.say('⚡');
	    }

	    if(creep.memory.transferring) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff66'}});
                }
            } else {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                if (creep.room.lookForAt(LOOK_CREEPS, 14, 10).length && creep.room.lookForAt(LOOK_CREEPS, 14, 10)[0].name != creep.name) {
                    creep.moveTo(10, 10, {visualizePathStyle: {stroke: '#ffff66'}});
                } else {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffff66'}});
                }
            }
        }
	},
    staticHarvester: function(creep) {
        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferring = false;
            creep.say('🔄');
	    }
	    if(!creep.memory.transferring && creep.store.getFreeCapacity() == 0) {
	        creep.memory.transferring = true;
	        creep.say('⚡');
	    }

	    if(creep.memory.transferring) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == 'container') &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff66'}});
                }
            } else {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffff66'}});
            }
        }
    },
    builds: {
        default: [WORK, CARRY, MOVE],
        buffed: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        static: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
    }
};

module.exports = roleHarvester;
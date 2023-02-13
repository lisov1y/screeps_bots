var roleHauler = {
    run: function(creep) {
        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferring = false;
            creep.say('⬇️');
	    }
	    if(!creep.memory.transferring && creep.store.getFreeCapacity() != creep.store.getCapacity()) {
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
            if (!targets.length) {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff66'}});
                    }
            } else {
                creep.moveTo(13, 15);
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
            }
        }
    },
    builds: {
        default: [WORK, CARRY, MOVE],
        buffed: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE ,MOVE, MOVE]
    }
};

module.exports = roleHauler;
var roleHauler = {
    run: function(creep, energyAvailable) {
        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferring = false;
            creep.say('⬇️');
	    }
	    if(!creep.memory.transferring && creep.store.getFreeCapacity() != creep.store.getCapacity()) {
            creep.memory.transferring = true;
	        creep.say('⚡');
	    }
        
        if(creep.memory.transferring) {
            var extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (energyAvailable >= 1000 ) {
                targets = towers;
            } else {
                targets = extensions;
            }
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets);
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff66'}});
                } else {
                    creep.transfer(target, RESOURCE_ENERGY);
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
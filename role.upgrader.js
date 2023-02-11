var roleUpgrader = {

    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡');
	    }

	    if(creep.memory.upgrading) {
            creep.moveTo(36, 45, {visualizePathStyle: {stroke: '#3333ff'}});
            creep.upgradeController(creep.room.controller);
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            creep.moveTo(37, 44, {visualizePathStyle: {stroke: '#3333ff'}});
            creep.harvest(sources[1]);
        }
	},

    builds: {
        default: [WORK, CARRY, MOVE],
        buffed: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
    }
};

module.exports = roleUpgrader;
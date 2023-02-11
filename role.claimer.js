var roleClaimer = {

    run: function(creep) {
        if (creep.room.name !== 'W59N16') {
            creep.moveTo(new RoomPosition(36, 26, 'W59N16'), {visualizePathStyle: {stroke: '#ff1100'}});
        } else {
            if(creep.room.controller) {
                // console.log(creep.claimController(creep.room.controller))
                // if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                //     console.log('Here');
                //     creep.moveTo(creep.room.controller);
                // }
                // creep.signController(creep.room.controller, "CONTROLLA?!??!")
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
	},
    builds: {
        default: [MOVE, MOVE, MOVE, MOVE, CLAIM]
    }
}

module.exports = roleClaimer;
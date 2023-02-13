var constructionTower = {

    run: function(id, currentCapacity, isEnoughCreeps) {
        var tower = Game.getObjectById(id);
        if(tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            } 
            else {
                if (currentCapacity >= 1000 && isEnoughCreeps) {
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_RAMPART || structure.structureType != STRUCTURE_WALL)
                    });
                    if(!closestDamagedStructure) {
                        closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => (structure.structureType == STRUCTURE_WALL || structure.structureType == 'rampart')
                        });
            
                    }
                    if (closestDamagedStructure) {
                        tower.repair(closestDamagedStructure);
                    }
                }
            }
        }
    }
};

module.exports = constructionTower;
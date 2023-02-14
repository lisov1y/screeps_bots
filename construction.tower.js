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
                    var containers = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax);
                        }
                    });
                    var defences = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_WALL) && structure.hits < structure.hitsMax;
                        }
                    });
                    var roads = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax;
                        }
                    });
                    if (containers.length) {
                        tower.repair(tower.pos.findClosestByRange(containers))
                    } else if (roads.length) {
                        tower.repair(tower.pos.findClosestByRange(roads))
                    } else {
                        tower.repair(defences);
                    }
                }
            }
        }
    }
};

module.exports = constructionTower;
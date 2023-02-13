// Roles
const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleRepairer = require('role.repairer');
const roleMeleeFighter = require('./role.melee-fighter')
const roleClaimer = require('./role.claimer');
const roleHauler = require('./role.hauler');

// Constructuions
const constructionTower = require('./construction.tower');

// Misc

// Creep.reserveController

var lastMaxCapacity = 0;
var lastAvailableCapacity = 0;

module.exports.loop = function () {
    // creep.prototype.moveToRoom = function moveToRoom(roomName) {
    //     this.moveTo(25, 25, roomName)
    // }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Activate Main Room Tower
    
    var creepsAlive = {
        'harvesters': _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester'),
        'haulers': _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler'),
        'builders': _.filter(Game.creeps, (creep) => creep.memory.role === 'builder'),
        'upgraders': _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader'),
        'meleeFighters': _.filter(Game.creeps, (creep) => creep.memory.role === 'meleeFighter'),
        'repairers': _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer'),
        'claimers': _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer'),
    };

    if (lastMaxCapacity != Game.spawns['Spawn1'].room.energyCapacityAvailable || lastAvailableCapacity != Game.spawns['Spawn1'].room.energyAvailable) {
        console.log('Max Room Energy --> ' + Game.spawns['Spawn1'].room.energyCapacityAvailable);
        console.log('Available Room Energy --> ' + Game.spawns['Spawn1'].room.energyAvailable);
        lastMaxCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        lastAvailableCapacity = Game.spawns['Spawn1'].room.energyAvailable;
    
    }
    constructionTower.run('63e1b921f39ee14311937439', lastAvailableCapacity, creepsAlive.haulers.length == 1);
    constructionTower.run('63e6c11e283dbe700711006b', lastAvailableCapacity, creepsAlive.haulers.length == 1);
    
    // WORK - 100; MOVE - 50; CARRY - 50; ATTACK - 80; RANGED_ATTACK - 150; HEAL - 250
    
    var currentHarvester = roleHarvester.builds.default;
    if (lastMaxCapacity > 300 && creepsAlive.harvesters.length) {
        if (creepsAlive.haulers.length == 0 && creepsAlive.harvesters.length < 3) {
            currentHarvester = roleHarvester.builds.buffed;
        } else {
            currentHarvester = roleHarvester.builds.static;
        }
    }
    
    var currentHauler = roleHauler.builds.default;
    if (lastMaxCapacity > 300) {
        currentHauler = roleHauler.builds.buffed;
    }
    
    var currentBuilder = roleBuilder.builds.default;
    if (lastMaxCapacity > 300) {
        currentBuilder = roleBuilder.builds.buffed;
    }

    var currentUpgrader = roleUpgrader.builds.default;
    if (lastMaxCapacity > 300) {
        currentUpgrader = roleUpgrader.builds.buffed;
    }
    
    var currentRepairer = roleRepairer.builds.default;
    if (lastMaxCapacity > 300) {
        currentRepairer = roleRepairer.builds.buffed;
    }
    
    var currentMeleeFighter = roleMeleeFighter.builds.default;
    
    var currentClaimer = roleClaimer.builds.default;

    if (creepsAlive.harvesters.length < 2) {
        spawnCreep('harvester', currentHarvester);
    }
    else if (creepsAlive.haulers.length < 1) {
        spawnCreep('hauler', currentHauler);
    }
        // else if (creepsAlive.claimers.length < 1) {
    //     spawnCreep('claimer', currentClaimer);
    // }
    else if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length && creepsAlive.builders.length < 1) {
        spawnCreep('builder', currentBuilder);
    }
    else if (creepsAlive.upgraders.length < 2) {
        spawnCreep('upgrader', currentUpgrader);
    }
    else if (creepsAlive.meleeFighters.length < 1) {
        spawnCreep('meleeFighter', currentMeleeFighter);
    }
    // else if (creepsAlive.repairers.length < 1) {
    //     spawnCreep('repairer', currentRepairer);
    // }

    /* --------------------------------------- */


    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        console.log('----------------------');
        console.log('*** Spawning new ' + spawningCreep.memory.role + ' ***');
        console.log('Remaining: ');
        console.log('Harvesters: ' + creepsAlive.harvesters.length);
        console.log('Haulers: ' + creepsAlive.haulers.length);
        console.log('Builders: ' + creepsAlive.builders.length);
        console.log('Upgraders: ' + creepsAlive.upgraders.length);
        console.log('Melee Fighters: ' + creepsAlive.meleeFighters.length);
        console.log('Repairers: ' + creepsAlive.repairers.length);
        console.log('Claimers: ' + creepsAlive.claimers.length);
        console.log('----------------------')
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    function spawnCreep(role, parts) {
        var newName = role + Game.time;
        Game.spawns['Spawn1'].spawnCreep(parts, newName, {memory: {role: role}})
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            if (creepsAlive.haulers.length == 0) {
                roleHarvester.run(creep);
            } else {
                roleHarvester.staticHarvester(creep);
            }
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'meleeFighter') {
            roleMeleeFighter.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
    }
}

// //Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
// //Game.spawns['Spawn1'].room.controller.activateSafeMode();
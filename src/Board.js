import React from 'react';
import {Room, Path, PuzzleSpot} from "./BoardObjs.js";

class Board extends React.Component{

    //Setup the Board & validate
    constructor(props){
        super(props);
        this.rooms = {};
        this.paths = {};
        this.startingRoomId  = '';
        this.lockToPuzzleMap = {};
        this.lockToPathMap   = {};
        this.puzzleSpots     = {};

        this.puzzleToLockMap = {};
        this.pathToLockMap   = {};
    }

    init(){
        this.puzzleToLockMap = this.invertMap(this.lockToPuzzleMap);
        this.pathToLockMap   = this.invertMap(this.lockToPathMap);

        this.validate();
    }

    validate(){
    }

    //Utility Functions
    invertMap(map,oneToOne = false){
        var results = {};

        for( const key in map){
            let val = map[key]
            if(!oneToOne){
                if( key in results)
                    results[val] &= key
                else
                    results[val] = [key];
            }else{
                if(key in results)
                    throw new Error(key + " already exists in result in one to one mode")
                else
                    results[val] = key;
            }
        }
        return( results );
    }
        
    isEqual(item1, item2){ return( item1.describe() === item2.describe() )
    }

    componentEnsure(map, key, defaultValue){
        if( !(key in map))
            map[key] = defaultValue;

        return( map )
    }

    //Helper functions for creating stuff
    makePathFromProps(id, roomIdA, roomIdB, description, lockIds = [], isVisible = true, isOneWay = false){
        return new Path({ id,roomIdA, roomIdB, description,lockIds,isVisible,isOneWay});
    }

    makeRoomFromProps(id, description, paths = {}, puzzleSpots = [], descriptionFirst = ''){
        return new Room({id, description, paths, puzzleSpots, descriptionFirst })
    }

    makePSpotFromProps(id, description, linkText, puzzleId){
        return new PuzzleSpot({id,description,linkText,puzzleId})
    }

    //Manipulate the Board
    addPath(path){
        if(path.id in this.paths){
            if( !this.isEqual( path, this.paths[path.id] ) )
                throw new Error('same id used for two paths')
        }else{
            if(!path.lockIds.length)
                path.isLocked = false
            else{
                for( let lockId of path.lockIds){
                    this.lockToPathMap = this.componentEnsure(this.lockToPathMap, lockId, [] );
                    this.lockToPathMap[lockId].push(path.id);
                }
            }

            this.paths[path.id] = path;
        }
    }

    addPuzzleSpot(puzzleSpot){
        if(puzzleSpot.id in this.puzzleSpots){
            if( !this.isEqual( puzzleSpot, this.puzzleSpots[puzzleSpot.id] ) )
                throw new Error('same id used for two puzzlespots')
        }else{
            this.puzzleSpots[puzzleSpot.id] = puzzleSpot;
        }
    }

    addRoomFromProps(id, description, paths = {}, puzzleSpots = []){
    	this.addRoom(this.makeRoomFromProps(id,description,paths,puzzleSpots))
    }

    addRoom(room){
        if(room.id in this.rooms){
            if( !this.isEqual( room, this.rooms[room.id] ) )
                throw new Error('same id used for two rooms')
            else
                console.log('Room ' + room.id + " somehow added twice with same values.")
        }else{
            this.rooms[room.id] = room;
            for( const key in room.paths ){
                 this.addPath( room.paths[key] );             
            }
        }
    }
    
    addLock(lockId, puzzleId){
       this.lockToPuzzleMap[lockId] = puzzleId;
    }

    //Board Data APIs
	getAllPathDirections(){
		var directions = {};

		for( const roomId in this.rooms)
			for( const dir in this.rooms[roomId].paths)
				directions[dir]=dir;

		return directions;
	}

    canUnlockPath(pathId, puzzles){
        return( this.paths[pathId].canUnlock(puzzles.puzzles, this.lockToPuzzleMap))
    }

    roomDescriptionDetails(roomId){
        return({
            text:     this.rooms[roomId].describe(),
            puzzleId: this.rooms[roomId].getPuzzleId(),    
        })
    }

    canGo(roomId,direction,lockMatters=true){
    	let exists   = direction in this.rooms[roomId].paths;
    	var canGo    = exists && this.rooms[roomId].paths[direction].canGoFrom(roomId);
    	var isLocked = !lockMatters || ( exists && this.rooms[roomId].paths[direction].isLocked )

    	return { canGo: canGo && !isLocked, isLocked}
    }

    nextRoomId(roomId, direction){
        if(this.canGo(roomId,direction)){
            return( this.rooms[roomId].paths[direction].getDestinationId(roomId) )
        }else{
            throw new Error( "Can't go " + direction + " from " + roomId );
        }
    }

    puzzleIdsforRoom(roomId){
    	var results = [];

    	for( let pSpot of this.rooms[roomId].puzzleSpots)
    		results.push( pSpot.puzzleId);

    	return results
    }
}

export default Board;
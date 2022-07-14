class Puzzle{
    constructor(id, name, description, image, answer ){
        this.id   = id;   
        this.name  = name;
        this.description = description;
        this.image = image;
        this.answer = answer;
        this.solved = false;
    }

    onSolvedMessage(){
    	return 'Solved ' + this.name + '!<br>'
    }
}

class Puzzles{
    constructor(){
        this.puzzles = {};
        this.count   = 0;
    }

    addPuzzle(name, description, imagePath,answer){
        let id = 'P' + this.count;
        this.count++;

        var puzzle = new Puzzle(id,name, description,imagePath,answer);
        this.puzzles[id] = puzzle;
    }
}

export {Puzzle, Puzzles}
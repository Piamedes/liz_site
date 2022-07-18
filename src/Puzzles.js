class Puzzle{
    constructor(id, name, image, answer ){
        this.id   = id;   
        this.name  = name;
        this.image = image;
        this.answer = answer;
        this.solved = false;
    }

    onSolvedMessage(){
    	return '"' + this.answer + '" is the correct answer!!<br>';
    }
}

class Puzzles{
    constructor(){
        this.puzzles = {};
        this.count   = 0;
    }

    addPuzzle(name, imagePath,answer){
        let id = 'P' + this.count;
        this.count++;

        var puzzle = new Puzzle(id, name, imagePath, answer);
        this.puzzles[id] = puzzle;
    }
}

export {Puzzle, Puzzles}
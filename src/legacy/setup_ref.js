		var board  = new Board();

		var TS00 = board.makePSpotFromProps("TS00", "To the side of the door is a flyer with a puzzle on it.", "P0");  //Lovers, first puzzle
		var TS01 = board.makePSpotFromProps("TS01", "On single piece of paper is on the desk.", "P1");  //Boolean, study puzzle
		var TS02 = board.makePSpotFromProps("TS02", "", "P2");  //Tetris
		var TS03 = board.makePSpotFromProps("TS03", "A set of drink instructions is attached to the side of the bar","P3"); //Bartender
		var TS04 = board.makePSpotFromProps("TS01", "", "P4"); //dance
		var TS05 = board.makePSpotFromProps("TS01", "", "P5"); //maid
		var TS06 = board.makePSpotFromProps("TS01", "A placard stands by the door", "P6"); //venue

		board.addLock("LS00","P0");
		board.addLock("LS01","P1");
		board.addLock("LS02","P3");
		board.addLock("LS03","P4");

		board.addLock("LS04","P2");
		//board.add

		//makePathFromProps(id, roomIdA, roomIdB, description, lockIds = [], isVisible = true, isOneWay = false){
		var PS00 = board.makePathFromProps("PS00","RS00","RS01","shabby doorway.",[],false,true);
		var PS01 = board.makePathFromProps("PS01","RS01","RS02","oddly fancy but squat door",["LS00"]);
		var PS02 = board.makePathFromProps("PS02","RS02","RS03","archway leading off to a large room");
		var PS03 = board.makePathFromProps("PS03","RS03","RS04","archway");
		var PS04 = board.makePathFromProps("PS04","RS03","RS07","archway");	
		var PS05 = board.makePathFromProps("PS05","RS03","RS12","simple gate",["LS01"]);							

		var PS06 = board.makePathFromProps("PS06","RS04","RS05","wide open archway.");
		var PS07 = board.makePathFromProps("PS07","RS04","RS10","",[],false);
		var PS08 = board.makePathFromProps("PS08","RS05","RS06","simple door");
		var PS09 = board.makePathFromProps("PS09","RS05","RS11","large vault door", ["LS04"]);
		var PS10 = board.makePathFromProps("PS10","RS07","RS08","wide door");	
		var PS11 = board.makePathFromProps("PS11","RS08","RS09","",[],false);	
		var PS12 = board.makePathFromProps("PS12","RS09","RS10","",[],false);
		var PS13 = board.makePathFromProps("PS13","RS10","RS11","large vault door",["LS02"]);

		var PS14 = board.makePathFromProps("PS14","RS12","RS13","simple door",["L"]);
		var PS15 = board.makePathFromProps("PS15","RS13","RS14","large vault door",["LS04"]);
		var PS16 = board.makePathFromProps("PS16","RS13","RS16","large vault door",["LS04"]);
		var PS18 = board.makePathFromProps("PS18","RS14","RS17","large vault door",["LS04"]);//no done yet

		board.addRoomFromProps("RS00","Welcome back!  Things have changed a bit, hoping you enjoy them all.  (N/S/E/W) still works, but why don't you <b>knock</b> to get started?  You want to get your present right?", { knock: PS00});
		board.addRoomFromProps("RS01","As you finish knocking a trapdoor opens below you.  You land in a heap on the floor in a shabby entranceway.  If you ever forget something, you can try to <b>look</b>.  You see:",{[DIRS.E]: PS01,[DIRS.W]:PS00},[TS00]);
		board.addRoomFromProps("RS02","a boring hallway. It even has low ceilings forcing one of you to stoop a bit.",{[DIRS.E]:PS02,[DIRS.W]:PS01});
		board.addRoomFromProps("RS03","an ornate foyer with large tapestries adorning the walls and a gorgeous chandelier hanging in the center.  Plenty of headroom as long as you avoid the chandelier.",{[DIRS.W]: PS02,[DIRS.E]:PS05,[DIRS.N]:PS03,[DIRS.S]:PS04});

		board.addRoomFromProps("RS04","a hallway with massive floor to ceiling window adorns the eastern wall looking out over a river.  There's a giant pile of junk leaning against the western wall.",{[DIRS.S]: PS03,[DIRS.N]:PS06,climb:PS07,up:PS07,scale:PS07});
		board.addRoomFromProps("RS05","a hallway with massive floor to ceiling window adorns the eastern wall looking out over a river.",{[DIRS.W]: PS09,[DIRS.N]:PS08,[DIRS.S]:PS06});
		board.addRoomFromProps("RS06","a pleasant study with windows overlooking the river outside.",{[DIRS.S]:PS08},[TS01]);
		board.addRoomFromProps("RS07","a lounge with massive floor to ceiling windows adorning the eastern and southern walls looking out over a river.  A long bar with great selection overlooks the river below.",{[DIRS.W]: PS10,[DIRS.N]:PS04});
		board.addRoomFromProps("RS08","an old storeroom filled with building equipment.  Tools of all sorts line the shelves.  Ladders lean against the back wall reaching up into darkness",{[DIRS.E]:PS10,climb:PS11,up:PS11});
		board.addRoomFromProps("RS09","a small dark attic with barely any room to move.  There's a ladder down to the east and the attic ceiling droops down as the room stretches north.  Too low to walk",{crawl: PS12,stoop:PS12, [DIRS.E]:PS11,down:PS11, climb: PS11});
		board.addRoomFromProps("RS10","a spacious loft, really dragged down by the top of a junk pile on the eastern side and a spiderweb-filled crawlspace to the south.",{[DIRS.N]: PS13,[DIRS.E]:PS07,climb:PS07,down:PS07,[DIRS.S]:PS12, crawl: PS12,stoop:PS12});
		board.addRoomFromProps("RS11","fa game room with vintage arcade cabinats lining the walls",{[DIRS.S]: PS13,[DIRS.E]:PS09}, [TS03]);

		board.addRoomFromProps("RS12","a covered bridge over the swiftly flowing river.",{[DIRS.W]:PS05,[DIRS.E]:PS14}, [TS06]);
		board.addRoomFromProps("RS13","a large dining room with dozens of tables.",{[DIRS.W]:PS14,[DIRS.E]:PS15,[DIRS.N]:PS16}, [TS05]);
		board.addRoomFromProps("RS14","a fancy hallway",{[DIRS.W]:PS15,[DIRS.E]:PS18});
		board.addRoomFromProps("RS16","a ballrooom with large dancefloor",{[DIRS.S]:PS16}, [TS04]);


		board.startingRoomId = "RS00";
		board.init();

		// var path01 = board.makePathFromProps("A01", "A", "B", '<b> puzzle! </b>',["L1"]);
		// var path02 = board.makePathFromProps("A02", "A", "C", "A - C");
		// var path03 = board.makePathFromProps("A03", "C", "D", "C - D",["L1"]);
		// var path04 = board.makePathFromProps("A04", "C", "E", "C - E");
		// var path05 = board.makePathFromProps("A05", "D", "F", "D - F");

		// var pspot1 = board.makePSpotFromProps("PS1", "test1", "link", "P0");

		// var roomA = board.makeRoomFromProps("A", "A", "ayyyy", { [DIRS.E]: path01, [DIRS.S]: path02}, [pspot1]);
		// var roomB = board.makeRoomFromProps("B", "B", "byyyy", { [DIRS.W]: path01});
		// var roomC = board.makeRoomFromProps("C", "C", "cyyyy", {[DIRS.E]: path03, [DIRS.N]: path02, [DIRS.S]: path04});
		// var roomD = board.makeRoomFromProps("D", "D", "dyyyy", {[DIRS.W]: path03, [DIRS.E]: path05});
		// var roomE = board.makeRoomFromProps("E", "E", "eyyyy", {[DIRS.N]: path04});        
		// var roomF = board.makeRoomFromProps("F", "F", "Fyyyy", {[DIRS.W]:path05});

		// board.addRoom(roomA);
		// board.addRoom(roomB);
		// board.addRoom(roomC);
		// board.addRoom(roomD);
		// board.addRoom(roomE);
		// board.addRoom(roomF);

		// board.addLock("L1","P0");
		// board.init();

		return board

	initPuzzles(){
		var puzzles = new Puzzles();

		puzzles.addPuzzle("Lovers"   , require('./images/00_Sept2017_Location.png') , "appetite");
		puzzles.addPuzzle("Boolean"  , require('./images/PH2BooleanFinal.png'	)	, "314725"  );
		puzzles.addPuzzle("Tetris"   , require('./images/PH2_02Puzzle_Final.png')   , "6886"    );
		puzzles.addPuzzle("Bartender", require('./images/Annoying_Bartender.png')   , "coldandfree" );
		puzzles.addPuzzle("Dance"    , require('./images/Dangerous_Dancing.png')    , "requests"    );
		puzzles.addPuzzle("Maid"     , require('./images/Maid_of_Honors_Toast.png') , "tochampagne" );
		puzzles.addPuzzle("Venue"    , require('./images/The_Venue_in_Verona.png')  , "mercutio"    );						

		return puzzles;
	}


class Tetris {
  constructor(canvas){
    this.fieldArray = [];
    this.landedArr = [];
    this.tetrominoes = [];
    this.fieldSprite;
    this.masker;
    this.currentTetromino;
    this.nextTetromino;
    this.currentRotation;
    this.tRow;
    this.tCol;
    this.timeCount;
    this.next_t;
    this.gameOver = false;
    this.canvas = canvas
  }
  run(){
    this.stage = new createjs.Stage(this.canvas);
    this.background();
    this.setTetris();
    this.renderTetris();
    createjs.Ticker.addEventListener("tick",this.stage);
    this.stage.update();
    window.addEventListener('keydown',onkeydown);
  }


  background() {
  	let colors=['#222222','#333333'];
  	this.fieldSprite = new createjs.Shape();
  	// MASKER TO MASK THE UPPER PORTION OF THE GAME
  	this.masker = new createjs.Shape();
  	this.masker.graphics.beginFill('#ffffff');
  	this.masker.graphics.rect(0,Tetris.SIZE*2,Tetris.SIZE*Tetris.COL,Tetris.SIZE*(Tetris.ROW-2));
  	this.fieldSprite.mask = this.masker;
  	this.fieldSprite.graphics.beginStroke('#000000');
  	for (let i = 0; i < Tetris.ROW; i++) {
  		this.fieldArray[i] = [];
  		this.landedArr[i] = [];
  		for (let j = 0; j < Tetris.COL; j++) {
  			this.fieldArray[i][j]=0;
  			this.landedArr[i][j]=null;
  			this.fieldSprite.graphics.beginFill(colors[((j % 2) + (i % 2)) % 2], 0);
  			this.fieldSprite.graphics.rect(Tetris.SIZE*j,Tetris.SIZE*i,Tetris.SIZE,Tetris.SIZE);
  		}
  	}
  	this.stage.addChild(this.fieldSprite);
  	colors=null;
  }
  setTetris() {
  	this.tetrominoes[0]=[
      [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
      ]];
  	colors[0]='#00FFFF';
  	this.tetrominoes[1]=[
      [
        [0,0,0,0],
        [1,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [1,1,0,0],
        [0,1,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0]]];
  	colors[1]='#AA00FF';
  	this.tetrominoes[2]=[
      [
        [0,0,0,0],
        [1,1,1,0],
        [1,0,0,0],
        [0,0,0,0]
      ],
      [
        [1,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [1,1,1,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
      ]
    ];
  	colors[2]='#FFA500';
  	this.tetrominoes[3]=[
      [
        [1,0,0,0],
        [1,1,1,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,1,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [1,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [1,1,0,0],
        [0,0,0,0]
      ]
    ];
  	colors[3]='#0000FF';
  	this.tetrominoes[4]=[
      [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
      ]
    ];
  	colors[4]='#FF0000';
  	this.tetrominoes[5]=[
      [
        [0,0,0,0],
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
      ]
    ];
  	colors[5]='#00FF00';
  	this.tetrominoes[6]=[
      [
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    ];
  	colors[6]='#FFFF00';
  }
  renderTetris(){
  	if (this.gameOver) return;
  	this.currentTetromino=this.nextTetromino;
  	this.currentRotation=0;
  	this.tRow=0;
  	this.tCol=3;
  	this.drawTetromino();
  	this.nextTetromino=Math.floor(Math.random()*7);
  	this.drawNext();
  	if (canFit(this.tRow,this.tCol,this.currentRotation)) {
  		clearTimeout(this.timeCount);
  		this.timeCount = setInterval(onTime, 500);
  	} else {
  		this.gameOver=true;
  	}

  }
  drawTetromino() {
  	let ct=this.currentTetromino;
  	tetromino = new createjs.Shape();
  	this.stage.addChild(tetromino);
  	tetromino.mask = this.masker;
  	tetromino.graphics.beginStroke('#111111');
  	for (let i=0; i<this.tetrominoes[ct][this.currentRotation].length; i++) {
  		for (let j=0; j<this.tetrominoes[ct][this.currentRotation][i].length; j++) {
  			if (this.tetrominoes[ct][this.currentRotation][i][j]==1) {
  				tetromino.graphics.beginFill(colors[ct]);
  				tetromino.graphics.drawRect(Tetris.SIZE*j,Tetris.SIZE*i,Tetris.SIZE,Tetris.SIZE);
  			}
  		}
  	}
  	placeTetromino();
  }
  placeTetromino() {
  	tetromino.x=this.tCol*Tetris.SIZE;
  	tetromino.y=this.tRow*Tetris.SIZE;
  }

  onkeydown(e) {
  	switch (e.keyCode) {
  		case 37 : // LEFT
  		if (this.gameOver) return;
  		if (canFit(this.tRow,this.tCol-1,this.currentRotation)) {
  			this.tCol--;
  			this.placeTetromino();
  		}
  		e.preventDefault();
  		break;
  		case 39 : // RIGHT
  		if (this.gameOver) return;
  		if (this.canFit(this.tRow,this.tCol+1,this.currentRotation)) {
  			this.tCol++;
  			this.placeTetromino();
  		}
  		e.preventDefault();
  		break;
  		case 38 : // UP/ROTATE
  		if (this.gameOver) return;
  		if (this.tRow < 0) this.tRow = 0;
  		if (this.tCol < 0) this.tCol = 0;
  		if (this.tCol > Tetris.COL - this.tetrominoes[this.currentTetromino][this.currentRotation].length)
  			this.tCol = Tetris.COL - this.tetrominoes[this.currentTetromino][this.currentRotation].length;
  		let ct=this.currentRotation;
  		// SET TEMPORARY VALUE
  		// TO CHECK IF THE NEXT ROTATE IS CAN FIT
  		let tmpRow = this.tRow;
  		let tmpCol = this.tCol;
  		let tmpRot = ct;
  		let rot = (ct + 1) % this.tetrominoes[this.currentTetromino].length;
  		if (canFit(this.tRow, this.tCol, rot)) {
  			this.currentRotation=rot;
  			this.stage.removeChild(tetromino);
  			this.drawTetromino();
  			this.placeTetromino();
  		}
  		if(!canFit(this.tRow, this.tCol, rot)) {
  			this.currentRotation = tmpRot;
  			this.tCol = tmpCol;
  			this.tRow = tmpRow;
  			this.stage.removeChild(tetromino);
  			this.drawTetromino();
  			this.placeTetromino();
  		}
  		e.preventDefault();
  		break;
  		case 40 : // DOWN
  		if (this.gameOver) return;
  		if (canFit(this.tRow+1,this.tCol)) {
  			this.tRow++;
  			this.placeTetromino();
  		} else {
  			this.landTetromino();
  			this.generateTetromino();
  		}
  		e.preventDefault();
  		break;
          default:break;
  	}

  }
  canFit(row, col, rot) {
  	let ct=this.currentTetromino;
  	for (let i=0; i<this.tetrominoes[ct][this.currentRotation].length; i++) {
  		for (let j=0; j<this.tetrominoes[ct][this.currentRotation][i].length; j++) {
  			if (this.tetrominoes[ct][this.currentRotation][i][j]==1) {

  				// OUT OF LEFT BOUNDARY
  				if (col+j<0) return false;

  				// OUT OF RIGHT BOUNDARY
  				if (col + j > Tetris.COL - 1) return false;

  				// OUT OF BOTTOM BOUNDARY
  				if (row+i>Tetris.ROW-1) return false;

  				// HIT ANOTHER TETROMINO
  				if (this.fieldArray[row+i][col+j]==1) return false;

  			}
  		}
  	}
  	return true;
  }
  landTetromino(){
  	let ct=this.currentTetromino;
  	let landed;
  	for (let i=0; i<this.tetrominoes[ct][this.currentRotation].length; i++) {
  		for (let j=0; j<this.tetrominoes[ct][this.currentRotation][i].length; j++) {
  			if (this.tetrominoes[ct][this.currentRotation][i][j]==1) {
  				landed=new createjs.Shape();
  				landed.mask = this.masker;
  				landed.graphics.beginStroke('#111111');
  				landed.graphics.beginFill(colors[this.currentTetromino]);
  				landed.graphics.drawRect(Tetris.SIZE*(this.tCol+j),Tetris.SIZE*(this.tRow+i),Tetris.SIZE,Tetris.SIZE);
  				this.stage.addChild(landed);

  				this.fieldArray[this.tRow+i][this.tCol+j]=1;

  				this.landedArr[this.tRow+i][this.tCol+j]=landed;
  			}
  		}
  	}
  	this.stage.removeChild(tetromino);

  	clearInterval(this.timeCount);
  	this.checkForLines();
  }
  checkForLines() {
  	for (let i=0; i<Tetris.ROW; i++) {
  		if (this.fieldArray[i].indexOf(0) == -1) {
  			// REMOVING LINE(S)
  			for (let j=0; j<Tetris.COL; j++) {
  				this.fieldArray[i][j]=0;
  				this.stage.removeChild(this.landedArr[i][j]);
  			}
  			// OFFSETING THE TETROMINOES
  			for (j=i; j>=0; j--) {
  				//if (this.fieldArray[j].indexOf(1) == -1) break;
  				for (let k=0; k<Tetris.COL; k++) {
  					if (this.fieldArray[j][k]==1) {
  						this.fieldArray[j][k]=0;
  						this.fieldArray[j+1][k]=1;
  						this.landedArr[j][k].y+=Tetris.SIZE;
  						this.landedArr[j+1][k]=this.landedArr[j][k];
  					}
  				}
  			}
  		}
  	}
  }
  onTime(){
  	if (this.canFit(this.tRow+1,this.tCol,this.currentRotation)) {
  		this.tRow++;
  		this.placeTetromino();
  	} else {
  		this.landTetromino();
  		this.generateTetromino();
  	}
  }
  // WILL DRAW THE NEXT TETROMINO
  drawNext() {
  	if (this.next_t) this.stage.removeChild(this.next_t);
  	this.next_t=new createjs.Shape();
  	this.next_t.x=Tetris.SIZE*(Tetris.COL+1);
  	this.next_t.y=Tetris.SIZE*1;
  	this.stage.addChild(this.next_t);
  	this.next_t.graphics.beginStroke('#111111');
  	for (let i=0; i<this.tetrominoes[this.nextTetromino][0].length; i++) {
  		for (let j=0; j<this.tetrominoes[this.nextTetromino][0][i].length; j++) {
  			if (this.tetrominoes[this.nextTetromino][0][i][j]==1) {
  				this.next_t.graphics.beginFill(colors[this.nextTetromino]);
  				this.next_t.graphics.drawRect(Tetris.SIZE*j,Tetris.SIZE*i,Tetris.SIZE,Tetris.SIZE);
  				this.next_t.graphics.endFill();
  			}
  		}
  	}
  	// ADD THE "NEXT" TEXT
  	// let nextTxt = new createjs.Text('NEXT', 'Bold 25px Helvetica', '#000000');
  	// nextTxt.x=Tetris.SIZE*(Tetris.COL+1);
  	// nextTxt.y=0;
  	// this.stage.addChild(nextTxt);
  }
  tick(){
  	this.stage.update();
  }



Tetris.ROW = 20;
Tetris.COL = 10;
Tetris.SIZE =24;

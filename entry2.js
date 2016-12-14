

document.addEventListener("DOMContentLoaded", function(){
   const canvas = document.getElementById("canvas");
  // const ctx = canvasEl.getContext("2d");
  let tetris = new Tetris(canvas).run();
  // new Tetris(ctx).start();

});



class Tetris {
  constructor(canvas){
    this.onkeydown =this.onkeydown.bind(this)
    this.active = [];
    this.dead = [];
    this.tetrisBlocks=[];
    this.backgorund;
    this.hid;
    this.activeTetris;
    this.nextTetrisBlock;
    this.nextTetrisBlock2;
    this.nextTetrisBlock3;
    this.nextTetrisBlock4;
    this.currentRotation;
    this.level = 1;
    this.currentTetrisRow;
    this.currentTetrisCol;
    this.timeCount;
    this.next_t;
    this.next_t2;
    this.next_t3;
    this.next_t4;
    this.pause = false;
    this.gameOver = false;
    this.bonus = false;
    this.row = 20;
    this.col = 10;
    this.size = 22;
    this.colors =[];
    this.canvas = canvas;
    this.score = 0;
    this.firstRenderOfScore = true;
    this.scoreNeededToLevel = 500;
    this.nextTetrisBlock2 =Math.floor(Math.random()*7);
    this.nextTetrisBlock3 =Math.floor(Math.random()*7);
    this.nextTetrisBlock4 =Math.floor(Math.random()*7);

  }
  run(){
    this.stage = new createjs.Stage(this.canvas);
    this.background();
    this.setTetris();
    this.nextTetrisBlock = Math.floor(Math.random()*7);
    this.renderTetris();
    createjs.Ticker.setFPS(100);
    createjs.Ticker.addEventListener("tick",this.stage);
    this.stage.update();
    let _this = this;
    window.addEventListener('keydown',_this.onkeydown);
    var startTxt = new createjs.Text(' s to start', 'Bold 14px Helvetica', '#000000');
    var resetTxt = new createjs.Text(' r to restart', 'Bold 14px Helvetica', '#000000');
    var arrowTxt = new createjs.Text(' arrow keys to move', 'Bold 14px Helvetica', '#000000');
    startTxt.x=this.size*(this.col+1);
    startTxt.y=360;
    resetTxt.x=this.size*(this.col+1);
    resetTxt.y=380;
    arrowTxt.x=this.size*(this.col+1);
    arrowTxt.y=400;
    this.stage.addChild(startTxt);
    this.stage.addChild(resetTxt);
    this.stage.addChild(arrowTxt)
  }



    background() {

    	let backgorund = new createjs.Shape();
    	this.hid = new createjs.Shape();
    	this.hid.graphics.beginFill('#ffffff');
    	this.hid.graphics.rect(0,this.size*2,this.size*this.col,this.size*(this.row));
    	backgorund.mask = this.hid;
    	backgorund.graphics.beginStroke('#000000');
    	for (let i = 0; i < this.row; i++) {
    		this.active[i] = [];
    		this.dead[i] = [];
    		for (let j = 0; j < this.col; j++) {
    			this.active[i][j]=0;
    			this.dead[i][j]=null;
          // var image = new Image();
          // image.onload = function(){
          //
          // }
          let block  = new createjs.Bitmap("./tetris_blocks2.0/dark_tetris2.0.png");
          // this.stage.addChild(this.block);
          // this.stage.update();

          // this.stage.addChild(this.block);
          let _this = this;
           block.image.onload = function() {

            _this.stage.update();
            backgorund.graphics.beginBitmapFill(block.image).rect(_this.size*j,_this.size*i,_this.size,_this.size);
            backgorund.graphics.endFill();
            // image.src = `tetris_blocks2.0/light_tetris2.0.png`;
            // _this.backgorund.graphics.beginFill(_this.backgorundColors[((j % 2) + (i % 2)) % 2], 0);
            _this.stage.addChild(backgorund);
            _this.stage.update();
          }
    			// this.backgorund.graphics.rect(this.size*j,this.size*i,this.size,this.size);
    		}
    	}
    }

  setTetris() {
  	this.tetrisBlocks[0]=[
      [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [1,0,0,0],
        [1,0,0,0],
        [1,0,0,0],
        [1,0,0,0]
      ]];
  	this.colors[0]="./tetris_blocks2.0/light_blue_tetris2.0.png";
  	this.tetrisBlocks[1]=[
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
  	this.colors[1]="./tetris_blocks2.0/purple_tetris2.0.png";
  	this.tetrisBlocks[2]=[
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
  	this.colors[2]="./tetris_blocks2.0/dark_blue_tetris2.0.png";
  	this.tetrisBlocks[3]=[
      [
        [0,0,0,0],
        [1,0,0,0],
        [1,1,1,0],
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
  	this.colors[3]="./tetris_blocks2.0/orange_tetris2.0.png";
  	this.tetrisBlocks[4]=[
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
  	this.colors[4]="./tetris_blocks2.0/red_tetris2.0.png";
  	this.tetrisBlocks[5]=[
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
  	this.colors[5]="./tetris_blocks2.0/green_tetris2.0.png";
  	this.tetrisBlocks[6]=[
      [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ]
    ];
  	this.colors[6]="./tetris_blocks2.0/yellow_tetris2.0.png";
  }
  check(row, col, rot) {
    let ct=this.activeTetris;
    for (let i=0; i<this.tetrisBlocks[this.activeTetris][this.currentRotation].length; i++) {
      for (let j=0; j<this.tetrisBlocks[this.activeTetris][this.currentRotation][i].length; j++) {
        if (this.tetrisBlocks[this.activeTetris][this.currentRotation][i][j]==1) {
          if (col+j<0 || (col + j > this.col - 1) || (row+i>this.row-1) || (this.active[row+i][col+j]==1) ){
             return false;
           }
        }
      }
    }
    return true;
  }
  renderTetris(time = 500){
  	if (this.gameOver) return;
  	this.activeTetris=this.nextTetrisBlock;
    this.nextTetrisBlock = this.nextTetrisBlock2;
    this.nextTetrisBlock2 = this.nextTetrisBlock3;
    this.nextTetrisBlock3 = this.nextTetrisBlock4;
    this.nextTetrisBlock4=Math.floor(Math.random()*7);
  	this.currentRotation=0;
  	this.currentTetrisRow=1;
  	this.currentTetrisCol=3;
  	this.drawTetrisBlock();
  	this.drawNext();
    this.drawNext2();
    this.drawNext3();
    this.drawNext4();
  	if (this.check(this.currentTetrisRow,this.currentTetrisCol,this.currentRotation)) {
  		clearTimeout(this.timeCount);
      let _this = this;
  		this.timeCount = setInterval(this.onTime.bind(this), (time - (this.level *75)));
  	} else {
  		this.gameOver=true;
  	}

  }
  drawTetrisBlock() {
  	let ct=this.activeTetris;
  	this.tetrisBlock = new createjs.Shape();




  	// this.stage.addChild(this.tetrisBlock);
  	// this.tetrisBlock.mask = this.masker;
  	this.tetrisBlock.graphics.beginStroke('#111111');
    for (var i=0; i<this.tetrisBlocks[ct][this.currentRotation].length; i++) {
      for (var j=0; j<this.tetrisBlocks[ct][this.currentRotation][i].length; j++) {
  			if (this.tetrisBlocks[ct][this.currentRotation][i][j]==1) {
  				// this.tetrisBlock.graphics.beginFill(this.colors[ct]);
  				// this.tetrisBlock.graphics.drawRect(this.size*j,this.size*i,this.size,this.size);
          this.block = new createjs.Bitmap(this.colors[ct]);
          // this.stage.addChild(this.block);
          let _this = this;
          this.block.image.onload = function() {
            _this.stage.update();
          }
          this.tetrisBlock.graphics.beginBitmapFill(this.block.image).rect(this.size*j,this.size*i,this.size,this.size);
          this.stage.addChild(this.tetrisBlock);

  			}
  		}
  	}
  	this.placeTetrisBlock();
    this.stage.update();
  }
  placeTetrisBlock() {
  	this.tetrisBlock.x=this.currentTetrisCol*this.size;
  	this.tetrisBlock.y=this.currentTetrisRow*this.size;
  }
  pause(){
    this.pause = true;
  }
  unPause(){
    this.pause = false;
  }
  onkeydown(e) {
  	switch (e.keyCode) {
      case 80:
        if(this.pause){
        this.pause();
      } else{
        this.unPause();
      }
      e.preventDefault();
      case 82:
        this.active = [];
        this.dead = [];
        this.tetrisBlocks=[];
        this.backgorund;
        this.hid;
        this.activeTetris;
        this.nextTetrisBlock;
        this.nextTetrisBlock2;
        this.nextTetrisBlock3;
        this.nextTetrisBlock4;
        this.currentRotation;
        this.currentTetrisRow;
        this.currentTetrisCol;
        this.timeCount;
        this.next_t;
        this.next_t2;
        this.next_t3;
        this.next_t4;
        this.pause = false;
        this.gameOver = false;
        this.bonus = false;
        this.firstRenderOfScore = true;
        this.colors =[];
        this.score =0;
        this.level=1;
        this.scoreNeededToLevel = 500;
        this.run();
      e.preventDefault();
      break;
      case 83:
        this.active = [];
        this.dead = [];
        this.tetrisBlocks=[];
        this.backgorund;
        this.hid;
        this.level =1;
        this.activeTetris;
        this.nextTetrisBlock;
        this.nextTetrisBlock2;
        this.nextTetrisBlock3;
        this.nextTetrisBlock4;
        this.currentRotation;
        this.currentTetrisRow;
        this.currentTetrisCol;
        this.timeCount;
        this.next_t;
        this.next_t2;
        this.next_t3;
        this.next_t4;
        this.pause = false;
        this.gameOver = false;
        this.bonus = false;
        this.firstRenderOfScore = true;
        this.colors =[];
        this.score =0;
        this.scoreNeededToLevel = 500;
        this.run();
      e.preventDefault();
      break;
  		case 37 :
  		if (this.gameOver || this.pause) return;
  		if (this.check(this.currentTetrisRow,this.currentTetrisCol-1,this.currentRotation)) {
  			this.currentTetrisCol--;
  			this.placeTetrisBlock();
  		}
  		e.preventDefault();
  		break;
  		case 39 :
  		if (this.gameOver || this.pause) return;
  		if (this.check(this.currentTetrisRow,this.currentTetrisCol+1,this.currentRotation)) {
  			this.currentTetrisCol++;
  			this.placeTetrisBlock();
  		}
  		e.preventDefault();
  		break;
  		case 38 :
  		if (this.gameOver || this.pause) return;
  		if (this.currentTetrisRow < 0) this.currentTetrisRow = 0;
  		if (this.currentTetrisCol < 0) this.currentTetrisCol = 0;
  		if (this.currentTetrisCol > this.col - this.tetrisBlocks[this.activeTetris][this.currentRotation].length)
  			this.currentTetrisCol = this.col - this.tetrisBlocks[this.activeTetris][this.currentRotation].length;
  		let ct=this.currentRotation;
  		let tmpRow = this.currentTetrisRow;
  		let tmpCol = this.currentTetrisCol;
  		let tmpRot = ct;
  		let rot = (ct + 1) % this.tetrisBlocks[this.activeTetris].length;
  		if (this.check(this.currentTetrisRow, this.currentTetrisCol, rot)) {
  			this.currentRotation=rot;
  			this.stage.removeChild(this.tetrisBlock);
  			this.drawTetrisBlock();
  			this.placeTetrisBlock();
  		}
  		if(!this.check(this.currentTetrisRow, this.currentTetrisCol, rot)) {
  			this.currentRotation = tmpRot;
  			this.currentTetrisCol = tmpCol;
  			this.currentTetrisRow = tmpRow;
  			this.stage.removeChild(this.tetrisBlock);
  			this.drawTetrisBlock();
  			this.placeTetrisBlock();
  		}
  		e.preventDefault();
  		break;
  		case 40 :
  		if (this.gameOver || this.pause) return;
  		if (this.check(this.currentTetrisRow+1,this.currentTetrisCol)) {
  			this.currentTetrisRow++;
  			this.placeTetrisBlock();
  		} else {
  			this.landTetrisBlock();
  			this.renderTetris();
  		}
  		e.preventDefault();
  		break;
          default:break;
  	}

  }
  landTetrisBlock(){
  	let ct=this.activeTetris;
  	let landed;
  	for (let i=0; i<this.tetrisBlocks[ct][this.currentRotation].length; i++) {
  		for (let j=0; j<this.tetrisBlocks[ct][this.currentRotation][i].length; j++) {
  			if (this.tetrisBlocks[ct][this.currentRotation][i][j]==1) {
  				landed = new createjs.Shape();
  				// landed.mask = this.masker;
          landed.graphics.beginStroke('#111111');
  				landed.graphics.beginFill(this.colors[this.activeTetris]);
  				landed.graphics.drawRect(this.size*(this.currentTetrisCol+j),this.size*(this.currentTetrisRow+i),this.size,this.size);
  				this.stage.addChild(landed);

  				this.active[this.currentTetrisRow+i][this.currentTetrisCol+j]=1;

  				this.dead[this.currentTetrisRow+i][this.currentTetrisCol+j]=landed;
  			}
  		}
  	}
  	this.stage.removeChild(this.tetrisBlock);

  	clearInterval(this.timeCount);
  	this.checkForLines();
  }
  checkForLines() {
    let count = 0;
  	for (let i=0; i<this.row; i++) {
  		if (this.active[i].indexOf(0) == -1) {
        count++;
  			for (let j=0; j<this.col; j++) {
  				this.active[i][j]=0;
  				this.stage.removeChild(this.dead[i][j]);
  			}
  			for (let j=i; j>=0; j--) {
  				for (let k=0; k<this.col; k++) {
  					if (this.active[j][k]==1) {
  						this.active[j][k]=0;
  						this.active[j+1][k]=1;
  						this.dead[j][k].y+=this.size;
  						this.dead[j+1][k]=this.dead[j][k];
  					}
  				}
  			}
  		}
  	}
      switch(count){
        case 1:
          this.score =this.score + 100;
          this.bonus = false;
          if(this.score >= this.scoreNeededToLevel){
            this.level =this.level + 1;
            this.scoreNeededToLevel = this.scoreNeededToLevel + 500;
          }
        break;
        case 2:
          this.score =this.score + 200;
          this.bonus = false;
          if(this.score >= this.scoreNeededToLevel){
            this.level =this.level + 1;
            this.scoreNeededToLevel = this.scoreNeededToLevel + 500;
          }
        break;
        case 3:
          this.score =this.score + 300;
          this.bonus = false;
          if(this.score >= this.scoreNeededToLevel){
            this.level =this.level + 1;
            this.scoreNeededToLevel = this.scoreNeededToLevel + 500;
          }
        break;
        case 4:
          if(this.bonus){
            this.score =this.score + 1200;
            this.level =this.level + 1;
            this.scoreNeededToLevel = this.scoreNeededToLevel + 500;
          } else{
            this.score =this.score + 800;
            this.level = this.level +1
            this.bonus = true;
          }
          if(this.score >= this.scoreNeededToLevel){
            this.level =this.level + 1;
            this.scoreNeededToLevel = this.scoreNeededToLevel + 500;
          }
        break;
        default:
        break;
      }

    }
  onTime(){
    if (this.pause){
      return;
    }
  	if (this.check(this.currentTetrisRow+1,this.currentTetrisCol,this.currentRotation)) {
  		this.currentTetrisRow++;
  		this.placeTetrisBlock();
  	} else {
  		this.landTetrisBlock();
  		this.renderTetris();
  	}
  }
  //draw next tetris
  drawNext() {
  	if (this.next_t) this.stage.removeChild(this.next_t);
  	this.next_t=new createjs.Shape();
  	this.next_t.x=this.size*(this.col+1);
  	this.next_t.y=this.size*1;
  	this.stage.addChild(this.next_t);
  	this.next_t.graphics.beginStroke('#111111');
  	for (let i=0; i < this.tetrisBlocks[this.nextTetrisBlock][0].length; i++) {
  		for (let j=0; j < this.tetrisBlocks[this.nextTetrisBlock][0][i].length; j++) {
  			if (this.tetrisBlocks[this.nextTetrisBlock][0][i][j]==1) {
          let block = new createjs.Bitmap(this.colors[this.nextTetrisBlock]);
          // this.stage.addChild(block);
          let _this = this;
          block.image.onload = function() {
            _this.stage.update();
            _this.next_t.graphics.beginBitmapFill(block.image).rect(_this.size*j,_this.size*i,_this.size,_this.size);
            _this.stage.addChild(_this.next_t);
            _this.stage.update();
          }




  				// this.next_t.graphics.beginFill(this.colors[this.nextTetrisBlock]);
  				// this.next_t.graphics.drawRect(this.size*j,this.size*i,this.size,this.size);
  				// this.next_t.graphics.endFill();
  			}
  		}
  	}
    // let clear = new createjs.Shape();
  	// clear.graphics.beginFill('#ffffff');
  	// clear.graphics.rect(0,this.size*2,this.size*this.col,this.size*(this.row));

    if(this.firstRenderOfScore){
      let score = ` score: ${this.score} level: ${this.level}`;
      this.scoreTxt = new createjs.Text(score, 'Bold 14px Helvetica', '#000000');
      this.scoreTxt.x=this.size*(this.col+1);
      this.scoreTxt.y=420;
      this.stage.addChild(this.scoreTxt);
      this.firstRenderOfScore = false;
    } else {
      this.scoreTxt.text = " score: "+this.score+ " level: "+this.level;
    }



  }
    drawNext2() {
      if (this.next_t2) this.stage.removeChild(this.next_t2);
      this.next_t2=new createjs.Shape();
      this.next_t2.x=this.size*(this.col+1);
      this.next_t2.y=this.size*4;
      this.stage.addChild(this.next_t2);
      this.next_t2.graphics.beginStroke('#111111');
      for (let i=0; i < this.tetrisBlocks[this.nextTetrisBlock2][0].length; i++) {
        for (let j=0; j < this.tetrisBlocks[this.nextTetrisBlock2][0][i].length; j++) {
          if (this.tetrisBlocks[this.nextTetrisBlock2][0][i][j]==1) {

             let block = new createjs.Bitmap(this.colors[this.nextTetrisBlock2]);
            // this.stage.addChild(block);
            let _this = this;
            block.image.onload = function() {
              _this.stage.update();
              _this.next_t2.graphics.beginBitmapFill(block.image).rect(_this.size*j,_this.size*i,_this.size,_this.size);
              _this.stage.addChild(_this.next_t2);
              _this.stage.update();
            }


            // this.next_t2.graphics.beginFill(this.colors[this.nextTetrisBlock2]);
            // this.next_t2.graphics.drawRect(this.size*j,this.size*i,this.size,this.size);
            // this.next_t2.graphics.endFill();
          }
        }
      }
    }
      drawNext3() {
        if (this.next_t3) this.stage.removeChild(this.next_t3);
        this.next_t3=new createjs.Shape();
        this.next_t3.x=this.size*(this.col+1);
        this.next_t3.y=this.size*8 ;
        this.stage.addChild(this.next_t3);
        this.next_t3.graphics.beginStroke('#111111');
        for (let i=0; i < this.tetrisBlocks[this.nextTetrisBlock3][0].length; i++) {
          for (let j=0; j < this.tetrisBlocks[this.nextTetrisBlock3][0][i].length; j++) {
            if (this.tetrisBlocks[this.nextTetrisBlock3][0][i][j]==1) {
              let block = new createjs.Bitmap(this.colors[this.nextTetrisBlock3]);
              // this.stage.addChild(block);
              let _this = this;
              block.image.onload = function() {
                _this.stage.update();
                _this.next_t3.graphics.beginBitmapFill(block.image).rect(_this.size*j,_this.size*i,_this.size,_this.size);
                _this.stage.addChild(_this.next_t3);
                _this.stage.update();
              }




              // this.next_t3.graphics.beginFill(this.colors[this.nextTetrisBlock3]);
              // this.next_t3.graphics.drawRect(this.size*j,this.size*i,this.size,this.size);
              // this.next_t3.graphics.endFill();
            }
          }
        }
      }
        drawNext4() {
          if (this.next_t4) this.stage.removeChild(this.next_t4);
          this.next_t4=new createjs.Shape();
          this.next_t4.x=this.size*(this.col+1);
          this.next_t4.y=this.size*12;
          this.stage.addChild(this.next_t4);
          this.next_t4.graphics.beginStroke('#111111');
          for (let i=0; i < this.tetrisBlocks[this.nextTetrisBlock4][0].length; i++) {
            for (let j=0; j < this.tetrisBlocks[this.nextTetrisBlock4][0][i].length; j++) {
              if (this.tetrisBlocks[this.nextTetrisBlock4][0][i][j]==1) {
                let block = new createjs.Bitmap(this.colors[this.nextTetrisBlock4]);
                // this.stage.addChild(block);
                let _this = this;
                block.image.onload = function() {
                  _this.stage.update();
                  _this.next_t4.graphics.beginBitmapFill(block.image).rect(_this.size*j,_this.size*i,_this.size,_this.size);
                  _this.stage.addChild(_this.next_t4);
                  _this.stage.update();
                }


                // this.next_t4.graphics.beginFill(this.colors[this.nextTetrisBlock4]);
                // this.next_t4.graphics.drawRect(this.size*j,this.size*i,this.size,this.size);
                // this.next_t4.graphics.endFill();
              }
            }
          }




        }


  tick(){
  	this.stage.update();
  }
}

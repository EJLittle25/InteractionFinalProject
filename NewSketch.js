var cols, rows;
var w= 18;
var grid = [];
let value = 0;
let rSlider, gSlider, bSlider;

function setup() {
    createCanvas(windowWidth,windowHeight);
    cols = floor(width/w);
    rows = floor(height/w);
    rSlider = createSlider(0, 255, 100);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, 255);
    bSlider.position(20, 80);

    for (var j = 0; j < rows; j++){
        for(var i= 0; i < cols; i++) {
            var cell = new Square(i*w,j*w, w, w);
            grid.push(cell);
        }
    }

}

function draw() {
    background(0);
    for (var i = 0; i < grid.length; i++) {
        grid[i].display();
        grid[i].hover(mouseX, mouseY);
                }
    fill(255,0,0);
    textSize(20);
    textStyle(BOLD);
    text('red', rSlider.x * 2 + rSlider.width, 28);
    text('green', gSlider.x * 2 + gSlider.width, 58);
    text('blue', bSlider.x * 2 + bSlider.width, 88);

    if(keyIsDown(UP_ARROW)){
        push();
        fill(0);
        rectMode(CENTER)
        rect(windowWidth - 100, windowHeight - 100, 200, 200);
        pop();
        text('Press c to clear', windowWidth-180, windowHeight - 150);
        text('Press Up for help', windowWidth-180, windowHeight - 120);
        text('Use the Sliders!', windowWidth-180, windowHeight - 90);
        text('Click or Drag', windowWidth-180, windowHeight - 60);
    }
}       

function keyTyped(){
if (key === 'c'){
   grid = []
   for (var j = 0; j < rows; j++){
    for(var i= 0; i < cols; i++) {
        var cell = new Square(i*w,j*w, w, w,);
        grid.push(cell);
            }
        }
    }
}

function mousePressed(){
    for (var i = 0; i < grid.length; i++) {
        grid[i].clicked(mouseX, mouseY);
             }
        }
function mouseDragged(){
    for (var i = 0; i < grid.length; i++) {
        grid[i].dragger(mouseX, mouseY);
    }
}



class Square{
    constructor(tempX, tempY, tempW, tempH){
        this.x = tempX; 
        this.y = tempY; 
        this.w = tempW; 
        this.h = tempH;
        this.over = false;
        this.isclicked = false;
        this.isdragged = false;
    }

    hover(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w/1.8){
            this.over = true;
            fill(255, 0, 0, 63)
        }else{
            this.over = false;
        }
    }
   
    clicked(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w/1.8){
            this.isclicked = true;
            fill(255, 0, 255);
        }
    }
    dragger(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w/2.0){
            this.isdragged= true;
            fill(255, 0, 255);
        }
    }

    display(){
        const r = rSlider.value();
        const g = gSlider.value();
        const b = bSlider.value();
        if(this.over){
            fill(r, g, b, 63);
        }else{
            fill(255);
        }
        if(this.isclicked){
            fill(r, g, b);
        }
        if(this.isdragged){
            fill(r, g, b);
        }
        rect(this.x, this.y, w, w)
        //this.isclicked = false;
    }


}
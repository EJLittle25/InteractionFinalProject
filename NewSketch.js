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
//Creates the sliders for changing the colors of the mosaic tiles.
    for (var j = 0; j < rows; j++){
        for(var i= 0; i < cols; i++) {
            var cell = new Square(i*w,j*w, w, w);
            grid.push(cell);
        }
    }
//Creates the grid necessary for the "mosaic" feel.

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
    //Adds text next to the sliders so you know which is which.

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
    //Pulls up a help menu if the up arrow is pressed. Tells instructions for clearing, sliders,
    //and how to draw.
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
    //Clears the entire board by pressing "c" for clear.
}

function mousePressed(){
    for (var i = 0; i < grid.length; i++) {
        grid[i].clicked(mouseX, mouseY);
             }
        }
//Fills in a square if the mouse is pressed 
function mouseDragged(){
    for (var i = 0; i < grid.length; i++) {
        grid[i].dragger(mouseX, mouseY);
    }
//Fills in squares quickly if mouse is dragged.
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
        //Temporarily fills a square with a lighter/darker version of the color that will
    //Generate when ptressed when hovered over.
   
    }

    clicked(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w/1.8){
            this.isclicked = true;
            fill(255, 0, 255);
        }

    //Triggers this.isclicked to equal true if the mouse is over a squared and clicked. This
    //Fills in the square
    }
    dragger(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w/2.0){
            this.isdragged= true;
            fill(255, 0, 255);
        }
    //Triggers this.isdragged to equal true if the mouse is over a squared and dragged. This
    //Fills in the square
    }

    display(){
        const r = rSlider.value();
        const g = gSlider.value();
        const b = bSlider.value();
        if(this.over){
            fill(r, g, b, 63);
            //Temporarily fills a square until mouse is moved or pressed.
        }else{
            fill(255);
        }
        if(this.isclicked){
            fill(r, g, b);
            //Fills in with color determine by slider
        }
        if(this.isdragged){
            fill(r, g, b);
            //Fills in with color determine by slider
        }
        rect(this.x, this.y, w, w)
        //Draws a rectangle
    }


}
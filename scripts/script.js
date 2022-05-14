const canvas= document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
let filling=false;
let painting=false;
canvas.height=CANVAS_SIZE;
canvas.width=CANVAS_SIZE;


ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth="2.5";
ctx.strokeStyle=INITIAL_COLOR;

function onMouseMove(event){
    x=event.offsetX;
    y=event.offsetY;
    console.log(ctx)
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
        console.log(painting);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    console.log(x,y)
}
function onMouseDown(){
    painting=true;
}
function stopPainting(){
    painting=false;
}
function startPainting(){
    painting=true;
}
function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}
function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;

}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
    
}
function handleModeClick(){
    if(filling===true){
        filling = false;
        mode.innerText = "Painting";
    }
    else{
        filling=true;
        mode.innerText = "Заливка"; 
        
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement("a");
    link.href=image;
    link.download = "PaintJS [Export].jpg";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener('mousedown',onMouseDown);
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM)
}
if(range){
    range.addEventListener("input",handleRangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick)
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

Array.from(colors).forEach(color=>color.addEventListener('click',changeColor))
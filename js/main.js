let ns = 'http://www.w3.org/2000/svg';
//работает только через ns

let isRect = false;
let isCircle = false;
let isSelect = false;
let isMove = false;

let isMouseDown = false;

window.onload = () => {   
    let svgCanvas = document.getElementById('svg');
    const canvas = document.getElementsByClassName('canvas')[0]; 

    const rectButton = document.getElementById('rect');
    const circleButton = document.getElementById('circle'); 
    const clearButton = document.getElementById('clear');
    const selectButton = document.getElementById('select');
    const moveButton = document.getElementById('move');

    svgCanvas = createCanvas();
    
function createCanvas(svgCanvas){
    svgCanvas = document.createElementNS(ns, 'svg');
    svgCanvas.setAttributeNS(null, 'width', window.outerWidth-100);
    svgCanvas.setAttributeNS(null, 'height', window.outerHeight-100);
    svgCanvas.setAttributeNS(null, 'id','svg');
    canvas.appendChild(svgCanvas);

    svgCanvas.addEventListener('mousedown', createRectEvents);    
    svgCanvas.addEventListener('mousedown', createCircleEvents);

    return svgCanvas;
}

rectButton.addEventListener('click', ()=>{
    isRect = true;
    isCircle = false;
    isMove = false;
    isSelect = false;
});
circleButton.addEventListener('click', ()=>{
    isRect = false;
    isCircle = true;
    isMove = false;
    isSelect = false;
});

clearButton.addEventListener('click', () =>{
    saveFigureProperties();
    canvas.removeChild(svgCanvas);
    createCanvas(svgCanvas);    

    svgCanvas = document.getElementById('svg');
});

selectButton.addEventListener('click', () =>{
    isRect = false;
    isCircle = false;
    isMove = false;
    isSelect = true;
});

moveButton.addEventListener('click', () =>{
    isRect = false;
    isCircle = false;
    isMove = true;
    isSelect = false;
})

function createRectEvents(e)
{
    if(!isRect) return;
    isMouseDown = true;
    let rect = document.createElementNS(ns, 'rect');
    rect.setAttributeNS(null, 'width', '1');
    rect.setAttributeNS(null, 'height', '1');
    rect.setAttributeNS(null, 'x', (e.offsetX).toString());
    rect.setAttributeNS(null, 'y', (e.offsetY).toString());
    rect.setAttributeNS(null, 'fill', '#FFFFFF');
    rect.setAttributeNS(null, 'stroke', '#000000');
    rect.setAttributeNS(null, 'stroke-width', 1);
    
    
    let shiftX = e.offsetX;
    let shiftY = e.offsetY;
    let origLoc = {X: e.offsetX, Y: e.offsetY};
    
    document.addEventListener('mousemove', onMouseMoveRect, false);
    svgCanvas.addEventListener('mouseup',onMouseUpRect);
    svgCanvas.appendChild(rect);
    
    function onMouseMoveRect(event) {
        let status = rect.getAttributeNS(null, 'class');
        if(isMouseDown && status == null) moveAtRect(event.offsetX, event.offsetY);           
    }      
    function moveAtRect(dX, dY){
        let height = dY - shiftY; 
        if(height<0){
            height = -height;
            dY = origLoc.Y - height;
            rect.setAttributeNS(null, 'y', (dY).toString()); 
        }        
        let width = dX - shiftX;
        if(width<0){
            width = -width;
            dX = origLoc.X - width;
            rect.setAttributeNS(null, 'x', (dX).toString());
        }
        rect.setAttributeNS(null, 'width', width.toString());
        rect.setAttributeNS(null, 'height', height.toString());
    }
    function onMouseUpRect(){
        isMouseDown = false;   
        rect.setAttributeNS(null, 'class', 'completed');
        if(isSelect)  
            rect.addEventListener('click', getPropertiesWindow);
            else rect.removeEventListener('click', getPropertiesWindow);


    }
    
    };

function createCircleEvents(e)
{
    if(!isCircle) return;
    isMouseDown = true;
    let circle = document.createElementNS(ns,'circle');
    circle.setAttributeNS(null, 'r', '1');
    circle.setAttributeNS(null, 'cx', (e.offsetX).toString());
    circle.setAttributeNS(null, 'cy', (e.offsetY).toString());
    circle.setAttributeNS(null, 'fill', 'white');
    circle.setAttributeNS(null, 'stroke', 'black');

    let shiftX = e.offsetX;
    let shiftY = e.offsetY;

    document.addEventListener('mousemove', onMouseMoveCircle, false);
    svgCanvas.addEventListener('mouseup',onMouseUpCircle);

    svgCanvas.appendChild(circle);

    function onMouseMoveCircle(event) {
        let status = circle.getAttributeNS(null, 'class');
        if(isMouseDown && status == null) moveAtCircle(event.offsetX, event.offsetY);           
    }      
    function moveAtCircle(offsetX, offsetY){
        let radius = Math.sqrt((offsetX-shiftX)**2+
        (offsetY-shiftY)**2); 
        circle.setAttributeNS(null, 'r', radius.toString());
    }
    function onMouseUpCircle(){
        isMouseDown = false;   
        circle.setAttributeNS(null, 'class', 'completed');  
    }
}
}

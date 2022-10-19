var ns = 'http://www.w3.org/2000/svg';
//работает только через ns

var isRect = false;
var isCircle = false;

var isMouseDown = false;

window.onload = () => {   
    var svgCanvas = document.getElementById('svg');
    const canvas = document.getElementsByClassName('canvas')[0]; 

    const rectButton = document.getElementById('rect');
    const circleButton = document.getElementById('circle'); 
    const clearButton = document.getElementById('clear');
    const emptyButton = document.getElementById('empty');

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
});
circleButton.addEventListener('click', ()=>{
    isRect = false;
    isCircle = true;
});

clearButton.addEventListener('click', () =>{
    canvas.removeChild(svgCanvas);
    createCanvas(svgCanvas);    

    svgCanvas = document.getElementById('svg');
});

emptyButton.addEventListener('click', () =>{
    isRect = false;
    isCircle = false;
})

function createRectEvents(e)
{
    if(!isRect) return;
    isMouseDown = true;
    var rect = document.createElementNS(ns, 'rect');
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
        var status = rect.getAttributeNS(null, 'class');
        if(isMouseDown && status == null) moveAtRect(event.offsetX, event.offsetY);           
    }      
    function moveAtRect(dX, dY){
        var height = dY - shiftY; 
        if(height<0){
            height = -height;
            dY = origLoc.Y - height;
            rect.setAttributeNS(null, 'y', (dY).toString()); 
        }        
        var width = dX - shiftX;
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
        rect.addEventListener('click', getPropertiesWindow);
    }
    
    };

function createCircleEvents(e)
{
    if(!isCircle) return;
    isMouseDown = true;
    var circle = document.createElementNS(ns,'circle');
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
        var status = circle.getAttributeNS(null, 'class');
        if(isMouseDown && status == null) moveAtCircle(event.offsetX, event.offsetY);           
    }      
    function moveAtCircle(offsetX, offsetY){
        var radius = Math.sqrt((offsetX-shiftX)**2+
        (offsetY-shiftY)**2); 
        circle.setAttributeNS(null, 'r', radius.toString());
    }
    function onMouseUpCircle(){
        isMouseDown = false;   
        circle.setAttributeNS(null, 'class', 'completed');  
    }
}
}

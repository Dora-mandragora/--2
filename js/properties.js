
/*
- цвет границы
- толщина границы
- цвет заливки
*/

function getProperties(edObj){
    let border = edObj.getAttributeNS(null,'stroke-width');
    let borderColor = edObj.getAttributeNS(null,'stroke'); 
    let color = edObj.getAttributeNS(null,'fill');
    
    return {border : border, borderColor : borderColor, color : color};
}

function setProperties(edObj, color, borderColor, border){
    edObj.setAttributeNS(null, 'fill', color);
    edObj.setAttributeNS(null, 'stroke', borderColor);
    edObj.setAttributeNS(null, 'stroke-width', border);
}

function showProperties(edObj){
    let props = getProperties(edObj); 

    let propDiv = document.createElement('div');
    propDiv.className = 'properties';
    document.body
    .insertAdjacentElement('beforeend',propDiv);
    
    //возможно стоит изменить - после тестирования
    let svgProps = document.createElementNS(ns, 'svg');
    let figureDiv = document.createElement('div');
    figureDiv.className = 'figure';
    figureDiv.insertAdjacentElement('beforeend',svgProps);


    let copyFigure = edObj.cloneNode();    
    copyFigure.id = 'copy-figure';
    copyFigure.setAttributeNS(null, 'x', 100);
    copyFigure.setAttributeNS(null, 'y', 50);
    let height = copyFigure.getAttributeNS(null, 'height');
    let width = copyFigure.getAttributeNS(null, 'width');
    let mtpl = 1;
    while(height>50) height*=0.9, mtpl++;
    width *= 0.9**mtpl;     
    while (width>100) width /= 1.2, height /= 1.2;
    copyFigure.setAttributeNS(null,'height',height);
    copyFigure.setAttributeNS(null,'width',width);
    svgProps.insertAdjacentElement('beforeend',copyFigure);
    propDiv.insertAdjacentElement('beforeend',figureDiv);


    let propTextDiv = document.createElement('div');
    propTextDiv.className = 'properties-more';
    propTextDiv.innerHTML = 
    `<div class = property> <label for = color>Color: </label> <input type="color" id = 'fill' value = ${props.color}> </div>` 
    +`<div class = property><label for = border>Border: </label><input type="color" id = 'border' value = ${props.borderColor}> </div>` 
    +`<div class = property><label for = border-width>Border width: </label>0<input type=range id = 'border-width' value = ${props.border} min = 0 max = 20>20 </div>`;
    propDiv.insertAdjacentElement('beforeend',propTextDiv);

    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'save-button';
    propDiv.insertAdjacentElement('beforeend',saveButton);


}


function getPropertiesWindow(e){
    e.target.id = 'select';
    let props = document.getElementsByClassName('properties')[0];
    if(props != null)
        props.remove();
    showProperties(e.target);    
   
    let saveButton = document.getElementById('save-button');
    saveButton.onclick = saveFigureProperties;

    let copyFigure = document.getElementById('copy-figure');
    setEvents(copyFigure);
     
};

function saveFigureProperties(){
    let edObj = document.getElementById('select');
    let color = document.getElementById('fill').value;
    let borderColor = document.getElementById('border').value;
    let border = document.getElementById('border-width').value;
    setProperties(edObj,color,borderColor,border);
    edObj.id = null;
    let props = document.getElementsByClassName('properties')[0];
    props.remove();

}



function setEvents(edObj){

    let colorInput = document.getElementById('fill');
    colorInput.addEventListener('change', changeColor); 
    let borderColorInput = document.getElementById('border');
    borderColorInput.addEventListener('change', changeBorderColor); 
    let borderInput = document.getElementById('border-width');
    borderInput.addEventListener('change', changeBorder); 
     

    function changeColor(e){
        edObj.setAttributeNS(null, 'fill',e.target.value);
    }
    function changeBorderColor(e){
        edObj.setAttributeNS(null, 'stroke',e.target.value);
    }
    function changeBorder(e){
        edObj.setAttributeNS(null, 'stroke-width',e.target.value);
    }
}


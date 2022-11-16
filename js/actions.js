/*
    - перемещение выделенного объекта
    - удаление выделенного объекта
*/

function dragObject(e){
    //e.target.id = 'moving';
    let activeEl = e.target; 
    let name = activeEl.nodeName;
    let shiftX, shiftY;
    let origLoc = {X: e.offsetX, Y: e.offsetY};
    if(name == 'rect'){
        shiftX = e.offsetX - activeEl.getAttributeNS(null, 'x');
        shiftY = e.offsetY - activeEl.getAttributeNS(null, 'y');    
    }    
    else{
        shiftX = e.offsetX - activeEl.getAttributeNS(null, 'cx');
        shiftY = e.offsetY - activeEl.getAttributeNS(null, 'cy'); 
    }


        function moveAt(offsetX, offsetY){
            if(name == 'rect'){
            activeEl.setAttributeNS(null, 'y', offsetY - shiftY); 
            activeEl.setAttributeNS(null, 'x',offsetX - shiftX);
            }
            else{
                activeEl.setAttributeNS(null, 'cy', offsetY - shiftY); 
                activeEl.setAttributeNS(null, 'cx',offsetX - shiftX);
            }
        }
        function onMouseMove(event) {
            moveAt(event.offsetX, event.offsetY);
            
        }        
        function onClickDragExit(){            
            document.removeEventListener('mouseup',onClickDragExit);
            document.removeEventListener('mousemove',onMouseMove);
            document.removeEventListener('keyup', cancelObject);
            document.removeEventListener('keyup', deleteObject); 
            activeEl.removeEventListener('mousedown', dragObject);
 
        }

        function cancelObject(e){   
            if(e.key == "Escape"){
                if(name == 'rect'){
                activeEl.setAttributeNS(null,'y', origLoc.Y - shiftY); 
                activeEl.setAttributeNS(null, 'x', origLoc.X - shiftX);
                }
                else{
                    activeEl.setAttributeNS(null,'cy', origLoc.Y - shiftY); 
                    activeEl.setAttributeNS(null, 'cx', origLoc.X - shiftX);     
                }
            onClickDragExit();
            }            
        }
        function deleteObject(e){
            if(e.key == "Delete"){
                activeEl.remove();
            onClickDragExit();
            }
        }

        document.addEventListener('keyup', cancelObject);
        document.addEventListener('keyup', deleteObject);  
        document.addEventListener('mousemove', onMouseMove);        
        document.addEventListener('mouseup', onClickDragExit);
}




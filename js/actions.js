/*
    - перемещение выделенного объекта
    - удаление выделенного объекта
*/

function dragObject(e){
    //e.target.id = 'moving';
    let activeEl = e.target; 
     
    let shiftX = e.offsetX;
    let shiftY = e.offsetY;
    let fpaxeX = e.pageX;
    let fpaxeY = e.pageY;

        function moveAt(pageX, pageY){
            activeEl.setAttributeNS(null, 'y', pageY - shiftY); 
            activeEl.setAttributeNS(null, 'x',pageX - shiftX);
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            
        }        
        function onClickDragExit(){            
            document.removeEventListener('mouseup',onClickDragExit);
            document.removeEventListener('mousemove',onMouseMove);
            document.removeEventListener('keyup', cancelObject);
            document.removeEventListener('keyup', deleteObject);  
 
        }

        function cancelObject(e){   
            if(e.key == "Escape"){
                activeEl.setAttributeNS(null,'y', fpaxeY - shiftY); 
                activeEl.setAttributeNS(null, 'x', fpaxeX - shiftX);
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




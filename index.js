const http = require('http');
const fs = require('fs');

    http.createServer(function(request,response){    
    
        response.setHeader("Content-Type", "text/html");

        fs.readFile('./index.html', function(err, html){
            if(err){
                  
                response.statusCode = 404;
                response.end("Resourse not found!");
            }   
            else{
                response.end(html);
            }
        });
        
    
    }).listen(3000,"127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});

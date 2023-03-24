import fs from "fs"
import http from "http"
import path from "path"

function movePageServerWriteHead(response,contentType,responseCode,path){
    fs.readFile(path,function(err,data ){
        if(err){
            response.writeHead(500,{"Content-Type":"text/plain"})
            response.end("500-에러나쓰요 인터넷에러")
        }else{
            response.writeHead(responseCode,{"Content-Type":contentType})
            response.end(data)
        }
    })
}

const app = http.createServer((req,res)=>{
    const url = req.url.split("?")[0]
    console.log(url)
    switch(url){
        case '/' :
            movePageServerWriteHead(res,"text/html",200,"./index.html")
            break
        default :
            movePageServerWriteHead(res,"text/html",404,"./404.html")
        }

})
app.listen(2080,err=>{
    if(err){
        console.log("에러나쓰요")
    } else{
        console.log("안나쓰요")
    }
})
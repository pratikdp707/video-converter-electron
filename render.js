const ipc = require('electron').ipcRenderer
const fs=require("fs")

const selectFileButton= document.getElementById("select-file")

const process = require("child_process")

var format='m3u8'

var dir="./output-media"

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}
let  videoForm=document.getElementById("videoForm")
let  project=document.getElementById("project")
let body = document.getElementsByTagName("body")[0]
function changePage()
{
project.style.display="none";
videoForm.style.display="block";
}


selectFileButton.addEventListener("click",()=>{
    ipc.send("openDialog")
})

ipc.on("selected-file",function(event,paths){

    console.log(event,paths)

    let info=document.getElementById("info")
        info.innerHTML=`
        <br/>
        <div id="info-id" class= "alert alert-success justify-content-center" style="width:500px; margin:auto; font-size:1rem; font-weight:500px">
        <p>Video is getting converted. Thanks for using our app</p>
        </div>`

    //converting proccess
    process.exec(`ffmpeg -i "${paths}" output-media/convertedvideo.m3u8`,
    function(error,stdout, stderr){
        console.log(stdout)

        let infoId=document.getElementById("info-id")
        infoId.style.display="none";
        
        Notification.requestPermission()
        .then(function(result){
            var notify =new Notification("Conversion Successfully Completed",{
                body:"Selected .mp4 is successfully converted into HLS format"
            } )
        })

        if(error){
            console.log(error)
        }
    })

})
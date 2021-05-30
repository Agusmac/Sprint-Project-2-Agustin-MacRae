const APIKEY = "e07ebX3PMa2lEvZbrG4m77OmMfvSSFS0";
const myGifsArray=JSON.parse(localStorage.getItem("myGifsArray") || "[]");

const creatorDiv=document.querySelector(".creator-div")
const num1 = document.querySelector(".num1")
const num2 = document.querySelector(".num2")
const num3 = document.querySelector(".num3")
const createbBoxText=document.querySelector(".create-box-Text")
const hr = document.querySelector(".creatorHR")
const videoTag = document.createElement("video");
videoTag.classList.add("videos");
const numbersDiv=document.querySelector(".numbers-div")


let myGifDownBut=document.createElement("div")
myGifDownBut.classList.add("myGiF-Down")
let downiconI=document.createElement("i")
downiconI.classList.add("fas")
downiconI.classList.add("fa-download")
myGifDownBut.insertAdjacentElement("afterbegin",downiconI)

const checkTick=document.createElement("img")
checkTick.src="IMG/check.svg"

const createButton = document.createElement("div");
createButton.classList.add("CreatorButton")
createButton.textContent="Comenzar"
createButton.addEventListener("click", startNewGif)

const tapeButton = document.createElement("div");
tapeButton.classList.add("CreatorButton")
tapeButton.textContent="Grabar"
tapeButton.addEventListener("click", tapeStart)

const stopButton = document.createElement("div");
stopButton.classList.add("CreatorButton")
stopButton.textContent="Finalizar"
stopButton.addEventListener("click", tapeStop)

const uploadButton = document.createElement("div");
uploadButton.classList.add("CreatorButton")
uploadButton.textContent="Subir Gifo"


const repeatTape = document.createElement("div");
repeatTape.classList.add("RepeatButton")
repeatTape.textContent="Repetir captura"
repeatTape.addEventListener("click", reload)



const uploadingDiv=document.createElement("div");
uploadingDiv.classList.add("uploadingDiv")


document.addEventListener("DOMContentLoaded", reload);


function reload() {

    createbBoxText.innerHTML="<h2>Aqui podras crear tus propios <span>GIFOS</span></h2><br><p>¡Crea tu GIFO en sólo 3 pasos! <br>(sólo necesitas una cámara para grabar un video)</p>"
    num2.classList.remove("Numbertoggler")
    hr.insertAdjacentElement("afterend", createButton)
    videoTag.remove()
    uploadButton.remove()
    repeatTape.remove()
}


function startNewGif(){
    createbBoxText.innerHTML= "<h2>¿Nos das acceso a tu cámara? </h2><br><p>El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>"
    num1.classList.add("Numbertoggler")
    num2.classList.remove("Numbertoggler")

    createButton.remove()

    // getMedia(video)
    getStreamAndRecord()

}

function getStreamAndRecord () {

    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
 })

 .then(function(stream) {
    createbBoxText.innerHTML=""
    hr.insertAdjacentElement("afterend", tapeButton)
    createbBoxText.insertAdjacentElement("afterbegin", videoTag)
    num1.classList.toggle("Numbertoggler")
    num2.classList.toggle("Numbertoggler")
    videoTag.srcObject = stream;
    videoTag.play()

    recorder = RecordRTC(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
       console.log('started')
    },
    });

 })
 .catch( () => {
   console.log("no camera detected")
     num1.classList.remove("Numbertoggler")
   createbBoxText.innerHTML= "<h2>No detectamos tu camara,<br> prueba recargando la pagina.</h2>"
 })

}







function tapeStart(){
  recorder.startRecording();
  console.log("started recording")
  tapeButton.remove()
  hr.insertAdjacentElement("afterend", stopButton)

}







function tapeStop(){
    recorder.stopRecording(function() {
           let blob = recorder.getBlob();
           invokeSaveAsDialog(blob);
           let form = new FormData();
           form.append('file', recorder.getBlob(), 'myGif.gif');
           console.log(form.get('file'))
           uploadButton.addEventListener("click", () =>{

             uploadGif(form)
           });

          myGifDownBut.addEventListener("click", () =>{

           invokeSaveAsDialog(blob);
          });


       });
    console.log("stop recording")
    stopButton.remove()




    hr.insertAdjacentElement("afterend", uploadButton)
    // numbersDiv.insertAdjacentElement("beforeend", repeatTape)
    numbersDiv.insertAdjacentElement("afterend", repeatTape)

}





function uploadGif(upGifData){

  uploadingDiv.innerHTML="<h2>Estamos subiendo tu GIFO</h2>"
  creatorDiv.insertAdjacentElement("beforeend", uploadingDiv)
  num3.classList.add("Numbertoggler")
  num2.classList.remove("Numbertoggler")

  uploadButton.remove()
  repeatTape.remove()
    console.log("uploading")


  const uploadUrl=`https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`;

  fetch(uploadUrl, {
    method: 'POST',
    body: (upGifData),

}).then(res => res.json())
  // }).then(res => {
  //     console.log(res.status)
  //     })

  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success:', response);
    console.log(response);
    let newgifID=response.data.id
    console.log(newgifID);
    myGifsArray.push(newgifID)


    localStorage.setItem("myGifsArray", JSON.stringify(myGifsArray))
    console.log(myGifsArray)
    console.log(JSON.parse(localStorage.getItem("myGifsArray")))




videoTag.remove()
uploadingDiv.innerHTML="<h2>GIFO subido con éxito</h2>"
uploadingDiv.insertAdjacentElement("afterbegin",checkTick)
uploadingDiv.insertAdjacentElement("beforeend",myGifDownBut)


})

}

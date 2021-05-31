var GIFARRAY=JSON.parse(localStorage.getItem("favGifArray") || "[]");

// const APIKEY = "e07ebX3PMa2lEvZbrG4m77OmMfvSSFS0";
// const myGifsArray=JSON.parse(localStorage.getItem("myGifsArray") || "[]");

//
// const MYGIFSARRAY=JSON.parse(localStorage.getItem("myGifsArray") || "[]");
// const MYGIFSARRAY=["KziixzACFPdducqB42","gFQJ3JHKEgQO6PmJvU","jRlP4zbERYW5HoCLvX","9gkwDaCB4pmoOe73x2","H6F9hJE7UeRi05GLQz","3hyAe7gBLdG80","psd81figbUjTATdtx5","7G6xr45trmzsc","LXH6tT5Q6MDFBRjYaC","gFQJ3JHKEgQO6PmJvU","AxZsOGPVDoVhjdueso","fTzV3m753QrFSkvrm5","VVtlbCuGiU68QWLaLj","1poTQPMLPQ2ekt01g4","kZu5IMsDPzHqlOpmme"]
// console.log(JSON.stringify(MYGIFSARRAY))

let MYGIFSARRAY=JSON.parse(localStorage.getItem("myGifsArray") || "[]");

const noResDiv= document.querySelector(".no-Results-Fav")
const verMasFavDiv=document.querySelector(".ver-mas-fav")
let moreButton= document.createElement("button")
moreButton.innerHTML = "Ver Mas"
moreButton.classList.add("verMasButton");
var limitAdd=0;
var gridLength=0;


// document.addEventListener("DOMContentLoaded", favoritesGifs(0));
document.addEventListener("DOMContentLoaded", getMyGifs(0));






function getMyGifs(startCall){

const ShowGifARRAY=[]

MYGIFSARRAY=JSON.parse(localStorage.getItem("myGifsArray") || "[]");

  // if(MYGIFSARRAY.length==0){
  //   noResultsFav()
  // }else{


let startCaller=startCall ||0

if(MYGIFSARRAY.length==0){
  noResultsFav()
}else{



for (var i = 0; i < MYGIFSARRAY.length; i++) {
console.log(MYGIFSARRAY[i])
const GIFID=MYGIFSARRAY[i]

let myGifosUrl=`https://api.giphy.com/v1/gifs/${GIFID}?&api_key=${APIKEY}`;

  console.log(myGifosUrl)
  fetch(myGifosUrl)
  .then(response => response.json())
  .then(mygifsdata => {

    console.log(mygifsdata)
      // gifCreator(trendGifData,".carousel-content",arrayLength,arrayStartPoint)
      ShowGifARRAY.push(mygifsdata.data)
      console.log(ShowGifARRAY)




      favoritesGifs(startCaller,ShowGifARRAY)
  })

}
}
  // }
}



function favoritesGifs(resultNumberAdd,CURRENTARRAY){
  console.log("test")
console.log(resultNumberAdd)
console.log(CURRENTARRAY)
document.querySelector(".favorites-grid").innerHTML=""
verMasFavDiv.innerHTML=""

if (CURRENTARRAY.length>=12) {
  gridLength=12+resultNumberAdd ||12
}else{
  gridLength=CURRENTARRAY.length
}

console.log(CURRENTARRAY.length)


// if(CURRENTARRAY.length==0){
//   noResultsFav()
// }else{
//   FavgifCreator(CURRENTARRAY,".favorites-grid",gridLength,0)
// }

FavgifCreator(CURRENTARRAY,".favorites-grid",gridLength,0)

}



function FavgifCreator(gifdata,where,arrayLength,startPoint){
    console.log(gifdata)

    // if (arrayLength>=12) {
    if (MYGIFSARRAY.length>12) {
      verMasFavDiv.insertAdjacentElement('afterbegin',moreButton)
    }

    const FAVELEMENT_POSITION = document.querySelector(where);

    for (let i = startPoint; i < arrayLength; i++) {



            let subtextDiv = document.createElement("div");
            subtextDiv.classList.add("subtext");
            let cardButtons = document.createElement("div");
            cardButtons.classList.add("card-buttons");
            let projectCardText = document.createElement("div");
            projectCardText.classList.add("project-card-text");
            // console.log(gifdata[i].username)
            let subtextParagraph = document.createElement("p");
            subtextParagraph.innerHTML= gifdata[i].username || "";
            // console.log(gifdata[i].username)
            let subtextH4 = document.createElement("h4");
            subtextH4.innerHTML= gifdata[i].title;

            let img = document.createElement("img");

            // Something went wrong with the object so why not a backup
            img.src = gifdata[i].images.downsized.url || gifdata[i].images.original.url;

            console.log(gifdata[i].images.downsized.url)
            console.log(gifdata[i].images.original.url)

            img.alt = gifdata[i].title;
            img.classList.add("result-grid-img");

            let fig = document.createElement("div");
            fig.classList.add("result-grid-gif");
            fig.appendChild(img)

            let heartBut = document.createElement("div");
            heartBut.classList.add("heart-but");
            let downloadBut = document.createElement("div");
            downloadBut.classList.add("download-but");
            let fullsizeBut = document.createElement("div");
            fullsizeBut.classList.add("fullsize-but");





            let heartIcon = document.createElement("i");
            heartIcon.classList.add("fa-trash-alt");
            heartIcon.classList.add("far");


            let downIcon =document.createElement("i");
            downIcon.classList.add("fa-download");
            downIcon.classList.add("fas");
            let fullIcon =document.createElement("i");
            fullIcon.classList.add("fa-expand-alt");
            fullIcon.classList.add("fas");

            // ELEMENT_POSITION.classList.add("display-child-fix");

            FAVELEMENT_POSITION.insertAdjacentElement("afterbegin",fig);
            fig.insertAdjacentElement("afterbegin",projectCardText);
            projectCardText.insertAdjacentElement("afterbegin",subtextDiv)
            projectCardText.insertAdjacentElement("afterbegin",cardButtons)
            subtextDiv.insertAdjacentElement("afterbegin",subtextParagraph)
            subtextDiv.insertAdjacentElement("beforeend",subtextH4)

            // BUTTONS
            cardButtons.insertAdjacentElement("afterbegin",  fullsizeBut)
            cardButtons.insertAdjacentElement("afterbegin",  downloadBut)
            cardButtons.insertAdjacentElement("afterbegin",  heartBut)
            heartBut.insertAdjacentElement("afterbegin",  heartIcon)
            downloadBut.insertAdjacentElement("afterbegin",  downIcon)
            fullsizeBut.insertAdjacentElement("afterbegin",    fullIcon)


            heartBut.addEventListener("click", likesAddFunct)

            function likesAddFunct(){
                  console.log(gifdata[i].id)
                  console.log(MYGIFSARRAY.includes(gifdata[i].id))
                  console.log(MYGIFSARRAY.indexOf(gifdata[i].id))
                  console.log(MYGIFSARRAY)
                  let deleteIndex = MYGIFSARRAY.indexOf(gifdata[i].id)
                  MYGIFSARRAY.splice(deleteIndex, 1);

                  console.log(MYGIFSARRAY)
                  localStorage.setItem("myGifsArray", JSON.stringify(MYGIFSARRAY))


                  getMyGifs(arrayLength)

          }


              img.addEventListener("click", fullsizer)

              fullsizeBut.addEventListener("click", fullsizer)


              function fullsizer(){

              fullsizedDiv.innerHTML=""
              fullsizedDiv.classList.add("fullsized-DIV-Open");
              let fullsizeImg=document.createElement("img");
              let fullsizeUser=document.createElement("p");
              let fullsizeTitle=document.createElement("h4");

              let infoDivFull=document.createElement("div");

              let exitFullIcon = document.createElement("i");
              let lastDiv=document.createElement("div");

              let heartButFulled = document.createElement("div");
              heartButFulled.classList.add("heart-but");
              let downloadButFulled = document.createElement("div");
              downloadButFulled.classList.add("download-but");


              let heartIconFulled = document.createElement("i");
              heartIconFulled.classList.add("fa-trash-alt");
              heartIconFulled.classList.add("far");


              let downIconFulled = document.createElement("i");
              downIconFulled.classList.add("fa-download");
              downIconFulled.classList.add("fas");

              let cardButtonsFulled = document.createElement("div");
              cardButtonsFulled.classList.add("card-buttons-fulled");
              infoDivFull.classList.add("infoDiv-Full")



              fullsizeImg.src = gifdata[i].images.original.url;
              fullsizeImg.alt = gifdata[i].title || "";
              fullsizeImg.classList.add("fullsized-IMG");

              fullsizeUser.textContent = gifdata[i].username || "";
              fullsizeTitle.textContent= gifdata[i].title || "";


              exitFullIcon.classList.add("fas");
              exitFullIcon.classList.add("fa-times");
              exitFullIcon.addEventListener("click", closeFullsize)

              lastDiv.classList.add("lastDiv");



              fullsizedDiv.insertAdjacentElement("beforeend",exitFullIcon)
              fullsizedDiv.insertAdjacentElement("beforeend",fullsizeImg)
              fullsizedDiv.insertAdjacentElement("beforeend",lastDiv)


              lastDiv.insertAdjacentElement("afterbegin", cardButtonsFulled)
              lastDiv.insertAdjacentElement("afterbegin", infoDivFull)


              cardButtonsFulled.insertAdjacentElement("afterbegin", downloadButFulled)
              cardButtonsFulled.insertAdjacentElement("afterbegin", heartButFulled)
              downloadButFulled.insertAdjacentElement("afterbegin", downIconFulled)
              heartButFulled.insertAdjacentElement("afterbegin", heartIconFulled)

              infoDivFull.insertAdjacentElement("afterbegin", fullsizeTitle)
              infoDivFull.insertAdjacentElement("afterbegin", fullsizeUser)

                heartButFulled.addEventListener("click", () =>{

                  closeFullsize()
                  likesAddFunct()



                  // esto cierra el fullsize al dar like

                  //
                })

              }










//
    }

}



moreButton.addEventListener("click",  () => {
limitAdd+=8
      getMyGifs(limitAdd)
      // moreButton.remove()
});

function noResultsFav() {

document.querySelector(".favorites-grid").innerHTML=""

  let noResultImg = document.createElement("img");
  noResultImg.src="IMG/icon-mis-gifos-sin-contenido.svg"
  noResultImg.classList.add("no-Result-img");

  let noResultH2 = document.createElement("h2");
  noResultH2.innerHTML = "¡Anímate a crear tu primer GIFO!"
  noResultH2.classList.add("no-Result-h2");

  noResDiv.insertAdjacentElement("afterbegin",noResultH2)
  noResDiv.insertAdjacentElement("afterbegin",noResultImg)
}





function closeFullsize() {
  fullsizedDiv.classList.remove("fullsized-DIV-Open");
  fullsizedDiv.innerHTML=""
}

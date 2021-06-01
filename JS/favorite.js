const noResDiv= document.querySelector(".no-Results-Fav")
const verMasFavDiv=document.querySelector(".ver-mas-fav")
let moreButton= document.createElement("button")
moreButton.innerHTML = "Ver Mas"
moreButton.classList.add("verMasButton");
var GIFARRAY=JSON.parse(localStorage.getItem("favGifArray") || "[]");
var limitAdd=0;
var gridLength=0;

document.addEventListener("DOMContentLoaded", favoritesGifs(0));



function favoritesGifs(resultNumberAdd){
// GIFARRAY=JSON.parse(localStorage.getItem("favGifArray") || "[]");
document.querySelector(".favorites-grid").innerHTML=""
verMasFavDiv.innerHTML=""

if (GIFARRAY.length>=12) {
  gridLength=12+resultNumberAdd ||12
}else{
  gridLength=GIFARRAY.length
}


if(GIFARRAY.length==0){
  noResultsFav()
}else{
  FavgifCreator(GIFARRAY,".favorites-grid",gridLength,0)
}


}


function FavgifCreator(gifdata,where,arrayLength,startPoint){
    console.log(gifdata)

    // if (arrayLength>=12) {
    if (GIFARRAY.length>12) {
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
            console.log(gifdata[i].username)
            let subtextParagraph = document.createElement("p");
            subtextParagraph.innerHTML= gifdata[i].username || "";
            console.log(gifdata[i].username)
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
                downloadBut.addEventListener("click",downloadEvent)

            let fullsizeBut = document.createElement("div");
            fullsizeBut.classList.add("fullsize-but");





            let heartIcon = document.createElement("i");
            heartIcon.classList.add("fa-heart");
            if (GIFARRAY.some(gifId => gifId.id === gifdata[i].id))  {
                heartIcon.classList.add("fas");
            }else{
              heartIcon.classList.add("far");
            }


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
      // if (GIFARRAY.includes(content[0])){
      // console.log(content[0].id)
     if (GIFARRAY.some(gifId => gifId.id === gifdata[i].id)){


    // console.log(GIFARRAY.findIndex(gifId => gifId.id === gifdata[i].id))
    // console.log((content[0]))
        // if (GIFARRAY.indexOf(content[0]) !== -1 ){

                let deleteIndex = GIFARRAY.findIndex(gifId => gifId.id === gifdata[i].id)
                GIFARRAY.splice(deleteIndex, 1);

                console.log("already in the gifarray")
                heartIcon.classList.remove("fas");
                heartIcon.classList.add("far");

              }else{

                GIFARRAY.push(gifdata[i])
                // console.log(GIFARRAY)

                heartIcon.classList.add("fas");
                heartIcon.classList.remove("far");
                // console.log(GIFARRAY.indexOf(content[0]))

              }

              // console.log(GIFARRAY)
              // console.log(JSON.parse(localStorage.getItem("favGifArray")))
              localStorage.setItem("favGifArray", JSON.stringify(GIFARRAY))
              favoritesGifs(arrayLength)
              // console.log(GIFARRAY)
              // console.log(JSON.parse(localStorage.getItem("favGifArray")))


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
              downloadButFulled.addEventListener("click",downloadEvent)

              let heartIconFulled = document.createElement("i");
              heartIconFulled.classList.add("fa-heart");

              if (GIFARRAY.some(gifId => gifId.id === gifdata[i].id))  {
                  heartIconFulled.classList.add("fas");
              }else{
                heartIconFulled.classList.add("far");
              }



              let downIconFulled = document.createElement("i");
              downIconFulled.classList.add("fa-download");
              downIconFulled.classList.add("fas");

              let cardButtonsFulled = document.createElement("div");
              cardButtonsFulled.classList.add("card-buttons-fulled");

              infoDivFull.classList.add("infoDiv-Full")



              fullsizeImg.src = gifdata[i].images.original.url;
              fullsizeImg.alt = gifdata[i].title;
              fullsizeImg.classList.add("fullsized-IMG");

              fullsizeUser.textContent = gifdata[i].username;
              fullsizeTitle.textContent= gifdata[i].title;


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
                    console.log(gifdata[i].username)
                  closeFullsize()
                  likesAddFunct()

                  heartIconFulled.classList.toggle("fas");
                  heartIconFulled.classList.toggle("far");


                  // esto cierra el fullsize al dar like

                  //
                })

              }

          

                  function downloadEvent(){

                              (async () => {
                                let a = document.createElement('a');
                                let response = await fetch(`${gifdata[i].images.original.url}`);
                                let file = await response.blob();
                                a.download = 'myGif';
                                a.href = window.URL.createObjectURL(file);
                                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                                a.click();
                              })();
                  }











//
    }

}



moreButton.addEventListener("click",  () => {
limitAdd+=8
      favoritesGifs(limitAdd)
      // moreButton.remove()
});

function noResultsFav() {

  let noResultImg = document.createElement("img");
  noResultImg.src="IMG/icon-fav-sin-contenido.svg"
  noResultImg.classList.add("no-Result-img");

  let noResultH2 = document.createElement("h2");
  noResultH2.innerHTML = "¡Guarda tu primer GIFO en Favoritos para que se muestre aqui!"
  noResultH2.classList.add("no-Result-h2");

  noResDiv.insertAdjacentElement("afterbegin",noResultH2)
  noResDiv.insertAdjacentElement("afterbegin",noResultImg)
}





function closeFullsize() {
  fullsizedDiv.classList.remove("fullsized-DIV-Open");
  fullsizedDiv.innerHTML=""
}

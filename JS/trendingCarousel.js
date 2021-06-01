

const fullsizedDiv = document.querySelector(".fullsized-DIV")
const APIKEY = "e07ebX3PMa2lEvZbrG4m77OmMfvSSFS0";
document.addEventListener("DOMContentLoaded", trendsgifs);
const leftArrowButton = document.querySelector("#left-arrow")
const rightArrowButton = document.querySelector("#right-arrow")
const trendingGifData = "";
var arrayLength=28;
var arrayStartPoint=25;












function trendsgifs() {

    document.querySelector(".carousel-content").innerHTML="";
    const trendUrl=`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`;
    console.log(trendUrl)
    fetch(trendUrl)
    .then(response => response.json())
    .then(trendGifData => {


        gifCreator(trendGifData,".carousel-content",arrayLength,arrayStartPoint)


    })
};

// function test(shown){
// console.log(shown)
// }






function gifCreator(gifdata,where,arrayLength,startPoint){
    console.log(gifdata)
    console.log(gifdata.data)

    console.log(where)

    const ELEMENT_POSITION = document.querySelector(where);

    for (let i = startPoint; i < arrayLength; i++) {



            let subtextDiv = document.createElement("div");
            subtextDiv.classList.add("subtext");
            let cardButtons = document.createElement("div");
            cardButtons.classList.add("card-buttons");
            let projectCardText = document.createElement("div");
            projectCardText.classList.add("project-card-text");

            let subtextParagraph = document.createElement("p");
            subtextParagraph.innerHTML= gifdata.data[i].username;

            let subtextH4 = document.createElement("h4");
            subtextH4.innerHTML= gifdata.data[i].title;

            let img = document.createElement("img");

            // Something went wrong with the object so why not a backup
            img.src = gifdata.data[i].images.downsized.url || gifdata.data[i].images.original.url;

            console.log(gifdata.data[i].images.downsized.url)
            console.log(gifdata.data[i].images.original.url)

            img.alt = gifdata.data[i].title;
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


downloadBut.addEventListener("click",downloadEvent)

function downloadEvent(){
            (async () => {
              let a = document.createElement('a');
              let response = await fetch(`${img.src}`);
              let file = await response.blob();
              a.download = 'myGif';
              a.href = window.URL.createObjectURL(file);
              a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
              a.click();
            })();
}









            let heartIcon = document.createElement("i");
            heartIcon.classList.add("fa-heart");
            if (GIFARRAY.some(gifId => gifId.id === gifdata.data[i].id))  {
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

            ELEMENT_POSITION.insertAdjacentElement("afterbegin",fig);
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
      // if (GIFARRAY.includes(content.data[0])){
      // console.log(content.data[0].id)
     if (GIFARRAY.some(gifId => gifId.id === gifdata.data[i].id)){


    // console.log(GIFARRAY.findIndex(gifId => gifId.id === gifdata.data[i].id))
    // console.log((content.data[0]))
        // if (GIFARRAY.indexOf(content.data[0]) !== -1 ){

                let deleteIndex = GIFARRAY.findIndex(gifId => gifId.id === gifdata.data[i].id)
                GIFARRAY.splice(deleteIndex, 1);

                console.log("already in the gifarray")
                heartIcon.classList.remove("fas");
                heartIcon.classList.add("far");

              }else{

                GIFARRAY.push(gifdata.data[i])
                // console.log(GIFARRAY)

                heartIcon.classList.add("fas");
                heartIcon.classList.remove("far");
                // console.log(GIFARRAY.indexOf(content.data[0]))

              }

              // console.log(GIFARRAY)
              // console.log(JSON.parse(localStorage.getItem("favGifArray")))
              localStorage.setItem("favGifArray", JSON.stringify(GIFARRAY))
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

              if (GIFARRAY.some(gifId => gifId.id === gifdata.data[i].id))  {
                  heartIconFulled.classList.add("fas");
              }else{
                heartIconFulled.classList.add("far");
              }

              //
              // heartIconFulled.classList.add("far");



              let downIconFulled = document.createElement("i");
              downIconFulled.classList.add("fa-download");
              downIconFulled.classList.add("fas");

              let cardButtonsFulled = document.createElement("div");
              cardButtonsFulled.classList.add("card-buttons-fulled");

              infoDivFull.classList.add("infoDiv-Full")



              fullsizeImg.src = gifdata.data[i].images.original.url;
              fullsizeImg.alt = gifdata.data[i].title;
              fullsizeImg.classList.add("fullsized-IMG");

              fullsizeUser.textContent = gifdata.data[i].username;
              fullsizeTitle.textContent= gifdata.data[i].title;


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
                  likesAddFunct()
                  heartIconFulled.classList.toggle("fas");
                  heartIconFulled.classList.toggle("far");
                      closeFullsize()
                })

              }










//
    }

}



leftArrowButton.addEventListener("click", leftScroll)
rightArrowButton.addEventListener("click", rightScroll)



function leftScroll(){
    arrayLength--
    arrayStartPoint--
    console.log(arrayLength)
    trendsgifs()
}
function rightScroll(){
    arrayLength++
    arrayStartPoint++
    trendsgifs()
}

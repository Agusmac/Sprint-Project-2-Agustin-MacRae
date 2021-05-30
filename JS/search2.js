// SEARCH / TRENDING-Words / SUGGESTIONS
const noResultDiv=document.querySelector(".noResult-div");
const searchFocus = document.querySelector("#search-bar");
const autoCompleteList = document.querySelector(".search-autocomplete");
var likeButtons = document.querySelectorAll(".heart-but")
const trendsDiv=document.querySelector(".trends");
const autoCompleteUl=document.querySelector(".autocom-list")
// const fullsizedDiv = document.querySelector(".fullsized-DIV")

// const APIKEY = "e07ebX3PMa2lEvZbrG4m77OmMfvSSFS0";
var errorCount=0;
var limitAdd=0;
// var GIFARRAY=JSON.parse(localStorage.getItem("favGifArray"))|| [];


var GIFARRAY=JSON.parse(localStorage.getItem("favGifArray") || "[]");



// LOCALSTORAGE

// localStorage.setItem("favGifArray", GIFARRAY )
// console.log(localStorage.getItem("favGifArray"))


function trendsWords() {
  const trendUrl=`https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`;
  // console.log(trendUrl)
  fetch(trendUrl)
  .then(response => response.json())
  .then(trendData => {

  for (var i = 0; i < 5; i++) {

    // console.log(trendData.data[i])
    const rawWord=trendData.data[i];
    const trendingKeyWords = document.createElement("p");
    trendingKeyWords.innerHTML = rawWord.charAt(0).toUpperCase() + rawWord.slice(1) +". ";
    trendingKeyWords.classList.add("trendingWords");
    trendsDiv.insertAdjacentElement("beforeend",trendingKeyWords)

    trendingKeyWords.addEventListener("click", () =>{
      // console.log(trendData.data)
      // console.log(trendData.data[i])
      const testwordTrend=trendingKeyWords.innerHTML
      document.getElementById("search-bar").innerHTML=testwordTrend.slice(0, -2)
      document.getElementById("search-bar").value=testwordTrend.slice(0, -2)
      search(0)
    })
  }
})

};




document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", resetInput);

function init(){

  trendsWords()
  document.getElementById('search-button').addEventListener("click",  () => {
    searchFocus.blur();
    search(0)

  });
  document.addEventListener('keypress', (e) => {

    if (e.key=="Enter") {

      console.log(e)
      searchFocus.blur();
      search(0)
    }
  });

}

function search(limitAdd){
    autoCompleteUl.innerHTML=""



  var limit=12+limitAdd;


  // RESETS The HTML and search Offset

  document.querySelectorAll('.verMasButton').forEach(function(a){
  a.remove()
  })
  var i=0;
  document.querySelector('.noResult-div').innerHTML = "";
  document.querySelector('.result-grid').innerHTML = "";
  document.querySelector('.Title-result').innerHTML = "";
  //

  let resultsGrid = document.querySelector('.result-grid');
  let str = document.getElementById("search-bar").value.trim();
  let titleOfResult = document.querySelector('.Title-result');
  let searchTitle = document.createElement("h2");
  let moreButton= document.createElement("button")
  moreButton.innerHTML = "Ver Mas"
  moreButton.classList.add("verMasButton");
  searchTitle.innerHTML = str.charAt(0).toUpperCase() + str.slice(1);
  let hr = document.createElement("hr");


for ( i = 0; i < limit; i++) {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&offset=${i}&q=`;
      url= url.concat(str);
        console.log(url);


    fetch(url)
    .then(response => response.json() )
    .then(content => {

      console.log(content.data);
      console.log("META", content.meta);

      let subtextDiv = document.createElement("div");
      subtextDiv.classList.add("subtext");
      let cardButtons = document.createElement("div");
      cardButtons.classList.add("card-buttons");
      let projectCardText = document.createElement("div");
      projectCardText.classList.add("project-card-text");
      let subtextParagraph = document.createElement("p");
      subtextParagraph.innerHTML = content.data[0].username;
      let subtextH4 = document.createElement("h4");
      subtextH4.innerHTML = content.data[0].title;
      let heartBut = document.createElement("div");
      heartBut.classList.add("heart-but");
      let downloadBut = document.createElement("div");
      downloadBut.classList.add("download-but");
      let fullsizeBut = document.createElement("div");
      fullsizeBut.classList.add("fullsize-but");
      let fig = document.createElement("div");
      let img = document.createElement("img");
      let heartIcon = document.createElement("i");

// check gif in array
      heartIcon.classList.add("fa-heart");




      if (GIFARRAY.some(gifId => gifId.id === content.data[0].id))  {
          heartIcon.classList.add("fas");
      }else{
        heartIcon.classList.add("far");
      }


      let downIcon = document.createElement("i");
      downIcon.classList.add("fa-download");
      downIcon.classList.add("fas");
      let fullIcon = document.createElement("i");
      fullIcon.classList.add("fa-expand-alt");
      fullIcon.classList.add("fas");


      // var heartLike = document.querySelector(".fa-heart");

// EVENT FAVORITE
    // console.log(JSON.parse(localStorage.getItem("favGifArray").indexOf(content.data[0])  );

    // if (JSON.parse(localStorage.getItem("favGifArray").includes(content.data[0]))) {
    //   heartIcon.classList.toggle("fas");
    //   heartIcon.classList.toggle("far");
    // }
    //


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
    heartIconFulled.classList.add("fa-heart");
    if (GIFARRAY.some(gifId => gifId.id === content.data[0].id))  {
        heartIconFulled.classList.add("fas");
    }else{
      heartIconFulled.classList.add("far");
    }

    // heartIconFulled.classList.add("far");

    let downIconFulled = document.createElement("i");
    downIconFulled.classList.add("fa-download");
    downIconFulled.classList.add("fas");

    let cardButtonsFulled = document.createElement("div");
    cardButtonsFulled.classList.add("card-buttons-fulled");

    infoDivFull.classList.add("infoDiv-Full")



    fullsizeImg.src = content.data[0].images.original.url;
    fullsizeImg.alt = content.data[0].title;
    fullsizeImg.classList.add("fullsized-IMG");

    fullsizeUser.textContent = content.data[0].username;
    fullsizeTitle.textContent=content.data[0].title;


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
      })

    }







    // SAVES FAVORITED GIFS,connect to LOCALSTORAGE


      heartBut.addEventListener("click", likesAddFunct)



      // console.log(GIFARRAY)
      // console.log(content.data[0])
      // console.log(JSON.parse(localStorage.getItem("favGifArray")))
      // console.log(giFosResults)


    // var storedNames = JSON.parse(localStorage.getItem("favGifArray")) ;
    // console.log(storedNames)

        // if (storedNames.includes(content.data[0])){



        function likesAddFunct(){
  // if (GIFARRAY.includes(content.data[0])){
  console.log(content.data[0].id)
 if (GIFARRAY.some(gifId => gifId.id === content.data[0].id)){


console.log(GIFARRAY.findIndex(gifId => gifId.id === content.data[0].id))
console.log((content.data[0]))
    // if (GIFARRAY.indexOf(content.data[0]) !== -1 ){

            let deleteIndex = GIFARRAY.findIndex(gifId => gifId.id === content.data[0].id)
            GIFARRAY.splice(deleteIndex, 1);

            console.log("already in the gifarray")
            heartIcon.classList.remove("fas");
            heartIcon.classList.add("far");

          }else{

            GIFARRAY.push(content.data[0])
            // console.log(GIFARRAY)

            heartIcon.classList.add("fas");
            heartIcon.classList.remove("far");
            // console.log(GIFARRAY.indexOf(content.data[0]))

          }

          console.log(GIFARRAY)
          console.log(JSON.parse(localStorage.getItem("favGifArray")))
          localStorage.setItem("favGifArray", JSON.stringify(GIFARRAY))
          console.log(GIFARRAY)
          console.log(JSON.parse(localStorage.getItem("favGifArray")))


      }



      img.src = content.data[0].images.downsized.url;
      img.alt = content.data[0].title;


      img.classList.add("result-grid-img");
      fig.classList.add("result-grid-gif");

      fig.appendChild(img)

      resultsGrid.insertAdjacentElement("afterbegin",fig)
      fig.insertAdjacentElement("afterbegin",projectCardText)
      projectCardText.insertAdjacentElement("afterbegin",subtextDiv)
      projectCardText.insertAdjacentElement("afterbegin",cardButtons)
      subtextDiv.insertAdjacentElement("afterbegin",subtextParagraph)
      subtextDiv.insertAdjacentElement("beforeend",subtextH4)
      // document.getElementById("search-bar").innerHTML = ""; limpia el input

      cardButtons.insertAdjacentElement("afterbegin",  fullsizeBut)
      cardButtons.insertAdjacentElement("afterbegin",  downloadBut)
      cardButtons.insertAdjacentElement("afterbegin",  heartBut)
      heartBut.insertAdjacentElement("afterbegin",  heartIcon)
      downloadBut.insertAdjacentElement("afterbegin",  downIcon)
      fullsizeBut.insertAdjacentElement("afterbegin",    fullIcon)



    })
    .catch(err=>{
      console.error(err);
      errorCount++
      errorSearch(errorCount)
    })

}

      // likes()
resultsGrid.insertAdjacentElement('afterend',moreButton)
titleOfResult.insertAdjacentElement('beforeend',searchTitle);
titleOfResult.insertAdjacentElement("afterbegin",hr);



// SEE MORE RESULTS
moreButton.addEventListener("click",  () => {
limitAdd+=8
      search(limitAdd)
      moreButton.remove()
});


  };
// } ----------? corchete init

function errorSearch(errors) {

      if (errors==12) {
        document.querySelector('.verMasButton').remove()
        // let noResultDiv = document.querySelector('.noResult-div');
        // noResultDiv.innerHTML= "<img class='noResult-Img'  src='IMG/icon-busqueda-sin-resultado.svg'>"+"<br>"+"<h2>THIS WORKS</h2>"

        let resultsGrid = document.querySelector('.result-grid');
        document.querySelector('.result-grid').innerHTML = "";
        let noResultImg = document.createElement("img");
        noResultImg.src="IMG/icon-busqueda-sin-resultado.svg"
        noResultImg.classList.add("no-Result-img");
        let noResultH2 = document.createElement("h2");
        noResultH2.innerHTML = "Intenta con otra búsqueda."
        noResultH2.classList.add("no-Result-h2");
        noResultDiv.insertAdjacentElement("afterbegin",noResultH2)
        noResultDiv.insertAdjacentElement("afterbegin",noResultImg)
        errorCount=0;
        // init()    ------------?va o no?
      }

}
// noResultH2.remove()
// noResultImg.







// SUGGESTIONS
searchFocus.addEventListener('input', () => {

    autoCompleteUl.innerHTML=""
    let searchWorded = document.getElementById("search-bar").value
    // console.log(searchWorded)
    const autoCompleteUrl=`https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&limit=10&q=${searchWorded}`;

    console.log(autoCompleteUrl)
    fetch(autoCompleteUrl)
    .then(response => response.json())
    .then(autoCompleteData => {

      autoCompleteUl.innerHTML=""
      for (var i = 0; i < autoCompleteData.data.length; i++) {
        let autoResults=autoCompleteData.data[i].name


        let autoListElement = document.createElement("li");
        autoListElement.textContent=autoResults;

          autoCompleteUl.insertAdjacentElement("beforeend",autoListElement)

          autoListElement.addEventListener("click", () =>{

            // const testwordTrend=trendingKeyWords.innerHTML
            document.getElementById("search-bar").innerHTML=autoListElement.textContent
            document.getElementById("search-bar").value=autoListElement.textContent
            search(0)
          })

      }
    })
});




function closeFullsize() {
  fullsizedDiv.classList.remove("fullsized-DIV-Open");
  fullsizedDiv.innerHTML=""
}
function resetInput(){
  document.getElementById("search-bar").value=""
}
function test(){
  console.log("IT WORKS")
}

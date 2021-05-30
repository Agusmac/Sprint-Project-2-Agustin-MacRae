// SEARCH / TRENDING-Words / SUGGESTIONS
const noResultDiv=document.querySelector(".noResult-div");
const searchFocus = document.querySelector("#search-bar");
const autoCompleteList = document.querySelector(".search-autocomplete");
var likeButtons = document.querySelectorAll(".heart-but")
const trendsDiv=document.querySelector(".trends");
const autoCompleteUl=document.querySelector(".autocom-list")
const fullsizedDiv = document.querySelector(".fullsized-DIV")

const APIKEY = "e07ebX3PMa2lEvZbrG4m77OmMfvSSFS0";
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
//



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
  let str = document.getElementById("search-bar").value.trim();



  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${limit}=&q=`;
  url = url.concat(str);
    console.log(url);



  fetch(url)
  .then(response => response.json() )
  .then(content => {

      gifCreator(content,".result-grid",limit,0)
  });

}




function gifCreator(gifdata,where,arrayLength,startPoint){







  console.log(gifdata)
  const ELEMENT_POSITIONERER = document.querySelector(where);

  let resultsGrid = document.querySelector('.result-grid');

  let titleOfResult = document.querySelector('.Title-result');
  let searchTitle = document.createElement("h2");
  let moreButton= document.createElement("button")
  moreButton.innerHTML = "Ver Mas"
  moreButton.classList.add("verMasButton");
  searchTitle.innerHTML = str.charAt(0).toUpperCase() + str.slice(1);
  let hr = document.createElement("hr");


  resultsGrid.insertAdjacentElement('afterend',moreButton)

    titleOfResult.insertAdjacentElement('beforeend',searchTitle);
    titleOfResult.insertAdjacentElement("afterbegin",hr);

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





                let heartIcon = document.createElement("i");
                heartIcon.classList.add("fa-heart");
                heartIcon.classList.add("far");
                let downIcon =document.createElement("i");
                downIcon.classList.add("fa-download");
                downIcon.classList.add("fas");
                let fullIcon =document.createElement("i");
                fullIcon.classList.add("fa-expand-alt");
                fullIcon.classList.add("fas");

                // ELEMENT_POSITION.classList.add("display-child-fix");

                ELEMENT_POSITIONERER.insertAdjacentElement("afterbegin",fig);
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


                // SAVES FAVORITED GIFS,connect to LOCALSTORAGE

                  heartBut.addEventListener("click", likesAddFunct)

                    function likesAddFunct(){

                if (GIFARRAY.includes(gifdata.data[i])){


                // if (GIFARRAY.indexOf(content.data[0]) !== -1 ){

                        const deleteIndex = GIFARRAY.indexOf(gifdata.data[i]);
                        GIFARRAY.splice(deleteIndex, 1);

                        console.log("already in the gifarray")
                        heartIcon.classList.toggle("fas");
                        heartIcon.classList.toggle("far");

                      }else{

                            console.log(gifdata.data[i])
                        GIFARRAY.push(gifdata.data[i])
                        // console.log(GIFARRAY)

                        heartIcon.classList.toggle("fas");
                        heartIcon.classList.toggle("far");
                        // console.log(GIFARRAY.indexOf(content.data[0]))

                      }

                      console.log(GIFARRAY)
                      console.log(JSON.parse(localStorage.getItem("favGifArray")))
                      localStorage.setItem("favGifArray", JSON.stringify(GIFARRAY))
                      console.log(GIFARRAY)
                      console.log(JSON.parse(localStorage.getItem("favGifArray")))


                  }
//


                }
//


// SEE MORE RESULTS
moreButton.addEventListener("click",  () => {
limitAdd+=8
      search(limitAdd)
      moreButton.remove()
});


}



      // likes()




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


// ADD LIKES EVENT




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

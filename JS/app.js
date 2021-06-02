
let DAYNIGHTSTATE=localStorage.getItem("dayNightState")|| 0;

const hamburger = document.querySelector(".burguerMenu");
const mobileMenu = document.querySelector(".mobile-menu");
// const mobileLinks = document.querySelector(".mobile-links");
const burguerIcon = document.querySelector(".fa-bars");
// const heartLike = document.querySelector(".fa-heart");
const nightButton =document.querySelector(".night-Button")
const carouselDiv=document.querySelector(".carousel-div")
const element=document.querySelector("body")
const h1=document.querySelector("h1")
const li=document.querySelector(".navigation")
const trends=document.querySelector(".trends")
const h2=document.querySelector("h2")
const searchBar=document.querySelector(".search-bar")
const resultsGrid=document.querySelector(".Title-result")



// OPENS AND CLOSES THE MOBILE MENU
hamburger.addEventListener("click",openCloseToggle)

document.querySelectorAll('.mobile-links').forEach(function(mobileCloseTog){
  mobileCloseTog.addEventListener("click", openCloseToggle)
})

function openCloseToggle(){
  mobileMenu.classList.toggle("open");
  burguerIcon.classList.toggle("fa-bars");
  burguerIcon.classList.toggle("fa-times");
}





// heartLike.addEventListener("click", () => {
//   heartLike.classList.toggle("fas");
//   heartLike.classList.toggle("far");
// });

//
// nightButtonMobile.addEventListener("click", () => {
//   element.classList.toggle("modoNoche");
//   carouselDiv.classList.toggle("carousel-night");
//
//     li.classList.toggle("navigation");
//   li.classList.toggle("modoNocheNavs");
//
//   h1.classList.toggle("modoNocheEtc");
//   trends.classList.toggle("modoNocheEtc");
//   h2.classList.toggle("modoNocheEtc");
//   searchBar.classList.toggle("modoNocheEtc");
//
// });


//
// document.querySelectorAll('#night-Button').forEach(function(nightog){
//   nightog.addEventListener("click", nightToggle);
// })

document.querySelectorAll('.night-Button').forEach(function(nightog){
  nightog.addEventListener("click", () => {
    if (DAYNIGHTSTATE==0) {

try {

    document.querySelector(".peliculaImg").src="IMG/pelicula-modo-noc.svg"
  document.querySelector(".camaraImg").src="IMG/camara-modo-noc.svg"
} catch (e) {
  console.log(e)
}


      localStorage.setItem("dayNightState", 1)
      DAYNIGHTSTATE=1;
        nightToggle()

    }else {
        DAYNIGHTSTATE=0

        try {


              document.querySelector(".peliculaImg").src="IMG/pelicula.svg"
              document.querySelector(".camaraImg").src="IMG/camara.svg"
        } catch (e) {
          console.log(e)
        }


      localStorage.setItem("dayNightState", 0)
        nightToggle()
    }

  });
})





if (DAYNIGHTSTATE==1) {

  try {

      document.querySelector(".peliculaImg").src="IMG/pelicula-modo-noc.svg"
    document.querySelector(".camaraImg").src="IMG/camara-modo-noc.svg"
  } catch (e) {
    console.log(e)
  }

  nightToggle()
}





function nightToggle() {



  element.classList.toggle("modoNoche");
  carouselDiv.classList.toggle("carousel-night");
  li.classList.toggle("navigation");
  li.classList.toggle("modoNocheNavs");
  h1.classList.toggle("modoNocheEtc");
  trends.classList.toggle("modoNocheEtc");
  h2.classList.toggle("modoNocheEtc");
  searchBar.classList.toggle("modoNocheEtc");





}

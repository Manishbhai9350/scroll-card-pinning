import { data } from "./data.js"

const lenis = new Lenis()

// Basic 
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// Lenis Scroll Trigger !(Remove These 3 Lines if there is no Scroll Trigger)
gsap.registerPlugin(ScrollTrigger)
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{lenis.raf(time * 1000)})
gsap.ticker.lagSmoothing(0)


const pinned = document.querySelector(".pinned")
const progressBar = document.querySelector(".progress-bar")
// const barItems = document.querySelector('.bar-items')

const cards = []
let isBarHidden = true
let currentCard = null

function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

function AddTrigger(){
  const tl = gsap.timeline({
    scrollTrigger:{
      trigger:pinned,
      start:"top top",
      end:`top -${cards.length * 100}%`,
      pin:true,
      scrub:true,
      // markers:true,
      onUpdate(n){
        let {progress} = n
        if(progress > .16) {
          let newProg = mapRange(progress,.16,1,0,1)
          let cardProg = Math.floor(mapRange(newProg,0,1,0,cards.length) + .2)

          // const barItems = document.querySelectorAll('.card-bar')
          
          const BarLine = document.querySelector('.progress-bar .bar .line')
          // const BarLineRect = BarLine.getBoundingClientRect()
          // barItems.forEach(barItem => {
          //   const barItemRect = barItem.getBoundingClientRect()
          //   const barLineTop = BarLineRect.top + BarLineRect.height
          //   const barItemTop = barItemRect.top 
          //   // console.log(barItemTop)
          //   const barItemAttr =  barItem.getAttribute('shown')
          //   if (barItemTop < barLineTop ) {
          //     if ( barItemAttr == 'false') {
          //       gsap.killTweensOf(barItem)
          //       gsap.set(barItem,{
          //         opacity:1
          //       })
          //     }
          //     barItem.setAttribute('shown','true')
          //   } else {
          //     if (barItemAttr == 'true') {
          //       gsap.killTweensOf(barItem)
          //       gsap.set(barItem,{
          //         opacity:.4
          //       })
          //     }
          //     barItem.setAttribute('shown','false')
          //   }
          // })

          

          gsap.set(BarLine,{
            height:`${newProg * 100}%`
          })
        }
      }
    }
  })

  tl.to('.pinned .heading',{
    opacity:0,
    duration:.3,
  })
  tl.to('.progress-bar',{
    opacity:1
  })

  cards.forEach((card,i)=> {
    tl.to(card,{
      top:`calc(45% + ${20 * i}px)`,
      ease:'none',
      rotation:0,
      opacity:1
    })
  })
  tl.to('.progress-bar',{
    opacity:0
  })
}

function ShowData(){
  data.forEach((item,i) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const para = document.createElement('p')
    para.innerHTML = item.name

    const imgWrapper = document.createElement('div')
    imgWrapper.classList.add('img')
    const img = document.createElement('img')
    img.src = item.img
    imgWrapper.appendChild(img)

    card.append(para,imgWrapper)
    pinned.appendChild(card)
    cards.push(card)


    // const CardBar = document.createElement('div')
    // CardBar.classList.add('card-bar')
    // const BarItem = document.createElement('div')
    // BarItem.classList.add('bar-item')
    // BarItem.innerHTML = `
    //   <h3>${item.name}</h3>
    //   <p>${item.type}</p>
    // `

    // CardBar.appendChild(BarItem)
    // barItems.appendChild(CardBar)
    // CardBar.setAttribute('bar-item',i+1)

    // gsap.set(CardBar,{
    //   opacity:.4
    // })

    gsap.set(card,{
      top:'155%',
      opacity:0,
      rotate:Math.random() * 15 - 15
    })
  })
}

ShowData()
AddTrigger()
// Usage: getRandomInt(6)
// Outputs a random number between 1 and max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

// Goal: Roll the dice, and keep a running log of roll history by player

// RECIPE (algorithm) – do not modify the HTML!

// Store a reference to the roll button in memory

let roll = document.querySelector(`#roll-button`)

// Listen for the clicking of the roll button, when clicked:

          // roll.addEventListener(`click`, async function(event){
          //   alert(`the button was clicked!`)
          // })

  // - Ignore the roll button's default behavior

roll.addEventListener(`click`, async function(event){
  event.preventDefault()

  let random1 = getRandomInt(6) 
  let random2 = getRandomInt(6) 
  let total = random1 + random2

            let die1 = document.querySelector(`.die1`)
            die1.setAttribute(`src`, `../images/dice/${random1}.png`)

            let die2 = document.querySelector(`.die2`)
            die2.setAttribute(`src`, `../images/dice/${random2}.png`)

            let nameInput = document.querySelector(`#player`)
            let name = nameInput.value


   

  // - Make sure the player's name is filled out; if it is:

            if(name.length > 0){
               let sentence = `Congratulations ${name}, you earned a ${total}!`
               let list = document.querySelector(`.result`)   
               list.insertAdjacentHTML(`beforeend`, `
                  <li>${sentence}</li>
               `)             
            }
            else{
              let sentence = `Congratulations, you earned a ${total}!`
              let list = document.querySelector(`.result`)
              list.insertAdjacentHTML(`beforeend`, `
                <li>${sentence}</li>
              `)
            }
    // - Form a sentence in memory, containing the player's name and the total that was rolled

    // - Store a reference to the "result" un-ordered list element

    // - Insert the sentence to the "result" un-ordered list as a list item (li)

  })
import characterData from "./data.js"
import Character from "./Character.js"

document.getElementById("attack-button").addEventListener("click", attack)

let monsterArray = ["goblin", "demon", "orc"]

function getNextMonster(){
    const nextMonster = characterData[monsterArray.shift()]
    return monsterArray.length >= 0? new Character(nextMonster) : {}
}

function reload(){
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

function nextRound(){
    const nextEmoji = "🥊"
    const nextRound = document.getElementById("next-round")
    nextRound.classList.add("show")
    nextRound.innerHTML = `
        <h2>Next round</h2>
        <h3>You are fighting ${monster.name}</h3>
        <p class="end-emoji">${nextEmoji}</p>
    `
    setTimeout(() => {
        nextRound.classList.remove("show")
        nextRound.innerHTML = ` `
    }, 2000);  
    
}

function endGame(){
    const endMessage = wizard.dead && monster.dead && monsterArray.length === 0 ? "No victors - all creatures are dead"
        : wizard.dead ? `The ${monster.name} is Victorious ` 
        : `You win`
    const endEmoji = wizard.dead ? "☠️" : "🪄"   
    const endImg = wizard.dead && !monster.dead ? monster.avatar 
    : !wizard.dead && monster.dead ? wizard.avatar 
    : "lose.jpg" 
    document.body.innerHTML = `
    <div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <img class="avatar" src="img/${endImg}">
        <p class="end-emoji">${endEmoji}</p>        
        <button id="reload-button" onClick="window.location.reload(true)">Reload</button>
    </div>
    `
}

const wizard = new Character(characterData.hero)
let monster = getNextMonster()

function attack() {        
    wizard.setRandomDiceHtml()
    monster.setRandomDiceHtml()
    wizard.setDamageCharacter(monster)
    monster.setDamageCharacter(wizard)
    if(wizard.dead){
        document.getElementById("attack-button").disabled = true
        setTimeout(() => {
            endGame()
        }, 1500)
    }
    else if(monster.dead){
        document.getElementById("attack-button").disabled = true
        if(monsterArray.length > 0){
            setTimeout(() => {
                monster = getNextMonster()
                wizard.diceHtml = wizard.getPlaceholderDiceHtml()
                nextRound() 
                reload()
                document.getElementById("attack-button").disabled = false 
            }, 1500);  
                         
        }            
        else{
            document.getElementById("attack-button").disabled = true
            setTimeout(() => {
                endGame()
            }, 1500)
        }
    }
    reload()
}

reload()

class Character{
    constructor(data){
        Object.assign(this, data)
        this.diceHtml = this.getPlaceholderDiceHtml()
        this.maxHealth = this.health
    }

    getPlaceholderDiceHtml(){
        return new Array(this.diceCount).fill(0).map(() => '<div class="placeholder-dice"></div>').join('')
    }
    getRandomArray(){
        return new Array(this.diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
    }
    setRandomDiceHtml(){
        this.currentDiceRoll = this.getRandomArray()
        this.diceHtml =  this.currentDiceRoll.map(num => `<div class="dice">${num}</div>`).join('')
    }

    setDamageCharacter(data){
        this.health -= data.currentDiceRoll.reduce((prev, current) => prev + current)
        if(this.health <= 0){
            this.health = 0
            this.dead = true
        }
    }

    getHealthBar(){
        let percent = this.health / this.maxHealth * 100
        return `<div class="health-bar-outer">
                <div class="health-bar-inner ${percent < 25 ? "danger" : ""}" style="width: ${percent}%"></div>
            </div>`
    }

    getCharacterHtml(){
        const {name, avatar, health, currentDiceRoll, diceCount, diceHtml} = this
        
        return `
            <div class="character-card">
                <h4 class="name">${name}</h4>
                <img class="avatar" src=img/${avatar}>
                <div class="health">health: <b> ${health}</b></div>
                ${this.getHealthBar()}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>
        `
    }
}

export default Character
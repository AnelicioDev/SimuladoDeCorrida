const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 5,
    PONTOS: 0
}
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 3,
    PODER: 4,
    PONTOS: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
    let random = Math.random()
    let resut
    switch (true) {
        case random < 0.33:
            resut = "RETA"
            break;
        case random < 0.66:
            resut = "CURVA"
            break
        default:
            resut = "CONFRONTO"
    }

    return resut
}

async function logRollResult(charName, block, dice, attribut) {
    console.log(`${charName} 🎲 Rolou um dado de ${block} ${dice} + ${attribut} = ${dice + attribut}`)
}

async function playerRaceEgine(char1, char2) {
    //Habilidades
    let totaSkill1 = 0
    let totaSkill2 = 0
    let roud = 1

    while (roud <= 5) {
        //rolar dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        let block = await getRandomBlock()
        console.log(`🏁 Rodada - ${roud}`)
        console.log(`Bloco - ${block}`)

        if (block === "RETA") {
            totaSkill1 = diceResult1 + char1.VELOCIDADE
            totaSkill2 = diceResult2 + char2.VELOCIDADE

            await logRollResult(char1.NOME, "Velocidade⚡", diceResult1, totaSkill1)
            await logRollResult(char2.NOME, "Velocidade⚡", diceResult2, totaSkill2)

        } else if (block === "CURVA") {
            totaSkill1 = diceResult1 + char1.MANOBRABILIDADE
            totaSkill2 = diceResult2 + char2.MANOBRABILIDADE

            await logRollResult(char1.NOME, "Manobrabilidade🪄 ", diceResult1, totaSkill1)
            await logRollResult(char2.NOME, "Manobrabilidade🪄 ", diceResult2, totaSkill2)

        } else {
            totaSkill1 = diceResult1 + char1.PODER
            totaSkill2 = diceResult2 + char2.PODER

            await logRollResult(char1.NOME, "Poder✨ ", diceResult1, totaSkill1)
            await logRollResult(char2.NOME, "Poder✨ ", diceResult2, totaSkill2)
        }

        if (totaSkill1 > totaSkill2) {
            console.log(char1.NOME + "❤️ Marcou ponto!")
            char1.PONTOS++
        } else if (totaSkill2 > totaSkill1) {
            console.log(char2.NOME + "💚 Marcou ponto!")
            char2.PONTOS++
        }

        console.log("----------------------------------------------------------------")

        roud++
    }

}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    )
    await playerRaceEgine(player1, player2)
})()


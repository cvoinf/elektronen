namespace SpriteKind {
    export const elektron = SpriteKind.create()
}
let l = 0
let lquadrat = 0
let dy = 0
let dx = 0
let mySprite: Sprite = null
let list: Sprite[] = []
list = sprites.allOfKind(SpriteKind.elektron)
let Reibung = 0.85
let Abprallfaktor = -0.75
let HoeheElektronSprite = 0.5
let BreiteElektronSprite = 0.5
// Es werden 100 Elektronen erzeugt und in einer Liste abgespeichert
for (let index = 0; index < 100; index++) {
    mySprite = sprites.create(img`
        5 4 
        4 5 
        `, SpriteKind.elektron)
    mySprite.setPosition(randint(85000, 95000) / 1000, randint(45000, 55000) / 1000)
    mySprite.setVelocity(0, 0)
    mySprite.setBounceOnWall(false)
    mySprite.setStayInScreen(false)
    list.push(mySprite)
}
mySprite.setImage(img`
    2 2 
    2 2 
    `)
game.onUpdateInterval(0.1, function () {
    // Die Reibung sorgt dafür, dass die Elektronen sich nach einiger Zeit beruhigen.
    for (let Wert of list) {
        if (Wert.x > scene.screenWidth() - 10) {
            Wert.vx = Abprallfaktor * Wert.vx
            Wert.x = scene.screenWidth() - (10 - BreiteElektronSprite)
        } else if (Wert.x < 10) {
            Wert.vx = Abprallfaktor * Wert.vx
            Wert.x = 10 + BreiteElektronSprite
        }
        Wert.vx = Reibung * Wert.vx
        if (Wert.y > scene.screenHeight() - 10) {
            Wert.vy = Abprallfaktor * Wert.vy
            Wert.y = scene.screenHeight() - (10 - HoeheElektronSprite)
        } else if (Wert.y < 10) {
            Wert.vy = Abprallfaktor * Wert.vy
            Wert.y = 10 + HoeheElektronSprite
        }
        Wert.vy = Reibung * Wert.vy
    }
    // Jedes Elektron wird durch alle anderen beschleunigt, und zwar in entgegengesetzte Richtung, in Abhängigkeit vom Abstand
    for (let Wert of list) {
        Wert.ax = 0
        Wert.ay = 0
        for (let Wert2 of list) {
            if (Wert != Wert2) {
                dx = Wert.x - Wert2.x
                dy = Wert.y - Wert2.y
                lquadrat = dx * dx + dy * dy
                l = Math.sqrt(lquadrat)
                if (lquadrat != 0) {
                    Wert.ax += 500 / lquadrat * (dx / l)
                    Wert.ay += 500 / lquadrat * (dy / l)
                }
            }
        }
    }
})
forever(function () {
	
})

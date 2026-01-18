namespace SpriteKind {
    export const elektron = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Temperatur += 100
    mySprite.sayText("" + convertToText(Temperatur) + "°C", 1000, false)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Temperatur > 100) {
        Temperatur += -100
        mySprite.sayText("" + convertToText(Temperatur) + "°C", 1000, false)
    }
})
let l = 0
let lquadrat = 0
let dy = 0
let dx = 0
let mySprite: Sprite = null
let Temperatur = 0
let list: Sprite[] = []
list = sprites.allOfKind(SpriteKind.elektron)
let Reibung = 0.85
let Abprallfaktor = -1 * Reibung
Temperatur = 201
let Ladung = 500
let Rand = 5
// Es werden 100 Elektronen erzeugt und in einer Liste abgespeichert
for (let index = 0; index < 100; index++) {
    mySprite = sprites.create(img`
        5 4 
        4 5 
        `, SpriteKind.elektron)
    mySprite.setPosition(randint(85000, 95000) / 1000, randint(45000, 55000) / 1000)
    mySprite.setVelocity(0, 0)
    list.push(mySprite)
}
mySprite.setImage(img`
    2 2 
    2 2 
    `)
controller.moveSprite(mySprite)
game.onUpdate(function () {
    for (let Wert of list) {
        if (Wert.x > scene.screenWidth() - Rand) {
            Wert.vx = Abprallfaktor * Wert.vx
            Wert.x = 2 * (scene.screenWidth() - Rand) - Wert.x
        } else if (Wert.x < 0 + Rand) {
            Wert.vx = Abprallfaktor * Wert.vx
            Wert.x = 2 * (0 + Rand) - Wert.x
        }
        if (Wert.y > scene.screenHeight() - Rand) {
            Wert.vy = Abprallfaktor * Wert.vy
            Wert.y = 2 * (scene.screenHeight() - Rand) - Wert.y
        } else if (Wert.y < Rand) {
            Wert.vy = Abprallfaktor * Wert.vy
            Wert.y = 2 * (0 + Rand) - Wert.y
        }
        Wert.vx = Reibung * Wert.vx
        Wert.vy = Reibung * Wert.vy
        Wert.vx += (randint(0, Temperatur) - Temperatur / 2) / 100
        Wert.vy += (randint(0, Temperatur) - Temperatur / 2) / 100
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
                    Wert.ax += Ladung / lquadrat * (dx / l)
                    Wert.ay += Ladung / lquadrat * (dy / l)
                }
            }
        }
    }
})
forever(function () {
	
})

namespace SpriteKind {
    export const elektron = SpriteKind.create()
}
let l = 0
let dy = 0
let dx = 0
let mySprite: Sprite = null
let list: Sprite[] = []
list = sprites.allOfKind(SpriteKind.elektron)
// Es werden 100 Elektronen erzeugt und in einer Liste abgespeichert
for (let index = 0; index < 100; index++) {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 4 . . . . . . . 
        . . . . . . . 4 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.elektron)
    mySprite.setPosition(randint(0, 10), randint(0, 10))
    mySprite.setVelocity(0, 0)
    mySprite.setBounceOnWall(true)
    mySprite.setStayInScreen(true)
    list.push(mySprite)
}
mySprite.setImage(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
controller.moveSprite(mySprite, 100, 100)
forever(function () {
    // Die Reibung sorgt dafür, dass die Elektronen sich nach einiger Zeit beruhigen.
    for (let Wert of list) {
        Wert.vx = 0.5 * Wert.vx
        Wert.vy = 0.5 * Wert.vy
    }
    // Jedes Elektron wird durch alle anderen beschleunigt, und zwar in entgegengesetzte Richtung, in Abhängigkeit vom Abstand
    for (let Wert of list) {
        Wert.ax = 0
        Wert.ay = 0
        for (let Wert2 of list) {
            if (Wert != Wert2) {
                dx = Wert.x - Wert2.x
                dy = Wert.y - Wert2.y
                l = Math.sqrt(dx * dx + dy * dy)
                if (Wert.x != Wert2.x) {
                    Wert.ax += 500 / ((Wert.x - Wert2.x) * (Wert.x - Wert2.x)) * (dx / l)
                }
                if (Wert.y != Wert2.y) {
                    Wert.ay += 500 / ((Wert.y - Wert2.y) * (Wert.y - Wert2.y)) * (dy / l)
                }
            }
        }
    }
})

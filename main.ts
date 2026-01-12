namespace SpriteKind {
    export const elektron = SpriteKind.create()
}
let l = 0
let dy = 0
let dx = 0
let mySprite: Sprite = null
let list: Sprite[] = []
list = sprites.allOfKind(SpriteKind.elektron)
for (let index = 0; index < 100; index++) {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 5 . . . . . . . 
        . . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 5 5 . . . . . . 
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
    list.push(mySprite)
}
forever(function () {
    for (let Wert of list) {
        Wert.vx = 0.85 * Wert.vx
        Wert.vy = 0.85 * Wert.vy
    }
    for (let Wert of list) {
        if (Wert.x > scene.screenWidth()) {
            Wert.vx = -1 * Wert.vx
            mySprite.x = scene.screenWidth()
        }
        if (Wert.x < 0) {
            Wert.vx = -1 * Wert.vx
            mySprite.x = 0
        }
        if (Wert.y > scene.screenHeight()) {
            Wert.vy = -1 * Wert.vy
            mySprite.y = scene.screenHeight()
        }
        if (Wert.y < 0) {
            Wert.vy = -1 * Wert.vy
            mySprite.y = 0
        }
    }
    for (let Wert of list) {
        Wert.ax = 0
        Wert.ay = 0
        for (let Wert2 of list) {
            if (Wert != Wert2) {
                dx = Wert.x - Wert2.x
                dy = Wert.y - Wert2.y
                l = Math.sqrt(dx * dx + dy * dy)
                if (Wert.x != Wert2.x) {
                    Wert.ax += 100 / ((Wert.x - Wert2.x) * (Wert.x - Wert2.x)) * (dx / l)
                }
                if (Wert.y != Wert2.y) {
                    Wert.ay += 100 / ((Wert.y - Wert2.y) * (Wert.y - Wert2.y)) * (dy / l)
                }
            }
        }
    }
})

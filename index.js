import {Board} from "./Board.js";
import {moveDown, moveLeft, moveRight, moveUp} from "./move.js";


export const SIZE = 4
const app = document.getElementById("app")
const counter = document.getElementById("counter")
const reset = document.getElementById("reset")


const board = new Board(SIZE)
export let matrix = board.matrix

board.getMatrix()

const getValue=()=> {
    return Math.random() > 0.75 ? 4 : 2;
}

const getBoxPosition=()=> {
    do {
        const posX = Math.floor(Math.random() * SIZE)
        const posY = Math.floor(Math.random() * SIZE)
        if (matrix[posY][posX] === 0) {
            matrix[posY][posX] = getValue()
            break
        }
    } while (true)
}



const gameOver=()=> {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (matrix[i][j] === 0) {
                return false
            }
        }
    }
    for (let i = 0; i < SIZE - 1; i++) {
        for (let j = 0; j < SIZE - 1; j++) {
            let number = matrix[i][j]
            if (matrix[i][j] !== 0 && (matrix[i + 1][j] === number || matrix[i][j + 1] === number)) {
                return false
            }
        }
    }
    return true
}

getBoxPosition()

const creatBoard=()=> {
    for (let i = 0; i < SIZE; i++) {
        const tr = document.createElement("tr")
        app.append(tr)
        tr.classList.add("tr")
        for (let j = 0; j < SIZE; j++) {
            const td = document.createElement("td")
            tr.append(td)
            td.classList.add("td")
            if (matrix[i][j] !== 0) {
                td.innerHTML = matrix[i][j]

                matrix[i][j] === 2 ? td.setAttribute("style", `background-color: #f8e020`) : false
                matrix[i][j] === 4 ? td.setAttribute("style", `background-color: #f6c040`) : false
                matrix[i][j] === 8 ? td.setAttribute("style", `background-color: #f8b404`) : false
                matrix[i][j] === 16 ? td.setAttribute("style", `background-color: #f39961`) : false
                matrix[i][j] === 32 ? td.setAttribute("style", `background-color: #fc6103`) : false
                matrix[i][j] === 64 ? td.setAttribute("style", `background-color: #f86444`) : false
                matrix[i][j] === 128 ? td.setAttribute("style", `background-color: #ff380d`) : false
                matrix[i][j] === 256 ? td.setAttribute("style", `background-color: #e6fa66`) : false
                matrix[i][j] === 512 ? td.setAttribute("style", `background-color: #d3fa06`) : false
                matrix[i][j] === 1024 ? td.setAttribute("style", `background-color: #4efdee`) : false
                matrix[i][j] === 2048 ? td.setAttribute("style", `background-color: #00ffe6`) : false
            }

        }
    }
}
creatBoard()
const getCounter=()=> {
    let sum = 0
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            sum = matrix[i][j] + sum
        }
    }
    counter.textContent =   "points: " + sum
}
getCounter()




const restartTheGame=()=> {
    app.innerHTML = null
    matrix = board.matrix
    board.getMatrix()
    getBoxPosition()
    creatBoard()
    getCounter()
}

reset.addEventListener("click",  restartTheGame)






addEventListener("keydown", e => key(e.keyCode))

const key=(event)=> {
    let check = true
    switch (event) {
        case 40:
            check = moveDown();
            break
        case 38:
            check = moveUp();
            break
        case 37:
            check = moveLeft();
            break
        case 39:
            check = moveRight();
            break
        default:
            return;
    }
    if (gameOver()) {
        alert("game over")
    }
    if (check) {
        app.innerHTML = null

        getBoxPosition()
        creatBoard()
        getCounter()
    }

}



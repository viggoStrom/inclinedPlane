/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = canvas.height * 16 / 10

const plane = new inclinedPlane(15)
const box = new body(10, 0.5)
const physics = new engine(plane, box)

const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    physics.update()

    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)
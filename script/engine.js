/** @type {HTMLCanvasElement} */


class engine {
    constructor(plane, ...bodies) {
        this.plane = plane
        this.bodies = bodies
        this.gravity = .08
    }

    updateChildren = () => {
        this.plane.update()

        this.bodies.forEach(box => {
            box.update()
        });
    }

    setboxAngles = () => {
        this.bodies.forEach(box => {
            box.angle = this.plane.angle
        });
    }

    forcesAndVelocity = () => {
        this.bodies.forEach(box => {
            const Fg = box.mass * this.gravity
            let F1 = Math.sinD(box.angle) * Fg
            const F2 = Math.cosD(box.angle) * Fg
            const Ff = box.mu * F2

            box.force.F1.x += F1 / Math.sinD(box.angle)
            box.force.F1.y += F1 / Math.cosD(box.angle)
            box.force.Ff.x += Ff / Math.sinD(box.angle)
            box.force.Ff.y += Ff / Math.cosD(box.angle)

            if (Ff > F1) {
                F1 = 0
            }
            else if (F1 > Ff) {
                F1 -= Ff
            }

            if (!box.collided) {
                box.velocity.x -= F1
                box.velocity.y += F2
            }
            else if (box.collided) {
                box.velocity.x -= F1 / Math.sinD(box.angle)
                box.velocity.y += F1 / Math.cosD(box.angle)
            }
        });
    }

    planeHeightAt = (x) => {
        const k = -Math.sinD(this.plane.angle)
        const m = plane.startHeight
        return k * x + m
    }

    checkCollisionWithPlane = () => {
        this.bodies.forEach(box => {
            if (!box.collided && box.position.y >= this.planeHeightAt(box.position.x + box.size.width)) {
                box.collided = true
                this.setboxAngles()
                box.velocity.x = 0
                box.velocity.y = 0
            }
        });
    }

    applyVelocities = () => {
        this.bodies.forEach(box => {
            box.position.x += box.velocity.x
            box.position.y += box.velocity.y
        });
    }

    // placeBoxes = () => {
    //     this.bodies.forEach(box => {
    //         box.position.x = Math.cosD(this.plane.angle + 15) * canvas.width * .8
    //         box.position.y = Math.sinD(this.plane.angle + 15) * canvas.height
    //     });
    // }

    initiate = () => {
        // this.placeBoxes()
    }

    adjustPlane = (type) => {
        switch (type) {
            case "angleUp":
                this.plane.angle += 1
                break;

            case "angleDown":
                this.plane.angle -= 1
                break;

            default:
                break;
        }
    }

    update = () => {
        this.checkCollisionWithPlane()

        this.forcesAndVelocity()
        this.applyVelocities()

        this.updateChildren()
    }
}
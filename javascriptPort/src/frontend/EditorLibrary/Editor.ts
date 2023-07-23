import { useState } from "react";

interface IObject {
    width: number;
    height: number;
    x: number;
    y: number;
    color?: string;
    beingDragged?: boolean;
}

class EditorLib {
    shapes: Array<IObject>;
    c: CanvasRenderingContext2D;
    width: number;
    height: number;
    constructor(canvas: HTMLCanvasElement) {
        const newRect: IObject = {
            width: 100.0,
            height: 100.0,
            x: 0.0,
            y: 0.0,
            color: 'white',
            beingDragged: false
        };
        const newRect2: IObject = {
            width: 100.0,
            height: 100.0,
            x: 200.0,
            y: 200.0,
            color: 'white',
            beingDragged: false
        };
        this.shapes = [newRect, newRect2];
        this.c = (canvas.getContext("2d") as CanvasRenderingContext2D);
        this.c.shadowBlur = 6;
        this.c.shadowColor = "black";
        this.width = canvas.width;
        this.height = canvas.height;
        this.draw()
        canvas.onmousemove = ((e: MouseEvent) => {this.mouseMove(e)});
        canvas.onmousedown = ((e: MouseEvent) => {this.mouseDown(e)});
        canvas.onmouseup = ((e: MouseEvent) => {this.mouseUp(e)});
        this.c.clearRect(0, 0, this.width, this.height);
        // this.drawBoard()
    }

    mouseUp(e: MouseEvent) {
        for(let i = 0;i < this.shapes.length; i++) {
            const shape = this.shapes[i];
            if(shape.beingDragged) {
                this.shapes[i].beingDragged = false;
            }
        }
    }
    mouseDown(e: MouseEvent) {
        for(let i = 0;i < this.shapes.length; i++) {
            const shape = this.shapes[i];
            if(e.clientX > shape.x && e.clientX < shape.x + shape.width && e.clientY > shape.y && e.clientY < shape.y + shape.height) {
                this.shapes[i].beingDragged = true;
            }
        }

    }
    mouseMove(e: MouseEvent) {
        for(let i = 0;i < this.shapes.length; i++) {
            const shape = this.shapes[i];
            if(shape.beingDragged) {
                this.shapes[i].x = e.clientX - (this.shapes[i].width / 2);
                this.shapes[i].y = e.clientY - (this.shapes[i].height / 2);
            }
        }
        this.draw()

    }

    drawBoard() {
        for(let i = 0; i < this.width; i += 40) {
            this.c.moveTo(i, 0);
            this.c.lineTo(i, this.height);
        }
        for(let i = 0; i < this.height; i += 40) {
            this.c.moveTo(0, i);
            this.c.lineTo(this.width, i);
        }
        this.c.strokeStyle = "rgb(117, 118, 120)";
        this.c.stroke()
    }

    draw() {
        this.c.clearRect(0, 0, this.width, this.height);
        this.shapes.forEach((shape) => {
            if(shape.color){
                this.c.fillStyle = shape.color;
            }
            this.c.fillRect(shape.x, shape.y, shape.width, shape.height);
            this.c.shadowOffsetX = 3
            this.c.shadowBlur = 52
            this.c.shadowOffsetY = 3
            this.c.shadowColor = "black"
        });
    };
};

export default EditorLib;
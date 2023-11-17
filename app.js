const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

const colorButton = document.getElementById("color-button");
const widthButton = document.getElementById("width-button");
const resetButton = document.getElementById("reset-button");
const eraseButton = document.getElementById("erase-button");
const saveButton = document.getElementById("save-button");
const drawButton = document.getElementById("draw-button");
const circleButton = document.getElementById("circle-button");
const triangleButton = document.getElementById("triangle-button");
const rectangleButton = document.getElementById("rectangle-button");
const sizeInput = document.getElementById("size-input");

let isMouseDown = false;
let isErasing = false;
let selectedShape = "circle";
let isShapeSelected = false;

const init = () => {
    canvasContext.lineWidth = 3;
    widthButton.value = 3;
    canvasContext.strokeStyle = selectedColor
    canvasContext.lineCap = "round";
};

circleButton.addEventListener("click", () => {
    selectedShape = "circle";
    isShapeSelected = true;
});

triangleButton.addEventListener("click", () => {
    selectedShape = "triangle";
    isShapeSelected = true;
});

rectangleButton.addEventListener("click", () => {
    selectedShape = "rectangle";
    isShapeSelected = true;
});

drawButton.addEventListener("click", () => {
    isErasing = false;
});

eraseButton.addEventListener("click", () => {
    isErasing = true;
});

const drawLine = (x, y) => {
    if (isErasing) {
        canvasContext.globalCompositeOperation = "destination-out";
    } else {
        canvasContext.globalCompositeOperation = "source-over";
    }

    canvasContext.lineTo(x, y);
    canvasContext.stroke();
};

const getMousePosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseXPosition = event.clientX - rect.left;
    const mouseYPosition = event.clientY - rect.top;
    return { mouseXPosition, mouseYPosition };
};

canvas.addEventListener("mousemove", (event) => {
    const {mouseXPosition, mouseYPosition} = getMousePosition(event);
    
    if (isMouseDown) {
        drawLine(mouseXPosition,mouseYPosition)
    }
});

canvas.addEventListener("mousedown", (event) => {
    const {mouseXPosition, mouseYPosition} = getMousePosition(event);
    isMouseDown = true;
    canvasContext.beginPath();
	canvasContext.moveTo(mouseXPosition, mouseYPosition);
});
   
canvas.addEventListener("mouseup", (event) => {
    isMouseDown = false;
});

colorButton.addEventListener("input", (event) => {
    const selectedColor = event.target.value;
    console.log(selectedColor);
    canvasContext.strokeStyle = selectedColor;
});

widthButton.addEventListener("input", (event) => {
    const selectedWidth = event.target.value;
    console.log(selectedWidth);
    canvasContext.lineWidth = selectedWidth;
});

resetButton.addEventListener("click", () =>{
    canvasContext.reset();
    init();
});

saveButton.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas_image.png";
    link.click();
});

canvas.addEventListener("click", (event) => {
    if (isShapeSelected) {
        const { mouseXPosition, mouseYPosition } = getMousePosition(event);
        
        switch (selectedShape) {
            case "circle":
                drawCircle(mouseXPosition, mouseYPosition, parseInt(sizeInput.value, 10));
                break;
            case "triangle":
                drawTriangle(mouseXPosition, mouseYPosition, parseInt(sizeInput.value, 10));
                break;
            case "rectangle":
                drawRectangle(mouseXPosition, mouseYPosition, parseInt(sizeInput.value, 10));
                break;
            default:
                break;
        }
    }
});

function drawCircle(x, y, radius) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
    canvasContext.stroke();
}

function drawTriangle(x, y, size) {
    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
    canvasContext.lineTo(x + size, y);
    canvasContext.lineTo(x + size / 2, y - Math.sqrt(3) * size / 2);
    canvasContext.closePath();
    canvasContext.stroke();
}

function drawRectangle(x, y, size) {
    canvasContext.beginPath();
    canvasContext.rect(x, y, size, size);
    canvasContext.stroke();
}

init();

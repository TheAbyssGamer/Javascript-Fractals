//Canvas creation
var canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
canvas.className = "fractals-border";

document.body.appendChild(canvas);
var context = canvas.getContext("2d");

var mbrotMaxIterations = 100;


//Fractals generation
function checkIfBelongsToMandelbrotSet(x, y) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = 100;
    for(var i = 0; i < mbrotMaxIterations; i++) {
            var tempRealComponent = realComponentOfResult * realComponentOfResult
                                    - imaginaryComponentOfResult * imaginaryComponentOfResult
                                    + x;
            var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                                    + y;
            realComponentOfResult = tempRealComponent;
            imaginaryComponentOfResult = tempImaginaryComponent;

            // Return a number as a percentage
            if(realComponentOfResult * imaginaryComponentOfResult > 5) 
            return (i/maxIterations * 100);
    }
    return 0;   // Return zero if in set        
} 


//Mbrot declaration
var magnificationFactor = 300;
var panX = 2;
var panY = 1.5;
var mbrotColor = 0;

var mbrotColorSlider = document.getElementById("MbrotColors");
mbrotColorSlider.onmouseup = function(){
    mbrotColor = this.value;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvas.style.border ="3px solid"
    canvas.style.borderColor = "hsl("+this.value+",100%,50%)";
    DrawMbrot();
}

mbrotColorSlider.oninput= function(){
    var sliderCurrentColor = document.getElementById("MbrotCurrentColor");
    sliderCurrentColor.style.backgroundColor = "hsl("+this.value+",100%,50%)";
    
}


var mbrotIterationInput = document.getElementById("MbrotIteration");
mbrotIterationInput.onblur = function(){
    mbrotMaxIterations = this.value;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    DrawMbrot();
}

var mbrotMagSlider = document.getElementById("MbrotMagnificationFactor");
mbrotMagSlider.onmouseup = function() {
    magnificationFactor = this.value;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    DrawMbrot();
    }

    mbrotMagSlider.oninput = function() {
    var magnificationText = document.getElementById("MagnificationText");
    magnificationText.innerHTML = Number(this.value/100).toFixed(1);  
    }
var mbrotPanXInput = document.getElementById("MbrotPanX");
mbrotPanXInput.onmouseup = function(){
    panX = -this.value/100;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    DrawMbrot();
}

var mbrotPanYInput = document.getElementById("MbrotPanY");
mbrotPanYInput.onmouseup = function(){
    panY = this.value/100;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    DrawMbrot();
}

function DownloadCanvasAsImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'mandlebrot-fractal.png');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
}

var saveButton = document.getElementById("SaveButton");
saveButton.onclick = function(){
    DownloadCanvasAsImage();
}
//
function DrawMbrot(){
    for(var x=0; x < canvas.width; x++) {
    for(var y=0; y < canvas.height; y++) {
        var belongsToSet = 
                checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, 
                                            y/magnificationFactor - panY);
        if(belongsToSet == 0) {
            context.fillStyle = '#000';
            context.fillRect(x,y, 1,1); // Draw a black pixel
        }else{
            context.fillStyle = 'hsl('+ mbrotColor +', 100%, ' + belongsToSet + '%)';
            context.fillRect(x,y, 1,1); // Draw a colorful pixel
        }             
    } 
    
}
}
DrawMbrot();



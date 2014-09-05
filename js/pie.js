/**
 * Animated piechart as shown on the 'studio' page, makes use of
 * the CakeJS framework for animating a canvas
 *     
 * @author Joris Blaak <joris@label305.com>
 * @requires CakeJS, jQuery
 *
 * Copyright (c) 2012 Label305. All Right Reserved.
 *
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
 * KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
 * PARTICULAR PURPOSE.
 */
$(document).ready(function() {
        
        if($('#pieDiagram').length == 1) {
                var offset = $('#pieDiagram').offset();
                scroll.reachesOnce(offset.top - 50, function(event) {
                        animatePie();
                });
        }
});

function animatePie() {
        /*
         * The Cake canvas
         */
        var canvas = new Canvas($('#pieDiagram')[0], 446, 780);

        /*
         * The Pie
         */
        var chart = new animatedPieChart(canvas, 150, 500);
        var options = {
                        x: canvas.width/2,  
                        y: 410, 
                        fill: 'cyan', 
                        stroke: 'white', 
                        strokeWidth: 1,
                        startAngle: -Math.PI*.5,
                        finalPieceWidth: 0
                };
        //Concept (15%)
        options.fill = '#17bcb8';
        options.percentage = 15;
        var piece = chart.addPiece(options);	
        //Ontwerp (25%)
        options.fill = '#3ac4c4';
        options.percentage = 25;
        chart.addPiece(options);
        //Ontwikkeling (37.5%)
        options.fill = '#60d1cd';
        options.percentage = 37.5;
        chart.addPiece(options);
        //Testen en lancering (17.5%)
        options.fill = '#84dad7';
        options.percentage = 17.5;
        chart.addPiece(options);
        //Onderhoud (5%+)
        options.fill = '#a9e4e2';
        options.percentage = 5;
        chart.addPiece(options);
        
        /*
         * Lines
         * 
         * line(context, speed (pix/ms))
         * line.addLine(x1, y1, x2, y2, options)
         */
        setTimeout(function() {
                var lineOptions = {
                        stroke: '#3a3a3a',
                        strokeWidth: 2
                };
                var lineAnimationTime = 300;
                //Onderhoud
                var line = new animatedLine(canvas, lineAnimationTime);
                line.addLine(0, 208, 132, 208, lineOptions);
                line.addLine(132, 208, 191, 272, lineOptions);
                //Testen en lancering
                var line = new animatedLine(canvas, lineAnimationTime);
                line.addLine(0, 363+40, 33, 363+40, lineOptions);
                line.addLine(33, 363+40, 141, 328, lineOptions);
                //Concepting
                var line = new animatedLine(canvas, lineAnimationTime);
                line.addLine(446, 263, 414, 292,  lineOptions);
                line.addLine(414, 292, 274, 292, lineOptions);
                //Ontwerp
                var line = new animatedLine(canvas, lineAnimationTime);
                line.addLine(446, 378, 330, 378,  lineOptions);
                //Ontwikkelen
                var line = new animatedLine(canvas, lineAnimationTime);
                line.addLine(446, 543, 265, 543,  lineOptions);
                line.addLine(265, 543, 230, 502, lineOptions);
                
                //Dots at the end
                setTimeout(function() {
                        var dotRadius = 2;
                        options = {
                                fill: '#3a3a3a'
                        };
                        
                        //Onderhoud
                        options.cx = 191;
                        options.cy = 272
                        var circle = new Circle(dotRadius, options);
                        canvas.append(circle);
                        //Testen en lancering
                        options.cx = 141;
                        options.cy = 328
                        var circle = new Circle(dotRadius, options);
                        canvas.append(circle);
                        //Concepting
                        options.cx = 274;
                        options.cy = 292
                        var circle = new Circle(dotRadius, options);
                        canvas.append(circle);
                        //Ontwerp
                        options.cx = 330;
                        options.cy = 378
                        var circle = new Circle(dotRadius, options);
                        canvas.append(circle);
                        //Ontwikkelen
                        options.cx = 230;
                        options.cy = 502
                        var circle = new Circle(dotRadius, options);
                        canvas.append(circle);
                
                }, lineAnimationTime);
                
        }, 500);

        /*
         * Overlay image
         */
        //var imgOptions = {
        //        usePattern: true	
        //};
        //var img = new Image(imgOptions);
        //var img = new Image();
        //img.src = "img/pie/diagramDirt.png";
        //var imageGeo = new ImageNode(img);
        //canvas.append(imageGeo);
}

/*
 * Animated line
 */
function animatedLine(canvas, totalAnimationTime) {
	
	//Time that this function is initiated
	var startTime = canvas.time;
	
	//Total line
	var totalLineLength = 0;
	
	//All line lengths so we can calculate where the current line is
	var linesStack = new Array();
	
	this.addLine = function(x1, y1, x2, y2, options) {
		
		//How long should the line become
		var finalLineLength = Math.sqrt(
					   Math.pow(Math.abs(x1-x2), 2)
					   +
					   Math.pow(Math.abs(y1-y2), 2)
					   );
		
		totalLineLength += finalLineLength;
		
		//Line id so we can calculate when to start
		var lineId = linesStack.length;
		linesStack.push(finalLineLength);
		
		//References for animation
		var dx = x2-x1;
		var dy = y2-y1;
		var x2Start = x1;
		var y2Start = y1;
		
		var line = new Line(x1, y1, x2Start, y2Start, options);
		line.addFrameListener(
			function(t, dt) {
				
				var lengthBefore = 0;
				for(var id in linesStack) {
					if(id == lineId) {
						break;
					}
					lengthBefore += linesStack[id];
				}
				
				var timeout = startTime + (lengthBefore/totalLineLength)*totalAnimationTime;
				
				if(t > timeout) {
					var animationTime = (finalLineLength/totalLineLength)*totalAnimationTime;
					
					this.x2 = x1 + (dx/animationTime)*(t-timeout);
					this.y2 = y1 + (dy/animationTime)*(t-timeout);
					
					var lineLength = Math.sqrt(
						   Math.pow(Math.abs(this.x1-this.x2), 2)
						   +
						   Math.pow(Math.abs(this.y1-this.y2), 2)
						   );
			
					if(lineLength > finalLineLength) {
						this.x2 = x2;
						this.y2 = y2;
					}
				}
			}
		);
		canvas.append(line);
		
		return line;
		
	}
	
}

/*
 * Pie chart for CakeJS
 */
function animatedPieChart(canvas, pieSize, totalAnimationTime) {
	
	//Time that this function is initiated
	var startTime = canvas.time;
	
	//Current time that it takes for animation to complete
	var animationTime = 0;
	
	var pieWidth = 0;
	
	//Add piece of pie
	this.addPiece = function(options) {
		
		//Calculate from percentage
		if(options.percentage !== undefined)
			options.finalPieceWidth = ((Math.PI*2)/100) * options.percentage;
		
		//Calculate how long this piece should be animated to fall into place
		var pieceAnimationTime = (options.finalPieceWidth * (totalAnimationTime / (Math.PI*2)));
		options.animationTime = animationTime + pieceAnimationTime;
		
		//Set where this item should end up
		options.finalEndAngle = pieWidth;
		
		//Update stacks
		pieWidth += options.finalPieceWidth;
		animationTime += pieceAnimationTime;
		
		//New pie object
		var pie = new Pie(pieSize, options);
		pie.addFrameListener(
			function(t, dt) {			
				//Calculate start angle and correct for overshoot
				this.startAngle = -Math.PI*.5 + (this.finalEndAngle * ((t-startTime)/this.animationTime));
				if(this.startAngle > (-Math.PI*.5 + this.finalEndAngle)) this.startAngle = (-Math.PI*.5 + this.finalEndAngle);
				
				//Calculate piecewidth and correct for overshoot
				this.pieceWidth = this.finalPieceWidth * ((t-startTime) / this.animationTime);
				if(this.pieceWidth > this.finalPieceWidth) this.pieceWidth = this.finalPieceWidth;
				
			}
		);
		
		
		pie.addEventListener('mouseover', function() {
			pie.animateTo('scale', 1.1, 100, 'sqrt');
		});
		pie.addEventListener('mouseout', function() {
			pie.animateTo('scale', 1, 100, 'sqrt');	
		});
		
		canvas.append(pie);
		
		return pie;
		
	}
}

/*
 * CakeJS extends
 */

/*
 * Pie chart
 */
Pie = Klass(Drawable, {
	cx: 0,
	cy: 0,
	radius: 10,
	startAngle: 0,
	endAngle: Math.PI * 2,
	pieceWidth: Math.PI * 2,
	clockwise: false,
	closePath: true,
	includeCenter: false,
	animationTime: 0,
	finalEndAngle: Math.PI * 2,
	finalPieceWidth: Math.PI * 2,

	initialize: function(radius, config) {
		if (radius != null) this.radius = radius

		config.endAngle = config.startAngle + config.pieceWidth;

		Drawable.initialize.call(this, config)
	},

	drawGeometry: function(ctx) {

		this.endAngle = this.startAngle + this.pieceWidth;

		ctx.beginPath();
		ctx.moveTo(this.cx, this.cy);
		ctx.arc(
		this.cx, this.cy, this.radius, this.startAngle, this.endAngle, this.clockwise);
		ctx.closePath();
	}
})
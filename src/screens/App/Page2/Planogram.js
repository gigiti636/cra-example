import React, {useEffect, useRef, useState} from "react";
import { fabric } from "fabric";

function Planogram(props) {
    console.log('RENDER')
    const canvasContainer = useRef(null);


    let width, height;

    if(!canvasContainer.current){
        width = 300;
        height = 300;
    }
    let myCanvas

    useEffect(() => {
        myCanvas = new fabric.Canvas('canvas', {
            height: Number(width),
            width: Number(height),
            backgroundColor: 'pink'
        })
        myCanvas.setHeight(canvasContainer.current.offsetHeight);
        myCanvas.setWidth(canvasContainer.current.offsetWidth);

        window.addEventListener('resize', function handleResize() {
            console.log('resize ha');
            console.log(canvasContainer.current.offsetWidth);
            if (canvasContainer.current) {
                myCanvas.setHeight(canvasContainer.current.offsetHeight);
                myCanvas.setWidth(canvasContainer.current.offsetWidth);
                myCanvas.renderAll();
            }
            return () => {
                window.removeEventListener('resize', handleResize);
        }
        });
    }, []);



    fabric.Image.fromURL('https://i.imgur.com/Q6aZlme.jpg',
        function (img) {
            // create text
            var text = new fabric.Text('hello world', {
                left: 10,
                top: 5,
                fontSize: 15,
                fontFamily: 'Verdana',
                fill: 'white'
            });

            // add image and text to a group
            var group = new fabric.Group([img, text], {
                left: 50,
                top: 50,
            });

            // add the group to canvas
            myCanvas.add(group);
        });



    return (
        <div className="position-relative w-100  bg-primary"  ref={canvasContainer}  style={{overflow:''}}>
             <canvas id="canvas" style={{border:'1px solid black'}}></canvas>
        </div>
    );
}

export default Planogram;

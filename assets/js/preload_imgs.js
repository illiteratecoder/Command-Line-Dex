'use strict';

function preloadImages( array ) {
    if ( !preloadImages.list ) {
        preloadImages.list = [];
    }
    let list = preloadImages.list;
    for (let i = 0; i < array.length; i++) {
        let img = new Image();
        img.onload = function() {
            let index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

let $imgArray = [];

// for ( let i = 1; i < 151; i++ ) {
// 	$imgArray.push("models/" + i + ".gif");
// }
$imgArray.push("images/ball-shake.gif");

preloadImages($imgArray);




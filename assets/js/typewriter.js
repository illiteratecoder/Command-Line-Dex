/* exported a, setupTypewriter */

const setupTypewriter = function(t) {
    'use strict';
    let location = t.getAttribute('data-target');
    location = document.getElementById(location);
    let HTML = t.innerHTML;
    if (t.getAttribute('data-opt') === "replace"){
      location.innerHTML = "";
    }
    let cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 50,
        tempTypeSpeed = 0;

    let type = function() {
        if (writingTag === true) {

            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }

        if (!writingTag && tagOpen) {
            
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 25;
            }
            location.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 25;
            writingTag = false;
            if (tagOpen) {
                let newTemplate = document.createElement("template");
                newTemplate.innerHTML = tag;
                let newSpan = newTemplate.content.firstChild;
                location.appendChild(newSpan);
                tag = newSpan;
            }
        }
        location.scrollTop = location.scrollHeight;
        cursorPosition += 1;
        
        if ( cursorPosition < HTML.length ) {
            setTimeout(type, tempTypeSpeed);
        }
        else {
            document.querySelector( '[name="command"]' ).removeAttribute('disabled');
            document.querySelector( '[name="command"]' ).focus();
        }

    };
    
    return {type: type}
}











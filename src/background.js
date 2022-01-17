// https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/examples/page-redder

function encryptText(parentNode){
    function decode(char){    
        // https://www.asciitable.com/
        // Convert 65-90 and 97-122
        let newChar = char; 
        let translation = 0;
        let code = char.charCodeAt(0); 

        if (code >= 65 && code <= 90){
            translation = 65
        }
        if (code >= 97 && code <= 122){
            translation = 97
        }

        if (translation > 0){
            code = code - translation;
            code = code + 13;
            if (code > 25){
                code = code - 25 - 1
            }
            code = code + translation
            newChar = String.fromCharCode(code)
        }

        return newChar  
    }

    if (parentNode == undefined){
        parentNode = document.body
    };
    
    for (child of parentNode.childNodes){
        if(child.nodeType == 3){
            let newValue = ""
            for (const char of child.nodeValue.split("")){
                newValue += decode(char)
            }
            child.nodeValue = newValue;
        }
        else {
            encryptText(child)
        }
    }
}


function reddenPage() {
    document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: encryptText,
//      args: [decode],
  });
});

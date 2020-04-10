const timer = document.getElementById("timer");
let quotedisplay = document.getElementById("quote");
const inputtext = document.getElementById("inputtext");
const url = "http://api.quotable.io/random";//Api to get random quote.


//Function to get new Quote
async function getQuote(){
    let response = await fetch(url);
    let data = await response.json();
    let quote = data.content;
    //Assing all values to initial state
    quotedisplay.innerText = null;
    inputtext.value = "";
    quote.split("").forEach(character => {
        const characterspan = document.createElement("span");//create span for each and every character in quote.
        characterspan.innerHTML = character;//assing each character in each span of quote.
        quotedisplay.appendChild(characterspan);
    });
    starttimer()
}


inputtext.addEventListener("input",function(){  //calls every time when input is changed
    const quoteArray = quotedisplay.querySelectorAll("span");//Get array of all spans containing each character in quote.
    const inputtextArray = inputtext.value.split('');//Get array of every character of input text by user.
    let alldone = true;//flag to check whether quote == userinput if yes then change to new quote
    
    quoteArray.forEach((quoteCharacterSpan,index) =>{// function to Match each character of quotearray and inputtextArray
        const inputtextCharacter =  inputtextArray[index];
        if(inputtextCharacter == null)
        {
            quoteCharacterSpan.classList.remove("correct");
            quoteCharacterSpan.classList.remove("incorrect");
            alldone = "false"
        }
        else if(inputtextCharacter === quoteCharacterSpan.innerText){
            quoteCharacterSpan.classList.add("correct");
            quoteCharacterSpan.classList.remove("incorrect");
        }
        
        else {
            quoteCharacterSpan.classList.remove("correct");
            quoteCharacterSpan.classList.add("incorrect");
            alldone = false;
        }

    })
    if(alldone == true){
        getQuote()
    }
})

let starttime
function starttimer(){//Function to handle timer.
    timer.innerText = 0;
    starttime = new Date();
    setInterval(() => {// each second starttime date - currenttime date gives milliseconds
        let currenttime = Math.round((new Date() - starttime)/1000);
        timer.innerText = currenttime;
    }, (1000));
}
getQuote();

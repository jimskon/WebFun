
var option="Forward"
var words;

// Set up the events for the serch button, and keyup events on fields
document.querySelector('#search').addEventListener('keyup',findMatches);
document.querySelector('#random-btn').addEventListener('click',randomWord);
document.querySelector("#inputText").addEventListener('keyup',showString);

// Set up the event for managing the pulldown menu
document.querySelectorAll(".dropdown-menu a").forEach(item => {
    item.addEventListener('click', event => {
	var element = event.target;
	option=element.textContent;
	console.log("pick!"+option);
	// Get the pulldown parent
	pullDown = element.parentElement.parentElement;
	// Get and set the selection displayed
	var  selected = pullDown.querySelectorAll(".selection")[0];
	selected.innerHTML = option;
	
	showString();
    });
})

// Set the list of words from the server
fetch('http://jimskon.com/class/softdev/skon/webfun/words.txt',{
    method: 'get'
})
    .then(response => response.text())
    .then (textString => saveWords(textString))
    .catch(error => {
	{alert("Error: Something went wrong:"+error);}
    })

// Save the words in a global variable
function saveWords(data) {
  words=data.split("\n");
}

// Reverse a string
function reverse(str) {
  var newString = "";
  for (var i = str.length-1; i >= 0; i--) {
      newString += str[i];
  }
  return newString;
}

// Sort the character in a string
function sortString(text) {
    return text.split('').sort().join('');
};

// Show the modified string entered
function showString() {<
    var intext = document.querySelector("#inputText").value;
    
    if (option=="Backward") {
	intext=reverse(intext);
    } else if (option=="Sort") {
	intext=sortString(intext);
    }
    document.querySelector("#outputText").value = intext;
}

// Do a binary search of a sorted array
function binarySearch(ar, el) {
    var m = 0;
    var n = ar.length - 1;
    var k;
    while (m <= n) {
        k = (n + m) >> 1;
       if (el>ar[k]) {
            m = k + 1;
        } else if(el<ar[k]) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return k;
}

// Find the closest match the the entered word
// Display on the screen
function findMatches() {
    word = document.querySelector("#search").value;
    var i=binarySearch(words,word);
    
    start=Math.max(i-5,0);
    out="";
    j=start;
    while (j<start+10) {
	out+="<div class='words' data='"+j+"'>"+words[j]+"</div>";
	
	j++;
    }
    // Set up a click event for each work in the list displayed.
    // Include the index of the word in the data attribute.
    document.querySelector('#wordmatches').innerHTML = out;
    document.querySelectorAll('.words').forEach(item => {
	item.addEventListener('click', event => {
	    var element = event.target;
	    wordbox(element);
	})
    })
}
			      
// Pick a random word
function randomWord() {
    i=Math.floor(Math.random() * words.length);
    console.log("Random:",i);
    var word = words[i];
    document.querySelector("#search").value=word;
    findMatches();
}

// Display a word box containing information on the word clicked
function wordbox(element) {
  index=element.getAttribute("data");
  theWord=element.textContent;
  alert("Index:"+index+" Word:"+theWord);
}

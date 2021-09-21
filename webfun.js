
var option="Forward"
var words;

document.querySelector('#search').addEventListener('keyup',findMatches);
document.querySelector('#random-btn').addEventListener('click',randomWord);
document.querySelector("#inputText").addEventListener('keyup',showstuff);


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
	
	showstuff();
    });
})

fetch('http://jimskon.com/class/softdev/skon/webfun/words.txt',{
    method: 'get'
})
    .then(response => response.text())
    .then (textString => saveWords(textString))
    .catch(error => {
	{alert("Error: Something went wrong:"+error);}
    })


function saveWords(data) {
  words=data.split("\n");
}

function reverse(str) {
  var newString = "";
  for (var i = str.length-1; i >= 0; i--) {
      newString += str[i];
  }
  return newString;
}

function even(str) {
  var newString = "";
  for (var i = str.length-1; i >= 0; i--) {
    if (i%2==0) {
      newString += str[i];
    }
  }
  return newString;
}

function sortString(text) {
    return text.split('').sort().join('');
};

function showstuff() {
    var intext = document.querySelector("#inputText").value;
    
    if (option=="Backward") {
	intext=reverse(intext);
    } else if (option=="Sort") {
	intext=sortString(intext);
    }
    document.querySelector("#outputText").value = intext;
}

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

function findMatches() {
  word=$("#search").val().toLowerCase();
  var i=binarySearch(words,word);

  start=Math.max(i-5,0);
  out="";
  j=start;
  while (j<start+10) {
    out+="<div class='words' data='"+j+"'>"+words[j]+"</div>";

    j++;
  }
  console.log(out);
  $('#wordmatches').html(out);
  $(".words").click(wordbox);
}

function randomWord() {
    i=Math.floor(Math.random() * words.length);
    console.log("Random:",i);
    $("#search").val(words[i]);
    findMatches();
}

function wordbox() {
  console.log("hello");
  index=$(this).attr("data");
  theWord=$(this).text();
  alert("Index:"+index+" Word:"+theWord);
}

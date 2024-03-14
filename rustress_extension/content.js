alert("content script running!");

const W = new Map;
W.set(1025, 168);//YO
W.set(1105, 184);//yo
for (let i = 1040; i < 1104; i++) {
W.set(i, i-848);
};

const E = new Map;
for (let i = 0; i < 256; i++) {
E.set(i, i);
};
E.set(129, 224); //a grave => a
E.set(131, 229); //je grave => je
E.set(140, 232); //i grave => i
E.set(144, 224); //a acute => a
E.set(154, 229); //je acute => je
E.set(156, 238); //o grave => o
E.set(157, 232); //i acute => i
E.set(158, 238); //o acute => o
E.set(159, 243); //u acute => u
E.set(161, 243); //u grave => u
E.set(165, 251); //y grave => y
E.set(178, 251); //y acute => y
E.set(179, 253); //e acute => e
E.set(184, 229); //jo => je
E.set(186, 254); //ju acute => ju
E.set(188, 253); //e grave => e 
E.set(189, 254); //ju grave => ju
E.set(190, 255); //ja grave => ja
E.set(191, 255); //ja acute => ja

const A = new Map;
A.set(184, String.fromCharCode(1105)); //jo
for (let i = 224; i < 256; i++) {
A.set(i, String.fromCharCode(i+848)); 
};

A.set(129, "а`"); //a grave => a
A.set(131, "е`"); //je grave => je
A.set(140, "и`"); //i grave => i
A.set(144, "а'"); //a acute => a
A.set(154, "е'"); //je acute => je
A.set(156, "о`"); //o grave => o
A.set(157, "и'"); //i acute => i
A.set(158, "о'"); //o acute => o
A.set(159, "у'"); //u acute => u
A.set(161, "у`"); //u grave => u
A.set(165, "ы`"); //y grave => y
A.set(178, "ы'"); //y acute => y
A.set(179, "э'"); //e acute => e
A.set(186, "ю'"); //ju acute => ju
A.set(188, "э`"); //e grave => e 
A.set(189, "ю`"); //ju grave => ju
A.set(190, "я`"); //ja grave => ja
A.set(191, "я'"); //ja acute => ja

const url = browser.runtime.getURL("Dictionary");
const text = document.body.innerHTML;
var  html="";

async function getData() {
try {
const response = await fetch(url);
       if (!response.ok) {
       throw new Error(`HTTP error: ${response.status}`);
	}
       const buffer = await response.arrayBuffer();
       return buffer;
          }catch (error) {
        console.log(error);
    }
}

async function useData() {

let buffer = await getData();
const fsa = new Uint32Array(buffer);

const node = function(j){
let result = [];
while (j < fsa.length){
result.push(fsa[j]);
if (fsa[j]&2){break};
j++;
};
return result;
};//node


const dfs = function(word, j, i){
for (let r=0; r < node(j).length; r++){
let edge=node(j)[r];
let	label=(edge>>>24);
k=(edge&0xffffff)>>>2;
if (typeof word[i] !== 'undefined'){
if ( E.get(label)===W.get(word[i].charCodeAt(0))) {
        candidate[i]=A.get(label);
	if (i===word.length-1 && edge&1) { 
    replacements.push(candidate.join(''));
    }else if (k < fsa.length){ 
    dfs(word, k, i+1);
    };//if2
};//if1
};//if0
};//for
};//dfs

var candidate=[];
var replacements=[];

let a=text.match(/[-А-яЁё]+|[^-А-яЁё]+/g) ;
let pattern = /[-а-яё'`]+/;

 for(let i = 0; i < a.length; i++){
 let word = a[i];
 if (pattern.test(a[i])){
   dfs(`${word}`, 0, 0);
   if (replacements.length==1){
   html += `${replacements[0]}`;
   }else{html += `${word}`}
   replacements.length=0;
   candidate.length=0;
}else{html += `${word}`}
}
document.body.innerHTML=html;
}
useData();

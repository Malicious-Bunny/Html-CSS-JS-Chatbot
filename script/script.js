let message=document.querySelector('#txt').textContent;
let Connected=navigator.onLine;
let SendButton=document.querySelector('#Send');
let ChatBox=document.querySelector('.chat');
let ClearBtn=document.querySelector('#clear');
let SpeakLast= document.getElementById('MessageReader');
let readConvo=document.querySelector('#ConvoReader');
let Speak= document.querySelector('#Voice');
let synth= window.speechSynthesis;
function ChatBotName(){
    const nouns = [
        "teacher",
        "mentor",
        "guide",
        "friend",
        "confidant",
        "role model",
        "inspiration",
        "resource",
        "support system",
        "learning companion",
        "problem solver",
        "idea generator",
        "creative spark",
        "fun buddy",
        "cheerleader",
        "shoulder to cry on",
        "sounding board",
        "trusted advisor",
        "life coach"
      ];
      const adjectives = [
        "friendly",
        "helpful",
        "patient",
        "encouraging",
        "inspiring",
        "creative",
        "fun",
        "interesting",
        "engaging",
        "supportive",
        "motivating",
        "smart",
        "knowledgeable",
        "accessible",
        "inclusive",
        "non-judgmental",
        "empathetic",
        "reliable",
        "trustworthy",
        "confident"
      ];
   const adjIndex= Math.floor(Math.random() * adjectives.length);
   const nounIndex= Math.floor(Math.random() * nouns.length);
   
   return `${adjectives[adjIndex]} ${nouns[nounIndex]}`;
}
function setWelcomeMessage(){
    let welcome=document.querySelector('#welcome');
    let HarmonizedName=ChatBotName();
    welcome.innerHTML=`I am your ${HarmonizedName}, AMA`;
    document.title=`${HarmonizedName}`;
}
setWelcomeMessage();
function StyleMessage(){
    let message=document.createElement('div');
    if(Connected){
        message.classList.add('sent');
    }else{
        message.classList.add('error-user');
    }
    return message;
}
async function SendMessage(){
    let message=StyleMessage();
    let txt=document.querySelector('#txt');
    let text=txt.value;
    txt.value='';
    txt.ariaPlaceholder='Type your message here';
    message.innerHTML=text;
    ChatBox.appendChild(message);
    ChatBox.scrollTop=ChatBox.scrollHeight;
}
SendButton.addEventListener('click',SendMessage);
window.addEventListener('keydown',async (e)=>{
    if(e.key=='Enter'){
        SendMessage();
    }else if(e.key=='Enter' && e.shiftKey){
        //do nothing, the user is trying to add a new line
    } 
});
async function ClearChat(){
    let messages=document.querySelectorAll('.chat div');
    messages.forEach(message=>{
        message.remove();
    });
}
ClearBtn.addEventListener('click',ClearChat);
function getLastMsg(){
    let messages=document.querySelectorAll('.chat div');
    let lastMsg=messages[messages.length-1].textContent;
    return lastMsg;
}
SpeakLast.addEventListener('click',()=>{
    let msg=new SpeechSynthesisUtterance(getLastMsg());
    synth.speak(msg);
    if(synth.speaking){
        console.log("Speaking...")
    }
});
function getAllMessages(){
    let messages=document.querySelectorAll('.chat div');
    let allMessages='';
    messages.forEach(message=>{
        allMessages+=message.textContent;
    });
    return allMessages;
}
readConvo.addEventListener('click',()=>{
    let msg=new SpeechSynthesisUtterance(getAllMessages());
    synth.speak(msg);
    if(synth.speaking){
        console.log("Speaking...")
    }
});
Speak.addEventListener('click',()=>{
    
});


//speech recognition setup
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector('#stop');
const speakBtn = document.querySelector('#speak');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
//speech recognition start
recognition.onstart = function () {
    console.log("vr active");
}
//speech recognition result 
recognition.onresult = (event) => {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(`my words: ${transcript}`);

    if (transcript.includes("hello jarvis") || transcript.includes("jarvis") || transcript.includes("hey jarvis") || transcript.includes("hi jarvis")) {
        readOut("hello sir")
    }
    if (transcript.includes("what is your name") || transcript.includes("who are you") || transcript.includes('tell me about yourself')) {
        readOut('I am Jarvis, Your Virtual Assistant sir')
    }
    if (transcript.includes("open youtube") || transcript.includes("play video")) {
        readOut("opening youtube sir");
        window.open("http://www.youtube.com");
    }
    if (transcript.includes("open google")) {
        readOut("opening google sir");
        window.open("http://www.google.com");
    }
    if (transcript.includes("open firebase") || transcript.includes("go to firebase")) {
        readOut("opening youtube sir");
        window.open("https://console.firebase.google.com/");
    }
    //search for 
    if (transcript.includes("search") || transcript.includes("search for")) {
        readOut("searching...");
        readOut("here's the result");
        let input = transcript.split("");
        input.splice(0, 11);
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://www.google.com/search?q=${input}`);



    }
    //for youtube video id extraction from url or question like what is this?
    if (transcript.includes("play") || transcript.includes("video")) {
        readOut("playing sir..");
        let input = transcript.split("");
        input.splice(0, 5);
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://www.youtube.com/results?search_query=${input}`);
    }

    if (transcript.includes("what is the time?") || transcript.includes("show me the time")) {
        const now = new Date()
        const hrs = now.getHours()
        let minutes = now.getMinutes()
        let seconds = now.getSeconds()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        readOut(hrs + "hours " + minutes + "minutes" + seconds + " seconds")
    }

};

//speech recognition stop
recognition.onend = function () {

    console.log("vr deactive");
}
//speech recognition continious
recognition.continuous = true;
startBtn.addEventListener("click", () => {
    recognition.start();
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
})
// jarvis speech
function readOut(message) {
    const speech = new SpeechSynthesisUtterance()
    // different voices
    // const allVoices = speechSynthesis.getVoices();
    speech.text = message;
    // speech.voice = allVoices[8];
    speech.volume = 1
    window.speechSynthesis.speak(speech);
    console.log("speaking out");

}
//example
speakBtn.addEventListener("click", () => {
    readOut('Hello Sir, how can I help you?')
});

window.onload = function () {
    readOut(" ")
}
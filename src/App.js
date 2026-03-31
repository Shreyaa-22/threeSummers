import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import rose from "./asset/flowers/rose.png"
import bloom from "./asset/flowers/bloom.png"
import bluebell from "./asset/flowers/bluebell.png"
import daisies from "./asset/flowers/daisies.png"
import lily from "./asset/flowers/lily.png"
import sunflower from "./asset/flowers/sunflower.png"
import tulip from "./asset/flowers/tulip.png"
import lavender from "./asset/flowers/lavender.png"
import carnation from "./asset/flowers/carnation.png"
import jasmine from "./asset/flowers/jasmine.png"
import music from "./asset/music.mp3"

const flowerData = [
  { src: rose, name: "Rose", meaning: "Our love and everything it stands for." },
  { src: bloom, name: "Cherry Blossom", meaning: "Beautiful moments that feel too short." },
  { src: bluebell, name: "Bluebell", meaning: "Gratitude for having you in my life." },
  { src: daisies, name: "Daisy", meaning: "Pure, happy memories with you." },
  { src: lily, name: "Lily", meaning: "The calm and peace you bring to me." },
  { src: sunflower, name: "Sunflower", meaning: "How I am always turning towards you." },
  { src: tulip, name: "Tulip", meaning: "Perfect love (yes, that’s us)." },
  { src: lavender, name: "Lavender", meaning: "Comfort and softness in your presence." },
  { src: carnation, name: "Carnation", meaning: "Deep affection and admiration that I carry for you." },
  { src: jasmine, name: "Jasmine", meaning: "Sweetness in the little and quiet moments." },
];

const questions = [
      {
        question: "Which of these places have we never been to together?",
        options: ["Sandwich Junction", "ICH", "Pizza Hut", "Domino’s"],
        answer: 3,
      },
      {
        question: "How many of our birthdays have we celebrated together (since 01/04/2023)?",
        options: ["2", "3", "4", "1"],
        answer: 0,
      },
      {
        question: "Which song did we dance to in the video we made together?",
        options: ["Gehra Hua", "Rangrez", "Pardesiya", "The Night We Met"],
        answer: 1,
      },
      {
        question: "Which coffee chain have we never gone to on a date?",
        options: ["CCD", "Third Wave", "Nothing Before Coffee", "We’ve been to all"],
        answer: 1,
      },
      {
        question: "Where did we watch our first sunset together as a couple?",
        options: ["Bhilai", "Mumbai", "Pune", "Raipur"],
        answer: 0,
      },
      {
        question: "Which series have we watched all available seasons of together?",
        options: ["Game of Thrones", "Friends", "Shadow and Bone", "The Summer I Turned Pretty"],
        answer: 3,
      },
      {
        question: "Where did we go on our first date outside our home city?",
        options: ["Mumbai", "Raipur", "Pune", "Delhi"],
        answer: 0,
      },
      {
        question: "How many movies have we watched together in theatres?",
        options: ["3", "4", "5", "6"],
        answer: 1,
      },
      {
        question: "Which of these dates has no special meaning in our relationship?",
        options: ["3rd January 2020", "23rd February 2023", "23rd August 2023", "1st December 2025"],
        answer: 2,
      },
      {
        question: "Which movie did we start but never finish (watched online)?",
        options: ["The Proposal", "How to Lose a Guy in 10 Days", "Crazy, Stupid, Love", "Love & Other Drugs"],
        answer: 2,
      },
    ];

const complimentList = [
  "You got the first flower 🌸 — okay, maybe you can be right.",
  "Wow, remembering numbers? I’m impressed… slightly 😌",
  "You remembered that memory 🥺 okay that’s actually cute.",
  "Glad you remember our coffee dates… priorities seem right ☕❤️",
  "First sunset?? That was a core memory, good job 🌅",
  "Series binge partner of the year award goes to you 📺👏",
  "First out-of-city date... I’m smiling rn 🥹",
  "Movie count correct?? Someone’s been paying attention 🎬",
  "You actually know our important dates… even the ones you'd wish to forget (ykwim) 😭",
  "You remembered that unfinished movie?? Of course YOU would! 😂",
];

const sarcasmList = [
  "Starting strong… in the wrong direction 😌",
  "You forgot the birthdays count?? That’s bold of you 💀",
  "Not remembering THAT song?? I need a moment.",
  "Coffee dates and still wrong… what were you even doing there? 😏",
  "You forgot our first sunset?? I remember everything btw.",
  "All those hours watching shows… for THIS answer?",
  "First trip outside city and you got it wrong… wow.",
  "We sat in theatres together and you still guessed wrong 🎬😭",
  "One job: remember important dates. One job.",
  "You searched for that movie and you still got it wrong 💀",
];

export default function App() {
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(music) : null);
  const [step, setStep] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [collectedFlowers, setCollectedFlowers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [flowerMessage, setFlowerMessage] = useState("")

  useEffect(() => {
    if (audio) {
      audio.loop = true;
      audio.volume = 0.8;
    }
  }, [audio]);

  const handleAnswer = (index) => {
    const correct = questions[currentQ].answer === index;

    if (correct) {
      const flower = flowerData[currentQ];
      setScore(score + 1);
      setCollectedFlowers(prev => [...prev, flower.src]);
      setFeedback(complimentList[currentQ]);
      setFlowerMessage(`You got a ${flower.name}❤️ as a symbol for: ${flower.meaning}`);
    } else {
      const random = sarcasmList[Math.floor(Math.random() * sarcasmList.length)];
      setFeedback(sarcasmList[currentQ]);
      setFlowerMessage("");
    }

    setTimeout(() => {
      setFeedback("");
      setFlowerMessage("");
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setStep("result");
      }
    }, 3500);
  };

const resetApp = () => {
  setStep("intro");
  setCurrentQ(0);
  setScore(0);
  setCollectedFlowers([]);
  setFeedback("");
  setFlowerMessage("");
};

  if (step === "intro") {
    return (
      <div className="container">
        <h1>Let’s see if you’re actually always right 👀</h1>
        <p>A small challenge for Mr. (who claims himself to be) Always Right 😌</p>
        <p>For every right answer collect a flower, for every wrong one well...we'll see!</p>
        <button onClick={() => {
          if (audio) audio.play().catch(() => {});
          setStep("quiz");
        }}>Start Challenge</button>
      </div>
    );
  }

  if (step === "quiz") {
    const q = questions[currentQ];
    return (
      <div className="container">
        <h2>Question {currentQ + 1}/{questions.length}</h2>
        <h1>{q.question}</h1>

        <div className="options">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
          ))}
        </div>

        {feedback && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {feedback}
          </motion.p>
        )}

        {flowerMessage && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {flowerMessage}
          </motion.p>
        )}
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="container">
        <h1>Your Bouquet 💐</h1>
        <div className="bouquet">
          {collectedFlowers.map((flower, i) => (
            <motion.img
              key={i}
              src={flower}
              className="flower"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.2 }}
            />
          ))}
        </div>

        <button onClick={() => setStep("letter")}>Open Letter 💌</button>
      </div>
    );
  }

  if (step === "letter") {
    return (
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div class="letter">
          <p> Hello Love!! </p>
            <p>
              This might be a very fun way for me to tell you what’s right or wrong, good or bad, in this universe where we remember it all, and in every other where we won’t – I love you.
            </p>

            <p>
              Whatever answers you give to these questions, whichever flowers you get, this letter is the one thing that remains constant, and that is my way of letting you know that my love will always remain constant in your life. A constant up, because I love you more every day.
            </p>

            <p>
              These three years have been the best years of my life, and I can’t wait to have all the summers, monsoons, winters, and springs with you.
            </p>

            <p>
              I can’t get all these flowers because they are pretty exotic, but I will get them all for you in this life, and that’s a promise and something to look forward to.
            </p>

            <p class="signature">
              Love always,<br />
              Shreya
            </p>
          </div>
        </motion.div>
         <button onClick={resetApp}>
                Start Again 🔄
             </button>
      </div>


    );
  }

  return null;
}

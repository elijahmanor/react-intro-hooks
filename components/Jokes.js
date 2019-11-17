import React, { useState, useEffect } from "react";
import { sample } from "lodash";

export default function Jokes(props) {
  const [jokes, setJokes] = useState([]);
  const [joke, setJoke] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch(
      "https://rawgit.com/elijahmanor/cyberpun/master/jokes.json"
    )
      .then(response => response.json())
      .then(jokes => {
        jokes = jokes.filter(j => j.question);
        setJokes(jokes);
      });
  }, []);

  useEffect(() => {
    window.setTimeout(function poll() {
      console.log("poll", jokes);
      if (jokes.length) {
        const joke = sample(jokes);
        setShowAnswer(false);
        setJoke(joke);
        window.setTimeout(() => setShowAnswer(true), 5000);
        window.setTimeout(poll, 10000);
      }
    }, 10000);
  }, [jokes]);

  return !!joke ? (
    <div {...props}>
      {showAnswer ? (
        <div>a: {joke.answer}</div>
      ) : (
        <div>q: {joke.question}</div>
      )}
    </div>
  ) : null;
}

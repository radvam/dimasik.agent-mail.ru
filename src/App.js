import React from "react";

import Header from "./Components/Header/Header";
import Species from "./Components/Species/Species";
import Variants from "./Components/Variants/Variants";
import birdsData from "./Components/BirdsInfo/birds";
import Question from "./Components/Question/Question";
import Description from "./Components/Description/Description";
import ButtonNext from "./Components/ButtonNext/ButtonNext";
import random from "lodash/random";
import soundWrong from "./data/audio/wrong.mp3";
import soundRight from "./data/audio/right.mp3";

import "./App.css";

const initialState = {
  birds: {
    name: "******",
    image: "https://birds-quiz.netlify.com/static/media/bird.06a46938.jpg",
    description:
      "Songbird - викторина распознавания птиц по их голосам. Прослушайте запись и выберите птицу из списка!"
  },
  activeTabNum: 0,
  randomNum: random(0, 5),
  score: 0,
  addScore: 5,
  isButtonNextActive: false,
  isGuessedRight: false,
  chosenVariant: 0,
  pressedVariants: new Set(),
  classDescription: "hidden",
  classHint: "visible",
  classes: new Array(6).fill("grey"),
  toplay: false,
  end: "end_wrapper-hidden",
  endImage: "end_image-hidden"
};

class App extends React.Component {
  state = initialState;

  handleVariants = event => {
    if (event.target.closest(".variant") === null) {
      return;
    }
    const index = event.target.closest(".variant").dataset.index;

    this.setState({
      chosenVariant: +index,
      classDescription: "visible",
      classHint: "hidden"
    });

    const handleTrueVariant = () => {
      if (this.state.isGuessedRight === false) {
        this.setState({
          score: this.state.score + this.state.addScore,
          isGuessedRight: true,
          isButtonNextActive: true,
          birds: {
            name: birdsData[this.state.activeTabNum][this.state.randomNum].name,
            image:
              birdsData[this.state.activeTabNum][this.state.randomNum].image
          }
        });

        if (this.state.activeTabNum === 5) {
          this.setState({
            end: "end_wrapper"
          });
        }
      }
    };

    const handleFalseVariant = () => {
      if (
        this.state.addScore > 0 &&
        this.state.pressedVariants.has(index) === false
      ) {
        this.setState({
          addScore: this.state.addScore - 1
        });
      }

      const pressedVariants = this.state.pressedVariants;
      pressedVariants.add(index);
      this.setState({ pressedVariants });
    };

    +index === this.state.randomNum
      ? handleTrueVariant()
      : handleFalseVariant();
  };

  handleVariant = event => {
    const index = +event.currentTarget.dataset.index;
    const classes = this.state.classes.concat();

    const makeGreen = () => {
      classes.splice(index, 1, "grey green");
      this.setState({ classes });
      this.audio = new Audio(soundRight);
      this.audio.play();
      this.setState({ toplay: true });
    };

    const makeRed = () => {
      classes.splice(index, 1, "grey red");
      this.setState({ classes });
      this.audio = new Audio(soundWrong);
      this.audio.play();
    };

    index === this.state.randomNum ? makeGreen() : makeRed();
  };

  buttonNextHandler = () => {
    if (this.state.isButtonNextActive) {
      if (this.state.activeTabNum === 5) {
        this.setState(initialState);
        this.setState({
          pressedVariants: new Set()
        });
        return;
      }
      this.setState({
        birds: {
          name: initialState.birds.name,
          image: initialState.birds.image,
          description: initialState.birds.description
        },
        randomNum: random(0, 5),
        addScore: initialState.addScore,
        isButtonNextActive: initialState.isButtonNextActive,
        isGuessedRight: initialState.isGuessedRight,
        pressedVariants: new Set(),
        classDescription: initialState.classDescription,
        classHint: initialState.classHint,
        activeTabNum: this.state.activeTabNum + 1,
        classes: initialState.classes,
        toplay: initialState.toplay
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Header score={this.state.score} />
        <Species activeTabNum={this.state.activeTabNum} />
        <Question
          toplay={this.state.toplay}
          name={this.state.birds.name}
          image={this.state.birds.image}
          audio={birdsData[this.state.activeTabNum][this.state.randomNum].audio}
        />
        <div className="choose_wrapper">
          <Variants
            activeTabNum={this.state.activeTabNum}
            onTap={event => this.handleVariants(event)}
            onClick={event => this.handleVariant(event)}
            random={this.state.randomNum}
            classes={this.state.classes}
          />
          <Description
            hint={this.state.birds.description}
            classHint={this.state.classHint}
            classDescription={this.state.classDescription}
            image={
              birdsData[this.state.activeTabNum][this.state.chosenVariant].image
            }
            name={
              birdsData[this.state.activeTabNum][this.state.chosenVariant].name
            }
            latin={
              birdsData[this.state.activeTabNum][this.state.chosenVariant]
                .species
            }
            audio={
              birdsData[this.state.activeTabNum][this.state.chosenVariant].audio
            }
            description={
              birdsData[this.state.activeTabNum][this.state.chosenVariant]
                .description
            }
          />
        </div>
        <ButtonNext
          name="Next Level"
          active={this.state.isButtonNextActive}
          onClick={() => this.buttonNextHandler()}
        />
        <div className={this.state.end}>
          <h1 className="score-end">
            Score:<span className="score-end-number">{this.state.score}</span>
          </h1>
          <h2 className={this.state.score === 30 ? "" : initialState.endImage}>
            Done. You are an absolute winner!
          </h2>
          <img
            style={{ width: "80%" }}
            src="https://media.giphy.com/media/44gu1V41ejJni/giphy.gif"
            className={this.state.score === 30 ? "" : initialState.endImage}
            alt="winner"
          />
          <ButtonNext
            name="Try again!"
            active={this.state.isButtonNextActive}
            onClick={() => this.buttonNextHandler()}
          />
        </div>
      </div>
    );
  }
}

export default App;

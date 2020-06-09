function Reset(props) {
  const style = { marginTop: "4vh" };
  return (
    <button
      style={style}
      onClick={() => {
        props.handleClick();
      }}
    >
      Reset
    </button>
  );
}

function Incorrects(props) {
  return <h3>Incorrects: {props.incorrects}</h3>;
}

function Corrects(props) {
  return <h3>Corrects: {props.corrects}</h3>;
}

function Answers(props) {
  let options = props.options;
  let answers = [];
  for (let i = 0; i < options.length; i++) {
    answers.push(
      <button
        key={i}
        onClick={() => {
          props.handleClick(i);
        }}
      >
        {options[i]}
      </button>
    );
  }
  const style = {
    display: "flex",
    flexDirection: "column",
    width: "25vw",
    height: "10vh",
  };
  return <div style={style}>{answers}</div>;
}

function Question(props) {
  return <h1>{props.question}</h1>;
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        { question: "What is 1+1?", options: [1, 2, 3, 4], answer: 1 },
        { question: "What is 1+2?", options: [6, 5, 3, 4], answer: 2 },
        { question: "What is 1+3?", options: [2, 3, 7, 4], answer: 3 },
        {
          question: "Game over.",
          options: [":)", ":)", ":)", ":)"],
          answer: null,
        },
      ],

      questionNumber: 0,
      corrects: 0,
      incorrects: 0,
    };

    this.handleClickForNextQuestion = this.handleClickForNextQuestion.bind(
      this
    );
    this.handleClickForReset = this.handleClickForReset.bind(this);
    this.style = { display: "flex", justifyContent: "center" };
  }

  handleClickForNextQuestion(indexNumber) {
    if (this.state.questionNumber < this.state.questions.length - 1) {
      if (
        indexNumber == this.state.questions[this.state.questionNumber].answer
      ) {
        this.setState({
          questionNumber: this.state.questionNumber + 1,
          corrects: this.state.corrects + 1,
        });
      } else {
        this.setState({
          questionNumber: this.state.questionNumber + 1,
          incorrects: this.state.corrects + 1,
        });
      }
    } else {
      this.setState({ questionNumber: this.state.questions.length - 1 });
    }
  }

  handleClickForReset() {
    this.setState({ questionNumber: 0, corrects: 0, incorrects: 0 });
  }

  render() {
    return (
      <div style={this.style}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Question
            question={this.state.questions[this.state.questionNumber].question}
          />
          <Answers
            options={this.state.questions[this.state.questionNumber].options}
            handleClick={this.handleClickForNextQuestion}
          />
          <Reset handleClick={this.handleClickForReset} />
        </div>
        <div style={{ margin: "4vw", display: "flex", alignItems: "center" }}>
          <div>
            <Corrects corrects={this.state.corrects} />
            <Incorrects incorrects={this.state.incorrects} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

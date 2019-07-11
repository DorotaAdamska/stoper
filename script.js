class Stopwatch extends React.Component {
    constructor(element) {
        this.running = false;
        this.element = element;
        this.reset();
        this.print(this.times);
    }
    

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.results = []
        this.print();
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

        function pad0(value) {
            let result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
  
    addResult() {
      this.results.push({ ...this.times });
      this.renderResults();
    }
  
    renderResults() {
      this.element.querySelector('.results').innerHTML = '';
      this.results.forEach(result => {
        let newLi = document.createElement('li');
        newLi.innerText = this.format(result);
        this.element.querySelector('.results').appendChild(newLi);
      })
    }

    render() {
        return  (
            <div>
                <nav className="controls">
                    <a href="#" 
                    className="button" 
                    onClick={this.start}>Start</a>
                    <a href="#" 
                    className="button"  
                    onClick={this.stop}>Stop</a>
                    <a href="#" 
                    className="button" 
                    onClick={this.addResult}>Zapisz</a>
                    <a href="#" 
                    className="button" 
                    onClick={this.reset}>Zeruj licznik</a>
                </nav>
            <div className="display">{this.print}</div>
                <ul className="results"></ul> 
            </div> 
        );
    } 
}

const app = React.createElement(App);
ReactDOM.render(app, document.getElementById('stopwatch'));


/* let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let addResultBtn = document.getElementById('addResult');
addResultBtn.addEventListener('click', () => stopwatch.addResult());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset()); */
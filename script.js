

const App = () => {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [play, setPlay] = React.useState(false);
    const [timingType, setTimingType] = React.useState("SESSION");
    const [timeLeft, setTimeLeft] = React.useState(1500);
    
    const timeout = setTimeout(() => {
        if(timeLeft && play){
            setTimeLeft(timeLeft - 1)
        }
    }, 1000);

    //Lets start with handle break increase
    const handleBreakIncrease = () => {
        if(breakLength < 60){
            setBreakLength(breakLength + 1)
        }
    }
    // lets handle break decrease here
    const handleBreakDecrease = () => {
        if(breakLength > 1){
            setBreakLength(breakLength - 1)
        }
    }

    // let hnadle the sessions here
    const handleSessionIncrease = () => {
        if(sessionLength < 60){
            setSessionLength(sessionLength + 1)
            setTimeLeft(timeLeft + 60)
        }
    }

    const handleSessionDecrease = () => {
        if(sessionLength > 1){
            setSessionLength(sessionLength -1)
            setTimeLeft(timeLeft - 60)
        }
    }

    const timeFormatter = () => {
        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft - minutes * 60;

        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const handlePlay = () => {
        clearTimeout(timeout);
        setPlay(!play);
    }

    const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(!timeLeft && timingType === 'SESSION'){
            setTimeLeft(breakLength * 60)
            setTimingType("BREAK")
            audio.play()
        }
        if(!timeLeft && timingType === 'BREAK'){
            setTimeLeft(breakLength * 60)
            setTimingType("SESSION")
            audio.pause()
            audio.currentTime = 0;
        }
    }

    const clock = () => {
        if(play){
            timeout
            resetTimer()
        }else{
            clearTimeout(timeout)
        }
    }

    const handleReset = () => {
        clearTimeout(timeout);
        setPlay(false);
        setTimeLeft(1500);
        setBreakLength(5);
        setSessionLength(25);
        setTimingType("SESSION");
        const audio = document.getElementById("beep");
        audio.pause()
        audio.currentTime = 0;
    }

    React.useEffect(() => {
        clock()
    }, [play, timeLeft, timeout])

    

    const title = timingType === 'SESSION' ? 'Session' : 'Break'
    return (
    <div>
        <div className="wrapper">
            <h2>25 + 5 Clock</h2>
            <div id="break-session-length">
                <div>
                    <h3 id="break-label">Break Length</h3>
                    <div>
                        <button id="break-increment"onClick={handleBreakIncrease} disabled={play}>Increase</button>
                        <strong id="break-length">{breakLength}</strong>
                        <button id="break-decrement" disabled={play} onClick={handleBreakDecrease}>Decrease</button>
                    </div>
                </div>
                <div>
                    <h3 id="session-label">Break Session</h3>
                    <div>
                        <button id="session-increment" disabled={play} onClick={handleSessionIncrease}>Increase</button>
                        <strong id="session-length">{sessionLength}</strong>
                        <button id="session-decrement" disabled={play} onClick={handleSessionDecrease}>Decrease</button>
                    </div>
                    <button onClick={handlePlay} id="start_stop">Start/Stop</button>
                    <button onClick={handleReset} id="reset">Reset</button>
                </div>  
            </div>
            <div className="timer-wrapper" id="timer-wrapper">
                <div className="timer">
                    <h2 id="timer-label">{title}</h2>
                    <h3 id="time-left">{timeFormatter()}</h3>
                </div>
            </div>
        </div>
        <audio
        id="beep"
        preload="auto"
        src='https://res.cloudinary.com/drpcjt13x/video/upload/v1599590677/Proyectos/Pomodoro%20Clock/bells003_ne9dwp.wav' />
    </div>);
}

ReactDOM.render(<App />, document.getElementById("root"))
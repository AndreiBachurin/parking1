export default function Time(props) {
    let time = timeFormat(Math.floor(props.time / 3600).toString()) + ":" + timeFormat(Math.floor((props.time % 3600)/60).toString()) + ":" + timeFormat((props.time % 60).toString());

    function timeFormat(string: string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    return (
        <>
        {props.isStart && <div 
        style={{
            position: 'absolute',
            top: 590,
            left: "45%"
        }}>
        <p className="text-center font-mono text-xl text-orange-400">{time}</p>
        <button className="bg-orange mt-2 ml-5 px-2 rounded-md text-gray-700 text-lg" onClick={props.onStopClick}>END PARKING</button>
        {props.isStop && <p className="text-center font-mono mt-2 text-orange-400">PARKING COMPLETED!</p>}
        </div>}
        </>       
    )    
}
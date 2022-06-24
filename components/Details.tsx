import { ChangeEvent, MouseEvent } from "react";

interface PropsTypes{
    isStreet: boolean;
    street: Street;
    slot: number;
    times: number[][];
    onSlotChange(event: ChangeEvent<HTMLSelectElement>): void;
    onParkClick(event: MouseEvent<HTMLElement>): void 
}

interface Street{
    name: string;
    tax: number
}

export default function Details(props: PropsTypes) {
    return (
        <>
        {props.isStreet && <div 
        style={{
            position: 'absolute',
            top: 480,
            left: "39%"
        }}>
        <p className="text-center font-mono text-orange-400">SELECTED PLACE: {props.street.name}</p>
        <p className="text-center font-mono text-orange-400">RATE: {`${props.street.tax} RUB/HOUR`}</p>
        </div>}
        {props.isStreet && <div 
        style={{
            position: 'absolute',
            top: 540,
            left: "35%"
        }}>
        <label className="font-mono text-orange-400" htmlFor="slot">{"PARKING TIME: "}</label>   
        <select id="slot" size={1} className="bg-transparent border border-orange-400 text-orange-400 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-orange-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={props.onSlotChange}>
            {props.times.map((time, index) => <option key={index} value={index}>{`0${time[0]}:${time[1]}0`}</option>)}
        </select>
        {props.slot!=0 && <button className="bg-orange font-mono px-2 rounded-md text-gray-700 text-lg" style={{margin: 10}} onClick={props.onParkClick}>{`PARK FOR ${(props.slot/2)*props.street.tax} RUB/HOUR`}</button>}
        </div>}
        </>
        
    )
}
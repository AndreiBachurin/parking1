import { ChangeEvent } from "react";

interface PropsTypes{
    onStreetSelect(event: ChangeEvent<HTMLSelectElement>): void
}    

export default function Streets(props: PropsTypes) {
    return (
        <div 
        style={{
            position: 'absolute',
            top: 410,
            left: "46%"
        }}>
        <p className="font-mono text-orange-400">CHOOSE PARKING: </p>
        <select className="block py-1.5 px-0 w-full text-sm text-orange-400 bg-transparent border-0 border-b-2 border-orange-400" onChange={props.onStreetSelect}>
            <option value="">SELECT ONE...</option>
            <option value="ngl">NEGLINNAYA str.</option>
            <option value="ptn">PYATNITSKAYA str.</option>
            <option value="ust">USTINSKY dr.</option>
            <option value="ktz">KUTUZOVSKY ave.</option>
            <option value="bkn">BAKUNINSKAYA str.</option>
            <option value="lng">LENINGRADSKY ave.</option>
        </select>
        </div>
    )
}


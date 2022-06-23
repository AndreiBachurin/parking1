export default function MapBox(props) {
    return (
        <>
        <p className="text-center mt-3 font-mono text-orange-400">PARKING IN MOSCOW</p>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet"/>
        <div
        id={props.map}
        style={{
            position: 'absolute',
            top: 50,
            bottom: 0,
            width: '100%',
            height: 350,
         }}/>
        </>
    )
}

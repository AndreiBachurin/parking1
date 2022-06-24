import type { NextPage } from 'next'
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import mapboxgl from "mapbox-gl";
import MapBox from '../components/MapBox'
import Time from '../components/Time';
import Streets from '../components/Streets';
import Details from '../components/Details';

const Home: NextPage = () => {
  const [street, setStreet] = useState({id: "", name: "", lng: 0, lat: 0, tax: 0});
  const [isStreet, setIsStreet] = useState(false);
  const [marker, setMarker] = useState(new mapboxgl.Marker());
  const [slot, setSlot] = useState(0);
  const [time, setTime] = useState(0);
  const maxHours = 5;
  const [isStart, setIsStart] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const streets =[
      {id: "ngl", name: "NEGLINNAYA STREET", lng: 37.62, lat: 55.76, tax: 450},
      {id: "ptn", name: "PYATNITSKAYA STREET", lng: 37.63, lat: 55.74, tax: 380},
      {id: "ust", name: "USTINSKY DRIVE", lng: 37.64, lat: 55.75, tax: 200},
      {id: "ktz", name: "KUTUZOVSKY AVENUE", lng: 37.51, lat: 55.735, tax: 150},
      {id: "bkn", name: "BAKUNINSKAYA STREET", lng: 37.69, lat: 55.78, tax: 80},
      {id: "lng", name: "LENINGRADSKY AVENUE", lng: 37.516, lat: 55.80, tax: 40}
];
  let times = [[0, 3]];
  for (var hour = 1; hour < maxHours; hour++) {
      times.push([hour, 0]);
      times.push([hour, 3]);
  }
  times.push([maxHours, 0]);
  mapboxgl.accessToken =
        "pk.eyJ1IjoiYW5kcmVpYmFjaHVyaW4iLCJhIjoiY2wzcjkwNGVjMGh3ZzNjcDdmOTV3YnlhaSJ9.LzhaJXZjkTn10--iuTAr2A";
    
  useLayoutEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [37.61, 55.76],
      zoom: 10
    });
    setMarker(new mapboxgl.Marker().setLngLat([37.61, 55.76]).addTo(map));
    return () => { map.remove() };
  }, []);

  useEffect(() => {
    if (isStart && !isStop && time > 0) {
        const timerId = setTimeout(() => {
           setTime(time - 1); 
        }, 10)
        return () => {
            clearTimeout(timerId);
        }    
    }
});

function handleStreetSelect(event: ChangeEvent<HTMLSelectElement>) {
    const str = streets.find((str) => str.id == event.target.value)!;
    marker.setLngLat([str.lng, str.lat]);
    setStreet(str);
    setIsStreet(true);
}

function handleSlotChange(event: ChangeEvent<HTMLSelectElement>) {
    setSlot(parseInt(event.target.value) + 1);
}

function handleParkClick() {
    setTime(3600 * slot / 2);
    setIsStart(true);
    setIsStop(false);
}

function handleStopClick() {
    setIsStop(true);
}
  return (
    <>
    <MapBox map={"map"}/>
    <Streets onStreetSelect={handleStreetSelect}/>
    <Details street={street} isStreet={isStreet} times={times} slot={slot} onSlotChange={handleSlotChange} onParkClick={handleParkClick}/>
    <Time time={time} isStart={isStart} isStop={isStop} onStopClick={handleStopClick}/>
    </>
  ) 
}

export default Home

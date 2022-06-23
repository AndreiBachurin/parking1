import type { NextPage } from 'next'
import { useEffect, useLayoutEffect, useState } from 'react';
import mapboxgl from "mapbox-gl";
import MapBox from '../components/MapBox'
import Time from '../components/Time';
import Streets from '../components/Streets';
import Details from '../components/Details';

const Home: NextPage = () => {
  const [street, setStreet] = useState({});
  const [isStreet, setIsStreet] = useState<boolean>(false);
  const [marker, setMarker] = useState({});
  const [slot, setSlot] = useState(0);
  const [time, setTime] = useState(0);
  const maxHours = 5;
  const [isStart, setIsStart] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const streets = [
      {id: "ngl", name: "NEGLINNAYA STREET", lngLat: [37.62, 55.76], tax: 450},
      {id: "ptn", name: "PYATNITSKAYA STREET", lngLat: [37.63, 55.74], tax: 380},
      {id: "ust", name: "USTINSKY DRIVE", lngLat: [37.64, 55.75], tax: 200},
      {id: "ktz", name: "KUTUZOVSKY AVENUE", lngLat: [37.51, 55.735], tax: 150},
      {id: "bkn", name: "BAKUNINSKAYA STREET", lngLat: [37.69, 55.78], tax: 80},
      {id: "lng", name: "LENINGRADSKY AVENUE", lngLat: [37.516, 55.80], tax: 40}
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

function handleStreetSelect(event) {
    const str = streets.find((str) => str.id == event.target.value);
    marker.setLngLat(str.lngLat);
    setStreet(str);
    setIsStreet(true);
}

function handleSlotChange(event) {
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

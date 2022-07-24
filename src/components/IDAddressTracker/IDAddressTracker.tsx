import { useEffect, useState } from 'react';
import s from './IDAddressTracker.module.scss';
import Input from './Input/Input';
import Map from './Map/Map';

export interface ITracker {
  name: string;
  value: string;
}

let tracker: Array<ITracker> = [
  {
    name: 'IP ADDRESS',
    value: 'none',
  },
  {
    name: 'LOCATION',
    value: 'none',
  },
  {
    name: 'TIMEZONE',
    value: 'none',
  },
  {
    name: 'ISP',
    value: 'none',
  },
];

const IDAddressTracker = () => {
  const [track, setTrack] = useState(tracker);

  const [coord, setCoord] = useState([-87.65, 41.84]);

  function clickForm(newTrack: Array<ITracker>) {
    setTrack(newTrack);
  }

  useEffect(() => {
    if (track[1].value != 'none')
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${track[1].value}.json?access_token=pk.eyJ1IjoiY29uc3RhdCIsImEiOiJjbDV4dW1uMW0wMXBhM2RvOThuemswbXd2In0.bun1EO46QgaaCWmy6_mNYg`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.features[2]?.center)
            setCoord([data.features[2].center[0], data.features[2].center[1]]);
        })
        .catch((err) => console.log(err));
  }, [track]);

  return (
    <article className={s.tracker}>
      <div className={s.header}>
        <div className={s.title}>
          <p>IP Address Tracker</p>
        </div>
        <div className={s.form}>
          <Input onClick={clickForm} />
        </div>
      </div>
      <div className={s.map}>
        <Map x={coord[0]} y={coord[1]} />
      </div>
      <div className={s.address}>
        {track.map((elem, index) => (
          <div key={'id' + index} className={s.addressContent}>
            <div className={s.nameTitle}>{elem.name}</div>
            <div className={s.valueTitle}>{elem.value}</div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default IDAddressTracker;

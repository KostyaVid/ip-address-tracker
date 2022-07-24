import { useState, useEffect, ChangeEvent } from 'react';
import { ITracker } from '../IDAddressTracker';
import s from './Input.module.scss';

interface IInput {
  onClick: (newTrack: Array<ITracker>) => void;
}

const Input = ({ onClick }: IInput) => {
  const [ip, setIp] = useState<string | null>(null);
  const [valueInput, setValueInput] = useState('');
  const [errorIP, setErrorIP] = useState(false);

  function changeInputValue(e: ChangeEvent<HTMLInputElement>) {
    setValueInput(e.currentTarget.value);
    setErrorIP(false);
  }

  function sendIP() {
    if (valueInput === '') return;

    if (valueInput.match(/^ *\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3} *$/g)) {
      setIp(valueInput);
    } else {
      setErrorIP(true);
    }
  }

  useEffect(() => {
    if (ip) {
      fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=at_hudpYbtvgQdbOYe9Pfbwgy0vFysUq&ipAddress=${ip}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.ip && data.location.region && data.location.timezone && data.isp) {
            onClick([
              {
                name: 'IP ADDRESS',
                value: data.ip,
              },
              {
                name: 'LOCATION',
                value: data.location.region,
              },
              {
                name: 'TIMEZONE',
                value: data.location.timezone,
              },
              {
                name: 'ISP',
                value: data.isp,
              },
            ]);
          }
        })

        .catch((err) => console.log(err));
    }
  }, [ip]);

  return (
    <>
      <input
        placeholder="Search for any IP address ar domain"
        className={[s.input, errorIP ? s.errorIP : ' '].join(' ')}
        onChange={changeInputValue}
        value={valueInput}
      />
      <button className={s.button} onClick={sendIP}>
        <img src="./images/icon-arrow.svg" alt="Button" width={11} height={14} />
      </button>
    </>
  );
};

export default Input;

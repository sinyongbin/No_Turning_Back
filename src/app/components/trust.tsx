import React, { useState } from 'react';

function TemperatureForm() {
  const [temperature, setTemperature] = useState(20);

  const getEmoji = () => {
    if (temperature <= 0) {
      return '❄️'; // 영하 온도 이모티콘
    } else if (temperature <= 25) {
      return '🌡️'; // 적정 온도 이모티콘
    } else {
      return '☀️'; // 더운 온도 이모티콘
    }
  };

  const handleTemperatureChange = (e:any) => {
    setTemperature(e.target.value);
  };

  return (
    <div>
      <h2>신뢰도 체크</h2>
      
      <label>
        현재 온도: {temperature} ℃
        {/* <input
          type="text"
          value={temperature}
          onChange={handleTemperatureChange}
        /> */}
      </label>
      <p>신뢰 지수: {getEmoji()}</p>
    </div>
  );
}

export default TemperatureForm;

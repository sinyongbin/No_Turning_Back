import React, { useState } from 'react';

const options = [
  '패션/뷰티',
  '취미/키덜트',
  '디지털/가구/가전',
  '스포츠',
  '자동차',
  '기타',
];

function App() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (event:any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select
        className="block w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p hidden={true}>{selectedOption}</p>
    </div>
  );
}

export default App;

import { Disclosure } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';

const navigation = [
    { name: '패션/뷰티', href: 'list/beauty', current: true },
    { name: '취미/키덜트', href: 'list/hobby', current: false },
    { name: '디지털/가구/가전', href: 'list/digital', current: false },
    { name: '스포츠', href: 'list/sport', current: false },
    { name: '자동차', href: 'list/car', current: false },
    { name: '기타', href: 'list/etc', current: false },
];

export default function Nav() {
    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchToggle = () => {
        setIsActive(!isActive);
        setSearchText('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            fetch(`/api/search?=${searchText}`)
                .then((response) => response.json())
                .then((data) => {
                    setSearchResults(data);
                })
                .catch((error) => {
                    console.error('검색 요청 오류:', error);
                });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };
    
    return (
        <>
            <Disclosure as="nav" className="bg-white mb-10">
                {(open) => (
                    <div className="">
                        <div className="flex-container justify-center items-center">
                            <div className="flex-item">
                                <div className={`search-wrapper ${isActive ? 'active' : ''}`}>
                                    <div className="input-holder">
                                        {isActive && (
                                            <input
                                                type="text"
                                                className="search-input placeholder:text-cyan-50"
                                                placeholder="Search..."
                                                value={searchText}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}
                                            />
                                        )}
                                        <button className="search-icon" onClick={searchToggle}>
                                            <div className="center-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-8 h-8 text-current"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <span className="close" onClick={searchToggle}></span>
                                    <button className="search-submit-button" onClick={handleSearch}>
                                       
                                    </button>
                                </div>
                                {searchResults.length > 0 && (
                                    <div className="search-results">
                                        {searchResults.map((e:any, index) => (
                                            <div key={index} className="result-item">
                                                <p>{e.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="link-container space-x-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`nav-link ${
                                                item.current ? 'current' : ''
                                            } flex-auto text-black font-bold `}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                )}
            </Disclosure>
        </>
    );
}

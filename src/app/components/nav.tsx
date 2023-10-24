/* eslint-disable @next/next/no-img-element */
import { Disclosure } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';

const navigation = [
    { name: '패션/뷰티', href: '/list/beauty', current: true },
    { name: '취미/키덜트', href: '/list/hobby', current: false },
    { name: '디지털/가구/가전', href: '/list/digital', current: false },
    { name: '스포츠', href: '/list/sport', current: false },
    { name: '자동차', href: '/list/car', current: false },
    { name: '기타', href: '/list/etc', current: false },
];

export default function Nav() {
    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<any>([]);

    const searchToggle = () => {
        setIsActive(!isActive);
        setSearchText('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            fetch(`/api/serach/${searchText}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log('data:', data);
                    setSearchResults(data);
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                });
        } else {
            alert('검색어를 입력하세요');
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
                    <div className="">
                        <div className="flex justify-center items-center">
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
                                <button className="search-submit-button" onClick={handleSearch}></button>
                            </div>
        
                            <div className="flex-item">
                                <div className="link-container space-x-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`nav-link ${item.current ? 'current' : ''} flex-auto text-black font-bold `}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {searchResults.length > 0 && (
                                <div className="bg-white">
                                    <div>
                                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                            <h2 className="sr-only">Products</h2>
                                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                                {searchResults.map((e: any, key: number) => (
                                                    <div key={key} className="product-item">
                                                        <a href={`/listdetail/${e.id}`} className="group">
                                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                                <img
                                                                    src={e.images[0]}
                                                                    alt={e.imageAlt}
                                                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                                    style={{ width: '280px', height: '280px' }}
                                                                />
                                                            </div>
                                                            <h3 className="mt-4 text-sm text-gray-700">{e.title}</h3>
                                                            <p className="mt-1 text-lg font-medium text-gray-900">
                                                                {e.starting_price}
                                                            </p>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className=""></div>
                    </div>
               
            </Disclosure>
        </>
    );
}

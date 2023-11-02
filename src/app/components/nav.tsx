/* eslint-disable @next/next/no-img-element */
"use client"
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
                    if (data.length === 0) {
                        alert('그런 물품은 없어요 ㅠㅠ');
                    } else {
                        // console.log('data:', data);
                        setSearchResults(data);
                    }
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
                        <div className=""></div>
                    </div>
            </Disclosure>
        </>
    );
}
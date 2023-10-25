"use client"

import Nav from "@/app/components/nav";
import { useEffect, useState } from "react"

export default function Table() {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [postData, setPostData] = useState<any>([]);

    useEffect(()=>{
        getData();
    }, [])

    async function getData() {
        const loggedEmail = sessionStorage.getItem('loggedEmail');

        await fetch(`/api/buytable/${loggedEmail}`,{
            method:"POST",
            body: JSON.stringify(loggedEmail),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((e) => e.json())
        .then((e) => {
            setProducts(e);
            setVisibleProducts(e.slice(0, 8)); // 초기에 표시할 상품 설정

        })
        .catch((error) => console.error(error));
    }

    const loadMoreProducts = () => {
        const currentLength = visibleProducts.length;
        const nextProducts = products.slice(currentLength, currentLength + 8);

        if (nextProducts.length > 0) {
            setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
        }
    }
    
    function ListDetailPage(){
        return(
            <div className="mx-48 p-3 ">
            <div className="mb-4">
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                        <th className="border border-gray-300 p-2 w-7/12">제목</th>
                        <th className="border border-gray-300 p-2 w-2/12">판매자</th>
                        <th className="border border-gray-300 p-2 w-2/12">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                    {visibleProducts.map((e: any, key: number) => (
                        <tr key={key}>
                        <td className="border border-gray-300 p-2">
                            <a href={`/buy/${e.postId}`}>
                                <p>{e.title}</p>
                            </a>
                        </td>
                        <td className="border border-gray-300 p-2">
                            <h3>{e.sellerEmail}</h3>
                        </td>
                        <td className="border border-gray-300 p-2">
                            <h3>{e.currentPrice}</h3>
                        </td>        
                        </tr>
                    ))}    
                    </tbody>
                </table>
                <div className="text-center mt-4">
                    {visibleProducts.length < products.length && (
                        <button
                            className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 border-2 rounded-lg animate-bounce"
                            onClick={loadMoreProducts}
                        >
                            더 보기
                        </button>
                    )}
                </div>
            </div>
            </div>
        )
    }

    return (
        <>
            {postData == undefined ? <div>test</div> : <ListDetailPage/>}
        </>
    )
}
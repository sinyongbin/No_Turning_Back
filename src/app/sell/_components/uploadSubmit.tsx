'use client'

import { PlusIcon , TrashIcon} from '@heroicons/react/24/outline';
import { useState ,useEffect ,ChangeEvent} from 'react';

export default function UploadSubmit({ previewImg, setPreviewImg }: any){
    //{ previewImg: Array<string>, setPreviewImg: React.Dispatch<React.SetStateAction<Array<string>>>) => 지피티가 알려준 타입
    
    // const [previewImg, setPreviewImg] = useState<any>([])

    useEffect(()=>{
        
    },[previewImg]);

    async function onChange(e : ChangeEvent<HTMLInputElement>)
    {
        let files = e.currentTarget.files
        let temp :any = []
        
        if((files?.length + previewImg.length) > 8 )
        {
            alert("최대 8장까지")
        }
        else if(files !=null){
            for(let i =0; i < files.length; i++)
            {
                let base = await toBase64(files[i])
                if(!temp.includes(base))
                    temp.push(base)
                else
                    console.log("duplicated image")
            }
            setPreviewImg([...previewImg,...temp])
        }
    }


    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
    
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    // 이미지를 Base64로 변환하고 배열에 추가
    // const images = event.currentTarget.elements.images.files;
    // const imageBase64Array = await Promise.all([...images].map((file) => toBase64(file)));

    return(
        <div className='flex'>
                <div className='mt-4'>
                    <div className='w-20 h-20 hover:bg-slate-200 shadow-lg rounded-lg'>
                        <input 
                            type='file'
                            accept='image/*'
                            // name='images'
                            multiple = {true}
                            className="opacity-0 w-20 h-20 absolute" 
                            onChange={(e)=>{onChange(e)}}/>
                        <div className='flex w-full text-center justify-center'>
                            <span><PlusIcon className='w-20 h-20'/></span>
                        </div>
                    </div>
                    <div className='w-20 h-20 hover:bg-slate-200 shadow-lg rounded-lg'>
                            <button className='w-20 h-20' onClick={()=>{
                                    if(previewImg.length==0)
                                    {
                                        alert("삭제할 이미지가 없습니다")
                                    }else
                                    {   
                                        let tempData : any = []
                                        let inputs : any = document.getElementsByClassName("img-input")
                                        for(let i =0; i < inputs.length;i++)
                                        {
                                            if(!inputs[i].className.split(' ').includes("grayscale"))
                                            {
                                                let temp  = inputs[i].src;
                                                tempData.push(temp)
                                            }
                                        }
                                        setPreviewImg(tempData)
                                    }
                                }} >
                                <TrashIcon className='w-20 h-20'/>
                            </button>
                    </div>
                </div>
            <div className='grid h-52 ml-2 gap-4 mt-4 grid-cols-4'>
                <Preview/>
            </div>
        </div>
    )

    function Preview(){
        return(
            <>
                {   
                    previewImg.map((e:any, i:number)=>{
                        return(
                            <div key={i} className='mt-5'>
                            <img 
                            src={e}
                            alt={''} 
                            onClick={(e)=>{
                               let list = e.currentTarget.className.split(' ')
                               if(!list.includes('grayscale'))
                               {
                                e.currentTarget.className ='img-input object-cover grayscale blur h-48 w-48 outline-2 outline-double outline-red-400'
                               
                               }
                               else{
                                e.currentTarget.className ='img-input object-cover h-48 w-48 outline-2 outline-double outline-black-400'
                               }
                                
                               
                            }}
                                className='img-input object-cover h-48 w-48 outline-2 outline-double outline-black-400'/>  
                        </div>
                    )}
                    )
                }
            </>
        )
    }
}
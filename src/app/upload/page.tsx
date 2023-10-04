'use client'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import { FormEvent, useState ,useRef} from 'react';

export default function Upload() {
    const [search, setSearch] = useState(null)
    const [onDragging, setOnDragging]= useState(false)
    const [result, setResult] = useState<any>([])
    const [previewImg, setPreviewImg] = useState<FileList>()
    
    let ref = useRef(null)
    let file= new FormData();
   

    function uploadHandler(e : FormEvent<HTMLInputElement>){
        imageHandler( e.currentTarget.files);
    }
    async function imageHandler(files : FileList|null)
    {   
        if(files !=null)
            for(let i = 0; i < files.length; i ++){
                file.append("image",files[i],files[i].name)
            }
    }
    function fileToByte(file : File)
    {
        const reader = new FileReader();
        return new Promise((resolve,rejects)=>{    
            reader.onload = () => resolve(reader)
            reader.onerror=  (err) => rejects(err)
            reader.readAsDataURL(file)
        })
    }
    function previewImage()
    {
        return(
            <div className='grid grid-rows-2'>
                <div className="preview">
                    
                </div>
                <div className="grid grid-cols-3 buttoncontainer">
                        <div><button>prev</button></div>
                        <div><button>delete</button></div>
                        <div><button>foward</button></div>
                </div>
            </div>
        )
    }
    async function handleSumbit()
    {
       let arrayOfImage =await ImageToURL();
       let body = {
            imageFile : arrayOfImage
       } 
       let data= await fetch("/api/fileUpload",{

            method: "POST",
            body : JSON.stringify(arrayOfImage)
        }).then(e=>{
            return e.json()
        }).catch((e)=> {throw e})
        
    }
    async function ImageToURL()
    {
        let urlData:any = []
        let msg = "이미지는 최대 8장 까지 가능합니다"
        if(urlData.length < 9){
            let image = file.getAll("image")
            for(let i =0; i < image.length;i++)
            {
                let tempImage = image[i] as File
                let temp = await fileToByte(tempImage)
                if( temp !=undefined )
                {
                    if(urlData.length == 8){
                        alertMessage("이미지는 최대 8장까지 가능합니다")
                        break;
                    }
                    urlData.push(
                        {
                            fileNmae : tempImage.name,
                            baseUrl:temp.result
                        });
                }
            }
        }
        return urlData;
    }
    function alertMessage(msg : string)
    {
        alert(msg)
    }
    function UpImage()
    {   
        return(
        <div 
        className={    
            onDragging ? `col-span-full bg-gray-600 opacity-50`:`col-span-full`} 
            onDragOver={(e)=>{
                e.preventDefault()
                setOnDragging(true)}}
            onDragLeave={()=>setOnDragging(false)}
            onDrop={(ev)=>{
                ev.preventDefault()
                let data = ev.dataTransfer
                imageHandler(data.files)
                setOnDragging(false)
            }}>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <PhotoIcon className={
                        onDragging ? `opacity-0 mx-auto h-12 w-12 text-gray-300`:`mx-auto h-12 w-12 text-gray-300`} aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className={
                                onDragging ? ``:
                                `relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500`}>
                            <span>Upload a file</span>
                            <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            accept='image/*'
                            multiple = {true}
                            className="sr-only" 
                            onInput={uploadHandler}
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>)
    }
    return (
        <div className='mx-48'>
            <UpImage/>
            <button onClick={handleSumbit}>
                    uploadButton
            </button>   
            <div >
                <input    ref={ref} type='image'/>

            </div>
        </div>
    )
}

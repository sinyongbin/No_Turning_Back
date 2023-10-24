import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(request:NextRequest,context: { params: any }) {
    let myemail = context.params.id;

    try{
        const result = await fetch(`http://localhost:8080/transaction/buyerTransaction/${myemail}`,{
            method : "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        })

        if(result.status === 200){
            const response = await result.json();

            const { current_price, post_id } = response;

            console.log(response.post_id);

            const data = await prisma.post.findMany({
                select :  {
                    title: true,
                },
                where : {   
                    email: myemail
                }
            });

            const combinedData = {
                post_id,
                current_price,
                title: data[0].title, 
            };

            return NextResponse.json(combinedData)
        }

    }
    catch(err){
        return NextResponse.json({result:"구매정보를 가져오지 못했습니다"},{status : 500});
    }
    return new Response("OK")
}
import { NextResponse , NextRequest } from "next/server";

export async function GET(req : NextRequest, context: { params: any }) {
    let id = context.params.id;
    let data = await fetch(`http://localhost:8080/transaction/post/${id}`, {
        method : "GET"
    })
    .then(e=>{return e.json()})
    return NextResponse.json(data)
}
export async function POST(req : NextRequest, context: { params: any }) {
    let id = context.params.id;
    let update =await req.json()
    try{
    await fetch(`http://localhost:8080/transaction/max_price`, {
        method : "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    })}
    catch(error){
        throw error
    }
    return  NextResponse.json(update)
}
export async function PUT()
{
    return null;
}
export async function DELETE()
{
    return null;
}
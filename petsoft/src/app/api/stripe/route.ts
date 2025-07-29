export async function POST(request: Request) {
    const body = await request.text();
    console.log("Received body:", body);

    return Response.json(null, {status: 200});

}
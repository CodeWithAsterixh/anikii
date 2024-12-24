import { __BASEURL__ } from "@/lib/constants/baseurl";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const requestData = await request.json();

    // Example: Expecting data in the request like { name: "example", category: "action" }
    const { collection } = requestData;

    if (!collection) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    // Construct the endpoint and send a POST request to an external API
    const endPoint = "/fyp"; // Replace with your desired endpoint
    const response = await fetch(__BASEURL__ + endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collection }), // Send the data in the request body
    });

    // Check if the response is OK
    console.log(response);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to create item: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Handle any errors that occurred during the request
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// @/app/api/admin/content/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the path to SiteContent.json
// CWD is the root of the project in Next.js API routes
const siteContentFilePath = path.join(process.cwd(), "src", "entities", "SiteContent.json");

export async function GET() {
  try {
    if (!fs.existsSync(siteContentFilePath)) {
      return NextResponse.json({ message: "Site content file not found." }, { status: 404 });
    }
    const fileContent = fs.readFileSync(siteContentFilePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    console.error("Error reading site content:", error);
    let errorMessage = "Failed to load site content.";
    if (error instanceof SyntaxError) {
      errorMessage = "Failed to parse site content: Invalid JSON format.";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Basic validation (optional, but good practice)
    if (!body || typeof body !== 'object' || !body.user || !body.projects || !body.skills) {
      return NextResponse.json({ message: "Invalid content structure provided." }, { status: 400 });
    }

    const newContent = JSON.stringify(body, null, 2); // Pretty print JSON
    fs.writeFileSync(siteContentFilePath, newContent, "utf-8");

    return NextResponse.json({ message: "Site content updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error writing site content:", error);
    let errorMessage = "Failed to update site content.";
     if (error instanceof SyntaxError) { // Error parsing request body
      errorMessage = "Invalid JSON payload provided.";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

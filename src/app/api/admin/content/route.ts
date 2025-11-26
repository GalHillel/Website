import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    if (process.env.NODE_ENV !== 'development') {
        return new Response('Forbidden: Read-only mode in production', { status: 403 });
    }

    try {
        // Security Check: Only allow in development or if password matches
        const isDev = process.env.NODE_ENV === 'development';
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        // Basic check - in a real app you'd check a session/cookie here
        // For this local CMS pivot, we rely on the fact it's running locally
        if (!isDev && !adminPassword) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Define path to the JSON file
        const filePath = path.join(process.cwd(), 'src', 'entities', 'SiteContent.json');

        // Write the updated content to the file
        await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Content saved successfully' });
    } catch (error: any) {
        console.error('Error saving content:', error);
        return NextResponse.json({ error: 'Failed to save content', details: error.message }, { status: 500 });
    }
}

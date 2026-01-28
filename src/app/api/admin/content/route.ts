import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    if (process.env.NODE_ENV !== 'development') {
        return new Response('Forbidden: Read-only mode in production', { status: 403 });
    }

    try {
        const isDev = process.env.NODE_ENV === 'development';
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;


        if (!isDev && !adminPassword) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const dataDir = path.join(process.cwd(), 'src', 'data');
        const filePath = path.join(dataDir, 'SiteContent.json');

        await fs.mkdir(dataDir, { recursive: true });

        await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Content saved successfully' });
    } catch (error: any) {
        console.error('Error saving content:', error);
        return NextResponse.json({ error: 'Failed to save content', details: error.message }, { status: 500 });
    }
}

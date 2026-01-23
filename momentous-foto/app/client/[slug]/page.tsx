import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ClientGallery from './ClientGallery';

// Update Client Data to include folderName for dynamic image loading
const clients = [
    {
        id: 1,
        names: 'Alan & Naim',
        slug: 'alan-naim',
        category: 'Post Wedding',
        date: '2024',
        folderName: 'alan-naim',
    },
    {
        id: 2,
        names: 'Qistina & Aswad',
        slug: 'qistina-aswad',
        category: 'Pre Wedding',
        date: '2025',
        folderName: 'qistina-aswad',
    },
    {
        id: 3,
        names: 'Syahirah & Adib',
        slug: 'syahirah-adib',
        category: 'Post Wedding',
        date: '2025',
        folderName: 'syahirah-adib',
    },
    {
        id: 4,
        names: 'Najwa & Luqman',
        slug: 'najwa-luqman',
        category: 'Pre Wedding',
        date: '2025',
        folderName: 'najwa-luqman',
    },
    {
        id: 5,
        names: 'Nadiah & Akmal',
        slug: 'nadiah-akmal',
        category: 'Pre Wedding',
        date: '2025',
        folderName: 'nadiah-akmal',
    },
    {
        id: 6,
        names: 'Hasya & Irfan',
        slug: 'hasya-irfan',
        category: 'Pre Wedding',
        date: '2025',
        folderName: 'hasya-irfan',
    },
    {
        id: 7,
        names: 'Mimin & Wong',
        slug: 'mimin-wong',
        category: 'Post Wedding',
        date: '2025',
        folderName: 'mimin-wong',
    },
    {
        id: 8,
        names: 'Huda & Ekhmal',
        slug: 'huda-ekhmal',
        category: 'Pre Wedding',
        date: '2025',
        folderName: 'huda-ekhmal',
    },
    {
        id: 9,
        names: 'Ain & Fairul',
        slug: 'ain-fairul',
        category: 'Pre Wedding',
        date: '2025',
        folderName: 'ain-fairul',
    },
    {
        id: 10,
        names: 'Inez & Sadon',
        slug: 'inez-sadon',
        category: 'Pre Wedding',
        date: '2026',
        folderName: 'inez-sadon',
    },
];

export async function generateStaticParams() {
    return clients.map((client) => ({
        slug: client.slug,
    }));
}

export default async function ClientGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const client = clients.find((c) => c.slug === resolvedParams.slug);

    if (!client) {
        notFound();
    }

    // Dynamic Image Loading Logic
    let galleryImages: string[] = [];

    if (client.folderName) {
        try {
            const clientImagesPath = path.join(process.cwd(), 'public', 'images', 'clients', client.folderName);

            // Check if directory exists
            if (fs.existsSync(clientImagesPath)) {
                // Read all files in the directory
                const files = fs.readdirSync(clientImagesPath);

                // Filter for image files (jpg, jpeg, png, webp)
                galleryImages = files.filter(file =>
                    /\.(jpg|jpeg|png|webp)$/i.test(file)
                );
            }
        } catch (error) {
            console.error(`Error reading images for client ${client.slug}:`, error);
        }
    }

    // Fallback if no images found
    if (galleryImages.length === 0) {
        galleryImages = Array.from({ length: 6 }, (_, i) => `dummy-${i}`);
    }

    return <ClientGallery client={client} galleryImages={galleryImages} />;
}

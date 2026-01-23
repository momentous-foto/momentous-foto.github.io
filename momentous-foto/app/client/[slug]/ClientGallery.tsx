'use client';

import { useState } from 'react';

interface ClientGalleryProps {
    client: {
        names: string;
        category: string;
        date: string;
        slug: string;
        folderName: string;
    };
    galleryImages: string[];
}

export default function ClientGallery({ client, galleryImages }: ClientGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrevious();
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-black">
            <section className="px-4 md:px-12 mb-12">
                <div className="max-w-[1400px] mx-auto">
                    <a
                        href="/"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200 mb-8 text-sm uppercase tracking-widest"
                    >
                        ← Back to Home
                    </a>

                    <div className="space-y-4">
                        <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs text-white/80 uppercase tracking-wider">
                            {client.category}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight">
                            {client.names}
                        </h1>
                        <p className="text-xl text-gray-400 font-light">
                            {client.date}
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full">
                {/* Single Column Layout, Full Width with Padding */}
                <div className="flex flex-col gap-4 px-[15%]">
                    {galleryImages.map((imgName, index) => {
                        // Determine image source: Real file or dummy
                        const isRealImage = !imgName.startsWith('dummy-');
                        const imgSrc = isRealImage
                            ? `/images/clients/${client.folderName}/${imgName}`
                            : undefined;

                        return (
                            <div
                                key={index}
                                className="relative w-full overflow-hidden group cursor-pointer"
                                onClick={() => isRealImage && openLightbox(index)}
                            >
                                {isRealImage ? (
                                    <>
                                        <img
                                            src={imgSrc}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                    </>
                                ) : (
                                    <div className="aspect-[3/4] flex items-center justify-center text-white/20 bg-white/5 rounded-lg">
                                        <span>Photo {index + 1}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-400 transition-colors z-50"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 text-white text-sm z-50">
                        {currentImageIndex + 1} / {galleryImages.length}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-4 text-white text-5xl hover:text-gray-400 transition-colors z-50"
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    {/* Current Image */}
                    <div
                        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={`/images/clients/${client.folderName}/${galleryImages[currentImageIndex]}`}
                            alt={`Photo ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-4 text-white text-5xl hover:text-gray-400 transition-colors z-50"
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}

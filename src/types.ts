//Creating TypeScript interfaces for the data structures returned by API
export interface Park {
    id: string;
    fullName: string;
    description: string;
    images: Array<{
        url: string;
        altText: string;
    }>;
}

export interface Campground {
    id: string;
    name: string;
    description: string;
}
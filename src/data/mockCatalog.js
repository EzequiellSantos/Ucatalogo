// Mock catalog data - simulates external JSON fetching
// In production, this would be fetched fr'om an API endpoint

export const catalogData = {
    GabrielEletromoveis: {

        companyId: 'gabrieleletromoveis',
        companyName: 'Gabriel Eletromóveis',
        logo: 'https://res.cloudinary.com/drjcwf7aq/image/upload/v1776202236/WhatsApp_Image_2026-04-13_at_15.28.06_pfiaya.jpg',
        logoAlt: 'https://res.cloudinary.com/drjcwf7aq/image/upload/v1776202455/logoGB-png_e5j5ro.png',
        coverImage: 'https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734289/1_kaabmw.jpg',
        whatsappNumber: '5588999156930',
        description: 'Maior loja de móveis e eletrodomésticos de Santana do Acaraú. Oferecemos uma ampla variedade de produtos para mobiliar e equipar sua casa com qualidade e estilo.',
        email: 'contato@gabrieleletromoveis.com.br',
        phone: '(88) 99915-6930',
        address: 'Chora, Satana do Acaraú, Ceará',
        hours: 'Seg-Sex: 9h-18h | Sáb: 10h-16h',
        socialMedia: {
            instagram: 'gabrieleletromoveis.oficial',
            // facebook: 'GabrielEletromoveis',
            // twitter: 'gabrieleletromoveis'
        },
        products: [
            {
                "id": 1,
                "name": "Airfryer Itatiaia",
                "category": "Eletroportateis",
                "price": 0,
                "description": "Airfryer Itatiaia",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776202236/WhatsApp_Image_2026-04-13_at_13.49.38_lyi6pz.jpg",
                "imageAlt": "Imagem Airfryer Itatiaia e Sanduicheira"
            },
            {
                "id": 2,
                "name": "Guarda Roupa Capelinha 2 Portas",
                "category": "Moveis",
                "price": 0,
                "description": "Guarda Roupa Capelinha",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776202236/WhatsApp_Image_2026-04-13_at_13.48.48_rfqwgq.jpg",
                "imageAlt": "Guarda Roupa Capelinha"
            },
            {
                "id": 3,
                "name": "Guarda Roupa Infantil",
                "category": "Moveis",
                "price": 0,
                "description": "Guarda Roupa Infantil",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776202236/WhatsApp_Image_2026-04-13_at_13.50.23_eumlpc.jpg",
                "imageAlt": "Guarda Roupa Infantil"
            },
            {
                "id": 4,
                "name": "Bancos Para Balcão",
                "category": "Moveis",
                "price": 0,
                "description": "Bancos Para Balcão",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776202236/WhatsApp_Image_2026-04-13_at_13.51.05_gddwjl.jpg",
                "imageAlt": "Bancos Para Balcão"
            }
        ],
        categories: [
            {
                id: 'Todos',
                name: 'Todos',
                image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=srgb&fm=jpg&q=85',
                count: 8
            },
            {
                id: 'Moveis',
                name: 'Moveis',
                image: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                count: 3
            }/* ,
            {
                id: 'Eletrodomesticos',
                name: 'Eletrodomésticos',
                image: 'https://images.unsplash.com/photo-1632923565835-6582b54f2105?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                count: 2
            }, */
            /* {
                id: 'Eletroeletronicos',
                name: 'Eletroeletrônicos',
                image: 'https://images.unsplash.com/photo-1717295248494-937c3a5655b1?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                count: 1
            }, */,
            {
                id: 'Eletroportateis',
                name: 'Eletroportáteis',
                image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                count: 2
            }
        ]
    }
};

// Simulate external API fetch
export const fetchCatalogData = async (companyId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const data = catalogData[companyId];

    if (!data) {
        throw new Error(`Company '${companyId}' not found`);
    }

    return data;
};

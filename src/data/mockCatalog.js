// Mock catalog data - simulates external JSON fetching
// In production, this would be fetched fr'om an API endpoint

export const catalogData = {
    GabrielEletromoveis: {

        companyId: 'gabrieleletromoveis',
        companyName: 'Gabriel Eletromóveis',
        logo: 'https://res.cloudinary.com/drjcwf7aq/image/upload/v1772741288/logo_GabrielEletromoveis_hvoszf.jpg',
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
                "name": "Roupeiro Casal 6 Portas",
                "category": "Moveis",
                "price": 0,
                "description": "Roupeiro Casal 6 Portas Madeira",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734288/2_mdsxlm.jpg",
                "imageAlt": "Imagem Roupeiro Casal 6 Portas"
            },
            {
                "id": 2,
                "name": "Roupeiro 4 Portas",
                "category": "Moveis",
                "price": 0,
                "description": "Roupeiro 4 portas madeira",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734288/3_p8dxcq.jpg",
                "imageAlt": "Imagem Roupeiro 4 Portas"
            },
            {
                "id": 3,
                "name": "Tanquinho",
                "category": "Eletrodomesticos",
                "price": 0,
                "description": "Tanquinho",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734290/13_gvcbgu.jpg",
                "imageAlt": "Imagem Tanquinho"
            },
            {
                "id": 4,
                "name": "Fogão 4 Bocas",
                "category": "Eletrodomesticos",
                "price": 0,
                "description": "Fogão 4 bocas",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734290/14_weage4.jpg",
                "imageAlt": "Imagem Fogão 4 bocas"
            },
            {
                "id": 5,
                "name": "Antena Century",
                "category": "Eletroeletronicos",
                "price": 0,
                "description": "Antena Century",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734293/32_uglxhv.jpg",
                "imageAlt": "Imagem Antena Century"
            },
            {
                "id": 6,
                "name": "Airfryer Itatiaia",
                "category": "Eletroportateis",
                "price": 0,
                "description": "Airfryer Itatiaia",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734294/34_ro2tyf.jpg",
                "imageAlt": "Imagem Airfryer Itatiaia e Sanduicheira"
            },
            {
                "id": 7,
                "name": "Ventilador de Pé",
                "category": "Eletroportateis",
                "price": 0,
                "description": "Ventilador de Pé",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734294/36_ixy5bs.jpg",
                "imageAlt": "Imagem Ventilador de Pé"
            },
            {
                "id": 8,
                "name": "Cama Unibox Casal",
                "category": "Moveis",
                "price": 0,
                "description": "Cama Unibox Casal",
                "image": "https://res.cloudinary.com/drjcwf7aq/image/upload/v1772734291/20_owoc93.jpg",
                "imageAlt": "Imagem Cama unibox casal"
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
            },
            {
                id: 'Eletrodomesticos',
                name: 'Eletrodomésticos',
                image: 'https://images.unsplash.com/photo-1632923565835-6582b54f2105?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                count: 2
            },
            {
                id: 'Eletroeletronicos',
                name: 'Eletroeletrônicos',
                image: 'https://images.unsplash.com/photo-1717295248494-937c3a5655b1?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                count: 1
            },
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

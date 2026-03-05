// Mock catalog data - simulates external JSON fetching
// In production, this would be fetched fr'om an API endpoint

export const catalogData = {
    GabrielEletromoveis: {
        companyId: 'GabrielEletromoveis',
        companyName: 'Gabriel Eletromóveis',
        logo: 'https://res.cloudinary.com/demo/image/upload/v1/logos/nike.png',
        whatsappNumber: '5588999156930',
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
        categories: ['Todos', 'Moveis', 'Eletrodomesticos', 'Eletroeletronicos', 'Eletroportateis']
    },
    apple: {
        companyId: 'apple',
        companyName: 'Apple Premium Store',
        logo: 'https://res.cloudinary.com/demo/image/upload/v1/logos/apple.png',
        whatsappNumber: '5511988888888',
        products: [
            {
                id: '5',
                name: 'Minimalist Wireless Earbuds',
                category: 'electronics',
                price: 1899.90,
                description: 'Fones de ouvido sem fio com design minimalista. Som premium e cancelamento de ruído.',
                image: 'https://images.unsplash.com/photo-1606741965509-717b9fdd6549?crop=entropy&cs=srgb&fm=jpg&q=85',
                imageAlt: 'Minimalist Wireless Earbuds'
            },
            {
                id: '6',
                name: 'Premium Headphones',
                category: 'audio',
                price: 2499.90,
                description: 'Headphones premium com qualidade de áudio excepcional. Conforto para longas sessões.',
                image: 'https://images.unsplash.com/photo-1677047642886-a20fa832456e?crop=entropy&cs=srgb&fm=jpg&q=85',
                imageAlt: 'Premium Headphones'
            },
            {
                id: '7',
                name: 'Vintage Camera Edition',
                category: 'photography',
                price: 3999.90,
                description: 'Câmera vintage reimaginada com tecnologia moderna. Para os apaixonados por fotografia.',
                image: 'https://images.unsplash.com/photo-1611595567724-d610a74f4505?crop=entropy&cs=srgb&fm=jpg&q=85',
                imageAlt: 'Vintage Camera Edition'
            },
            {
                id: '8',
                name: 'Ceramic Home Set',
                category: 'home',
                price: 799.90,
                description: 'Set de cerâmica premium para casa. Design minimalista e elegante.',
                image: 'https://images.unsplash.com/photo-1549675613-2001a9672b74?crop=entropy&cs=srgb&fm=jpg&q=85',
                imageAlt: 'Ceramic Home Set'
            }
        ],
        categories: ['Todos', 'electronics', 'audio', 'photography', 'home']
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

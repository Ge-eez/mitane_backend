const permissions = [
    
    'create role',
    'view any role',
    'view role',
    'update role',
    'remove role',

    'create user',
    'view any user',
    'view user',
    'update user',
    'remove user',

    'create ingridient',
    'view any ingridient',
    'view ingridient',
    'update ingridient',
    'remove ingridient',

    'create machinery',
    'view any machinery',
    'view machinery',
    'update machinery',
    'remove machinery',

    'create product',
    'view any product',
    'view product',
    'update product',
    'remove product',

    'create category',
    'view any category',
    'view category',
    'update category',
    'remove category',

    'create store',
    'view any store',
    'view store',
    'update store',
    'remove store',

    'create price',
    'view any price',
    'view price',
    'update price',
    'remove price',
]

const roles = {
    admin: [...permissions],
    user: [

        'view any ingridient',
        'view ingridient',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'view any store',
        'view store',
    
        'view any price',
        'view price',
    ],

    data_encoder: [

        'view any ingridient',
        'view ingridient',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'view any store',
        'view store',

        'create price',
        'view any price',
        'view price',
        'update price',
        'remove price',
    ],

    farmer : [
        'view any ingridient',
        'view ingridient',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',

    ],

    product_trader: [
        'view any ingridient',
        'view ingridient',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',

    ],

    tool_trader: [

        'view any ingridient',
        'view ingridient',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',
    ],

    accessory_trader: [

        'view any ingridient',
        'view ingridient',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',
    ]
}

const users = [
    {
        name: 'admin',
        password: 'superuser',
        roles: ['admin'],
        phone_no : +251900000000

    },
    {
        name: 'encoder',
        password: 'encoderuser',
        roles: ['data_encoder'],
        phone_no : +251911111111

    },
    {
        name: 'farmer',
        password: 'farmeruser',
        roles: ['farmer'],
        phone_no : +251922222222

    },
    {
        name: 'accessorytrader',
        password: 'accessorytraderuser',
        roles: ['accessory_trader'],
        phone_no : +251933333333

    },
    {
        name: 'producttrader',
        password: 'producttraderuser',
        roles: ['product_trader'],
        phone_no : +251944444444

    },
    {
        name: 'tooltrader',
        password: 'tooltraderuser',
        roles: ['tool_trader'],
        phone_no : +251955555555

    },
    {
        name: 'user',
        password: 'justuser',
        roles: ['user'],
        phone_no : +251966666666

    },

]
const machineries = [
    {
        name: "tractor"
    },
    {
        name: 'mewqiya'
    }, 
    {
        name: "mekesikesha"
    },
    {
        name: 'maresha'
    },
    {
        name: "megolgoya"
    },
    {
        name: 'mezriya'
    }, 
    {
        name: "chemical mercha"
    },
    {
        name: 'mebuatecha'
    }
]

const categories = [
    {
        name: 'fruits'
    },
    {
        name: 'ceral'
    },
    {
        name: 'ye qibat ehil'
    },
    {
        name: 'vegitable'
    },
    {
        name: 'qimema qimem'
    },
    {
        name: 'ye ageda sebiloch'
    },
    {
        name: 'aneqaqi tekiloch'
    },
    {
        name: 'ye qum ensisa'
    },
    {
        name: 'doro'
    },
    {
        name: 'asa'
    },
    {
        name: 'diary products'
    },
    {
        name: 'ye den wutet'
    },
    {
        name: 'flower'
    },
    {
        name: 'mar'
    },
    {
        name: 'feritlizer'
    },
    {
        name: 'mirt zer'
    },    
    {
        name: 'meno'
    },
    {
        name: 'qefo'
    }
]

const farming_ingredient  = [
    {
        name: "Yuriya",
        category: ['ferilizer']
    },
    {
        name: "Dap",
        category: ['ferilizer']
    },
    {
        name: "Nitrogen",
        category: ['ferilizer']
    },
    {
        name: "Phosphic",
        category: ['ferilizer']
    },
    {
        name: "Potassium",
        category: 'ferilizer'
    },
    {
        name: "Natural",
        category: ['ferilizer']
    },
    {
        name: "ye atkilt",
        category: ['mirt zer']
    },
    {
        name: "ye beqolo",
        category: ['mirt zer']
    },
    {
        name: "ye qimema qimem",
        category: ['mirt zer']
    },
    {
        name: 'ye ensisat meno',
        category: ['meno']
    },
    {
        name: 'zemenawi qefo',
        category: ['qefo']
    }
]

const products = [
    {
        name: "Orange",
        category: 'fruits'
    },
    {
        name: "Banana",
        category: 'fruits'
    },
    {
        name: "Avocado",
        category: 'fruits'
    },
    {
        name: "Papaya",
        category: 'fruits'
    },
    {
        name: "Mango",
        category: 'fruits'
    },
    {
        name: "Lemon",
        category: 'fruits'
    },
    {
        name: "Watermelon",
        category: 'fruits'
    },
    {
        name: "Apple",
        category: 'fruits'
    },
    {
        name: "Jack fruit",
        category: 'fruits'
    },
    {
        name: "Wine",
        category: 'fruits'
    },
    {
        name: "Cock",
        category: 'fruits'
    },
    {
        name: "Zotin",
        category: 'fruits'
    },
    {
        name: "Prim",
        category: 'fruits'
    },
    {
        name: "Strawberry",
        category: 'fruits'
    },
    {
        name: "Gishta",
        category: 'fruits'
    },
    {
        name: "Roman",
        category: 'fruits'
    },
    {
        name: "Tiringo",
        category: 'fruits'
    },
    {
        name: "Baqela",
        category: 'ceral'
    },
    {
        name: "Ater",
        category: 'ceral'
    },
    {
        name: "Akuri ater",
        category: 'ceral'
    },
    {
        name: "Shimbira",
        category: 'ceral'
    },
    {
        name: "Misir",
        category: 'ceral'
    },
    {
        name: "Guaya",
        category: 'ceral'
    },
    {
        name: "Pinto bean",
        category: 'ceral'
    },
    {
        name: "Pijon bean",
        category: 'ceral'
    },
    {
        name: "Boloqe",
        category: 'ceral'
    },
    {
        name: "Gibto",
        category: 'ceral'
    },
    {
        name: "Masho",
        category: 'ceral'
    },
    {
        name: "Selit",
        category: 'ye qibat ehil'
    },
    {
        name: "Nug",
        category: 'ye qibat ehil'
    },
    {
        name: "Telba",
        category: 'ye qibat ehil'
    },
    {
        name: "Lewz",
        category: 'ye qibat ehil'
    },
    {
        name: "Suf",
        category: 'ye qibat ehil'
    },
    {
        name: "Gomenzer",
        category: 'ye qibat ehil'
    },
    {
        name: "Ye duba fre",
        category: 'ye qibat ehil'
    },
    {
        name: "Ye gulo fre",
        category: 'ye qibat ehil'
    },
    {
        name: "Potato",
        category: 'vegitable'
    },
    {
        name: "Tomato",
        category: 'vegitable'
    },
    {
        name: "Onion",
        category: 'vegitable'
    },
    {
        name: "Garlic",
        category: 'vegitable'
    },
    {
        name: "Cabbage",
        category: 'vegitable'
    },
    {
        name: "Carrot",
        category: 'vegitable'
    },
    {
        name: "Qey sir",
        category: 'vegitable'
    },
    {
        name: "Mushroom",
        category: 'vegitable'
    },
    {
        name: "Qosta",
        category: 'vegitable'
    },
    {
        name: "Salad",
        category: 'vegitable'
    },
    {
        name: "Pepper",
        category: 'vegitable'
    },
    {
        name: "Berbere",
        category: 'qimema qimem'
    },
    {
        name: "Zinjibil",
        category: 'qimema qimem'
    },
    {
        name: "Erid",
        category: 'qimema qimem'
    },
    {
        name: "Tikur azmud",
        category: 'qimema qimem'
    },
    {
        name: "Korerima",
        category: 'qimema qimem'
    },
    {
        name: "Abish",
        category: 'qimema qimem'
    },
    {
        name: "Dimbilal",
        category: 'qimema qimem'
    },
    {
        name: "Beqolo",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Teff",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Gebs",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Aja",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Sinde",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Dagusa",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Rice",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Cotton",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Qacha",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Coffee",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Tea",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Chat",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Tobacco",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Goat",
        category: 'ye qum ensisa'
    },
    {
        name: "Sheep",
        category: 'ye qum ensisa'
    },
    {
        name: "Ox",
        category: 'ye qum ensisa'
    },
    {
        name: "Cow",
        category: 'ye qum ensisa'
    },
    {
        name: "Camel",
        category: 'ye qum ensisa'
    },
    {
        name: "Pig",
        category: 'ye qum ensisa'
    },
    {
        name: "Horse",
        category: 'ye qum ensisa'
    },
    {
        name: "Donkey",
        category: 'ye qum ensisa'
    },
    {
        name: "Mule",
        category: 'ye qum ensisa'
    },
    {
        name: "Set doro",
        category: 'doro'
    },
    {
        name: "Awra doro",
        category: 'doro'
    },
    {
        name: "Asa",
        category: 'asa'
    },
    {
        name: "Milk",
        category: 'diary products'
    },
    {
        name: "Butter",
        category: 'diary products'
    },
    {
        name: "Yoghurt",
        category: 'diary products'
    },
    {
        name: "Aguat",
        category: 'diary products'
    },
    {
        name: "Cheese",
        category: 'diary products'
    },
    {
        name: "Quami",
        category: 'ye den wutet'
    },
    {
        name: "Weraj",
        category: 'ye den wutet'
    },
    {
        name: "Mager",
        category: 'ye den wutet'
    },
    {
        name: "Qerkeha",
        category: 'ye den wutet'
    },
    {
        name: "Rose",
        category: 'flower'
    },
    {
        name: "Hareg",
        category: 'flower'
    },
    {
        name: "Amrilix",
        category: 'flower'
    },
    {
        name: "Tulips",
        category: 'flower'
    },
    {
        name: "Kosame",
        category: 'flower'
    },
    {
        name: "Welela",
        category: 'mar'
    },
    {
        name: "Sefef",
        category: 'mar'
    },
    {
        name: "Sem",
        category: 'mar'
    },
    
]

module.exports = { permissions, roles, users, machineries, categories, farming_ingredient, products }

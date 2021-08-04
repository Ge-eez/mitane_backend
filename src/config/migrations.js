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

    'create farmer',
    'post product',
    'find nearby'
]

const roles = {
    admin: [...permissions],
    user: [

    ],

    data_encoder: [

    ],

    farmer : [

    ],

    product_trader: [

    ],

    tool_trader: [

    ],

    accessory_trader: [
        
    ]
}

const users = [
    {
        name: 'admin',
        email: 'super@admin.com',
        password: 'superuser',
        roles: ['admin'],
        phone_no : +251900000000

    }
]


module.exports = { permissions, roles, users }

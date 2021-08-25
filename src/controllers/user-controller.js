const userModel = require('../models/user-model'); 
const errorResponse = require('../utility/errorResponse'); 
  
 
/* 
@Description: Get all users 
@Route: users/ 
@Access: Public 
*/ 
exports.getUsers = async (req, res, next) => { 
    try { 
        const users = await userModel.find({}).populate('roles', 'name').populate('permissions', 'name'); 
        res.json(users); 
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    } 
} 
 
/* 
@Description: Get a user by ID 
@Route: users/id/:id 
@Access: Public 
*/ 
exports.getUserById = async (req, res, next) => { 
    try { 
        const user = await userModel.findById(req.params.id).populate('roles', 'name').populate('permissions', 'name'); 
        if(!user){  
            return next(new errorResponse(`Resource not found with id ${req.params.id}`,400)); 
        } 
        res.json(user); 
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    } 
} 
 
/* 
@Description: Filter users by name or phone_no 
@Route: users/filter/:name, users/filter/:phone_no 
@Access: Public 
*/ 
exports.filterUsers = async (req, res, next) => { 
    try { 
        const user = await userModel.find({$or:[{ name: req.params.name },{ phone_no: req.params.phone_no }]}); 
        if (!user) { 
            return next(new errorResponse(`Resource not found`,400)); 
        } 
        res.json(user); 
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    } 
} 
 
/* 
@Description: Get users by role 
@Route: users/role/:role 
@Access: Public 
*/  
exports.getUserByRole = async (req, res) => { 
    console.log(req.params.role); 
    try { 
        const user = await userModel.find({}).populate( 'roles', null , { name: req.params.role } ); 
        res.json(user); 
  
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    }  
} 


/*
@Description: Create a user
@Route: users/create
@Access: Private
*/
exports.createUser = async (req, res) => { 
    try { 
        const user = await userModel.create(req.body); 
        res.json(user); 
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    }      
} 

/*
@Description: Update a user using a specific Id
@Route: users/update/:id
@Access: Private
*/
exports.updateUser = async (req, res, next) => { 
    try { 
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body,{ 
            new:true, 
            runValidators:true 
        }); 
        if(!user){ 
            return next(new errorResponse(`Resource not found with id ${req.params.id}`,400)); 
        } 
        res.json(user); 
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    }     
} 

/*
@Description: Delete a user using a specific Id
@Route: users/delete/:id
@Access: Private
*/
exports.deleteUser = async (req, res, next) => { 
    try { 
        const user = await userModel.findByIdAndDelete(req.params.id);     
        if(!user){ 
            return next(new errorResponse(`Resource not found with id ${req.params.id}`,400)); 
        } 
        res.json(user); 
    } catch (error) { 
        res.status(404).json({ 
            error: true, 
            message: error 
        }); 
    }    
} 





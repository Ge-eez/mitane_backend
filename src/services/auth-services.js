const userModel = require('../models/user-model')

exports.signupUser = async (req, role) => {

    try {
        let coordinates = [req.body.longitude, req.body.latitude]

        const user = await userModel.create({...req.body, roles: role,
            location : {
                coordinates: coordinates
              }
            })

        return user

    } catch (error) {
        throw error;
    }

}
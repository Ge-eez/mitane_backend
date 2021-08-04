exports.login = async (req, res) => {

    try {
        return res.json({
            status: true,
            data: 'not processed yet'         
        })

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.signup = async (req, res) => {

    try {
        return res.json({
            status: true,
            data: 'not processed yet'         
        })

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.logout = async (req, res) => {
    
    try {
        return res.json({
            status: true,
            data: 'not processed yet'         
        })

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}



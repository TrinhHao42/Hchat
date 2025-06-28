const checkServiceToken = (req, res, next) => {
    const serviceToken = req.headers['x-service-token'];

    if (!serviceToken)
       return res.status(400).json({message: "Thiếu service token"})
    
    if (serviceToken !== process.env.INTERNAL_SERVICE_TOKEN)
        return res.status(400).json({message: "không đúng service token"})

    next()
}

module.exports = checkServiceToken
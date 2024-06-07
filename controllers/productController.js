
exports.getAllProductsStatic = (req, res) => {
    res.status(200).json({
        msg: 'Testing the product'
    });
}

exports.getAllProducts = (req, res) => {
    res.status(200).json({
        msg: 'All products...'
    });
}
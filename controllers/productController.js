const Product = require('../models/products');

exports.getAllProductsStatic = async (req, res) => {
  const search = 'e';
  const product = await Product.find()
    .sort('-price')
    .limit(10)
    .skip(1)
    .select('company rating');
    
  res.status(200).json({
    status: 'success',
    length: product.length,
    data: {
      product
    }
  });
}

exports.getAllProducts = async (req, res) => {

  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if(featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if(company) {
    queryObject.company = company;
  }
  if(name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  // console.log(queryObject);

  let result = Product.find(queryObject);
  // sort
  if(sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort(createdAt);
  }
  if(fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const product = await result;

  res.status(200).json({
    status: 'success',  
    Length: product.length,
    data: {
      product,
    }
  });
}
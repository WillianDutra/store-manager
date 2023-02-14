module.exports = (req, res, next) => {
  const sales = req.body;

  const productError = sales.every(({ productId }) => typeof productId !== 'number');
  if (productError) return res.status(400).json({ message: '"productId" is required' });

  const quantityError = sales.every(({ quantity }) => typeof quantity !== 'number');
  if (quantityError) return res.status(400).json({ message: '"quantity" is required' });

  // if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};
module.exports = (req, res, next) => {
  const sales = req.body;

  const productError = sales.some(({ productId }) => productId === undefined);
  if (productError) return res.status(400).json({ message: '"productId" is required' });

  const quantityError = sales.some(({ quantity }) => quantity === undefined);
  if (quantityError) return res.status(400).json({ message: '"quantity" is required' });

  const quantityCorrect = sales.some(({ quantity }) => quantity < 1);
  if (quantityCorrect) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  return next();
};
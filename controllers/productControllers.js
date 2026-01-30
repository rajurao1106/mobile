import productSchema from "../model/productSchema.js";

export const sendProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const productData = new productSchema({ name, description, price });
    await productData.save();
    res.status(201).json({ message: "product created", productData });
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const productData = await productSchema.find();
    res.status(200).json({ message: "product created", productData });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await productSchema.findByIdAndUpdate(
      id ,
      req.body,
      { new: true },
    );
    res.status(200).json({ message: "product updated", productData });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await productSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "product deleted", productData });
  } catch (error) {
    console.error(error);
  }
};

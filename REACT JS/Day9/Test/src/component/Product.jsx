const Product = ({ prosname, prosprice, prostatus }) => {
  return (
    <div className="border p-5 rounded bg-pink-200">
      <h2>Product : {prosname}</h2>
      <h2>Price : ₹{prosprice}</h2>
      <h2>Status : {prostatus}</h2>
    </div>
  );
};

export default Product;
import { useState } from "react";
import { FaHeart, FaArrowsAltH, FaExpand } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({
  product,
  onProductClick,
  onFavoriteClick,
  isFavorite,
}) => {
  // console.log("products", product);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite || false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const newIsFavorite = !isFavoriteState;
    setIsFavoriteState(newIsFavorite); // تبديل الحالة عند الضغط
    onFavoriteClick(product.id, newIsFavorite); // تمرير حالة المفضلة الجديدة للـ Shop
  };

  return (
    <div className="relative group cursor-pointer me-4" onClick={onProductClick}>
      {/* صورة المنتج */}
      <div className="overflow-hidden relative h-80 w-full">
        {/* زيادة طول الصورة */}
        <img
          src={product.images ? product.images[0] : product.photos[0]}
          alt={product.name}
          className="w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out"
        />
        {/* صورة Hover */}
        <img
          src={product.images ? product.images[1] : product.photos[1]}
          alt={product.name}
          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
        />
        {/* زر Select Options في أسفل الصورة */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out z-10">
          <Link to="#" className="text-white text-lg font-semibold p-4">
            Select Options
          </Link>
        </div>
      </div>

      {/* اسم المنتج والسعر */}
      <div className="mt-3 mb-3 text-center">
        <p className="text-lg text-white font-semibold">{product.name}</p>
        <p className="text-sm pb-2 text-white">{product.price} ₹</p>
      </div>

      {/* الأيقونات */}
      <div className="absolute top-4 right-11 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out z-20">
        {/* زر القلب لإضافة المنتج إلى المفضلة */}
        <div
          className={`p-2 rounded-full transition-colors ${
            isFavoriteState ? "bg-red-500" : "hover:bg-orange-500"
          }`}
          onClick={handleFavoriteClick}
        >
          <FaHeart
            className={`${isFavoriteState ? "text-black" : "text-black"}`}
          />
        </div>
        <div className="p-2 bg-white rounded-full hover:bg-orange-500 transition-colors">
          <FaArrowsAltH className="text-black" />
        </div>
        <div className="p-2 bg-white rounded-full hover:bg-orange-500 transition-colors">
          <FaExpand className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

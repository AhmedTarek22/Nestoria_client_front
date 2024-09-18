import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.js";
import Pagination from "../components/Pagination.js";
import axiosInstance from "../apis/axiosConfig.js";
import Loader from "../components/Loader.jsx";

import { toast } from "react-toastify";

import { FaHome } from "react-icons/fa";
import { useSearchContext } from "../context/SearchContext.jsx";

const Shop = () => {
  // const [products, setProducts] = useState([]);
  const { search, products, setProducts } = useSearchContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([
    "All",
    "Sofa",
    "Outdoor Sofa",
    "Dining Table",
    "Coffee Table",
    "Bookshelf",
    "Bed Frame",
    "Desk",
    "Wardrobe",
    "Couch",
    "Bed",
    "Recliners",
    "Home Decoration",
    "Office Decoration",
    "Indoor Decoration",
    "Outdoor Decoration",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([10, 2499]);
  const [maxPrice, setMaxPrice] = useState(2499);
  const productsPerPage = 10;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPriceSliding, setIsPriceSliding] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // جلب المنتجات المفضلة
  useEffect(() => {
    axiosInstance
      .get("/api/v1/fur/favorites")
      .then((res) => {
        setFavorites(res.data.data.favorites); // افترض أن البيانات هي قائمة بالمنتجات المفضلة
      })
      .catch((err) => {
        toast("Failed to fetch favorites:", err);
      });
  }, []);

  // جلب المنتجات من السيرفر مع التصفية

  const fetchProducts = (page = 1, category = "All", maxPrice = 2499) => {
    // if (!search) {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/fur/products?page=${page}&limit=${productsPerPage}&category=${
          category !== "All" ? category : ""
        }&maxPrice=${maxPrice}`
      )

      .then((res) => {
        // console.log("fav", res.data.products);
        const productsWithFavorites = res.data.products.map((product) => ({
          ...product,
          isFavorite: favorites.some((fav) => fav.id === product.id),
        }));
        setProducts(productsWithFavorites);
        setTotalPages(res.data.pages || 1);
        setMaxPrice(Math.max(...res.data.products.map((p) => p.price)));
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // }
  };

  // تحديث المنتجات عند تغيير الصفحة أو الفئة أو رفع الضغط عن الفلتر
  useEffect(() => {
    if (!isPriceSliding) {
      fetchProducts(currentPage, selectedCategory, priceRange[1]);
    }
  }, [currentPage, selectedCategory, priceRange, isPriceSliding]);

  // تغيير الفئة المختارة مع إبقاء باقي الفئات
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // لإعادة تعيين الصفحة عند تغيير الفئة
  };

  // تحديث نطاق السعر فقط أثناء السحب
  const handlePriceChange = (e) => {
    setPriceRange([priceRange[0], parseInt(e.target.value)]);
    setIsPriceSliding(true);
  };

  // تحديث المنتجات فقط عند الانتهاء من السحب
  const handlePriceMouseUp = () => {
    setIsPriceSliding(false);
  };

  const handleProductClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  const handleFavoriteClick = (productId, isAdding) => {
    if (isAdding) {
      axiosInstance
        .post(`/api/v1/fur/favorites/${productId}`)
        .then((res) => {
          toast.success("Product added to favorites");
          setFavorites([...favorites, { id: productId }]);
        })
        .catch((err) => {
          toast.error("Failed to add to favorites:", err);
        });
    } else {
      axiosInstance
        .delete(`/api/v1/fur/favorites/${productId}`)
        .then((res) => {
          toast.success("Product removed from favorites");
          setFavorites(favorites.filter((fav) => fav.id !== productId));
        })
        .catch((err) => {
          toast.error("Failed to remove from favorites:", err);
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* قسم الهيدر مع خلفية الصورة */}
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/home-hotspot-img-1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-semibold">Shop</h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm"></div>
        </div>
      </div>

      <div className="bg-[#030303] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* قسم الفئات مع الخط الفاصل */}
          <div className="col-span-1 relative ml-4">
            <h2 className="text-white mb-4">Collection</h2>
            <ul className="text-white space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer hover:text-[--mainColor] transition-all duration-200 ${
                    selectedCategory === category
                      ? "text-orange-500 font-bold"
                      : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="absolute top-0 right-0 h-full border-r-4 border-gray-700 lg:block hidden"></div>
            <div className="mt-12">
              <div className="mb-6">
                <h2 className="text-white mb-4">Filter By Price</h2>
              </div>
              <input
                type="range"
                min="10"
                max="2499"
                value={priceRange[1]}
                onChange={handlePriceChange}
                onMouseUp={handlePriceMouseUp} // الفلترة عند رفع الضغط
                className="w-11/12 appearance-none h-3 bg-gray-700 rounded-full outline-none range-input"
                style={{
                  WebkitAppearance: "none",
                  margin: "10px 0",
                }}
              />
              <style>
                {`
                .range-input::-webkit-slider-runnable-track {
                  height: 7px; /* جعل الخط أعرض */
                  background: linear-gradient(
                    to right,
                    orange 0%,
                    orange ${(priceRange[1] / 2499) * 100}%,
                    #555 ${(priceRange[1] / 2499) * 100}%,
                    #555 100%
                  );
                  border-radius: 8px;
                }

                .range-input::-moz-range-track {
                  height: 8px; /* جعل الخط أعرض */
                  background: linear-gradient(
                    to right,
                    orange 0%,
                    orange ${(priceRange[1] / 2499) * 100}%,
                    #555 ${(priceRange[1] / 2499) * 100}%,
                    #555 100%
                  );
                  border-radius: 8px;
                }

                .range-input::-webkit-slider-thumb {
                  appearance: none;
                  height: 15px;
                  width: 15px;
                  margin-top: -5px; /* لضبط السهم ليكون في منتصف الشريط */
                  border-radius: 50%;
                  background: orange;
                  cursor: pointer;
                  border: 2px solid #030303;
                }

                .range-input::-moz-range-thumb {
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background: orange;
                  cursor: pointer;
                  border: 2px solid #030303;
                }
              `}
              </style>
              <p className="text-white">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
            </div>
          </div>

          {/* قسم عرض المنتجات */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={product.isFavorite} // تمرير حالة المفضلة هنا
                onProductClick={() => handleProductClick(product.id)}
                onFavoriteClick={handleFavoriteClick}
              />
            ))}
          </div>
        </div>

        <div className="pt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;

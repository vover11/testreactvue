import React, { useEffect, useState, useRef } from "react";
import CartSidebar from "./CartSidebar";
import CartIconGif from "./assets/512.gif"; // поправь путь под свою структуру

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);

  // Загрузка товаров (укажи свой путь к products.json)
  useEffect(() => {
    fetch("./products.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {
        setProducts(null); // Ошибка загрузки
      });
  }, []);

  // Добавить товар в корзину
  const addToCart = (name, price, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.name === name);
      if (idx !== -1) {
        const newCart = [...prev];
        newCart[idx].quantity += quantity;
        return newCart;
      } else {
        return [...prev, { name, price, quantity }];
      }
    });
    showAddedNotification(name);
  };

  // Удалить товар из корзины
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Изменить количество товара
  const changeQuantity = (index, delta) => {
    setCart((prev) => {
      const newCart = [...prev];
      const newQty = newCart[index].quantity + delta;
      if (newQty < 1) {
        newCart.splice(index, 1);
      } else {
        newCart[index].quantity = newQty;
      }
      return newCart;
    });
  };

  // Показывать уведомление об добавлении
  const showAddedNotification = (name) => {
    const id = `notif-${Date.now()}`;
    const notif = document.createElement("div");
    notif.id = id;
    notif.className =
      "fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out";
    notif.textContent = `${name} добавлен в корзину`;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.remove();
      }, 300);
    }, 2000);
  };

  // Навигация по секциям
  const scrollToSection = (index) => {
    if (!containerRef.current) return;
    const width = window.innerWidth;
    containerRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  // Навигация стрелками клавиатуры
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const scrollLeft = containerRef.current.scrollLeft;

      if (e.key === "ArrowRight") {
        containerRef.current.scrollTo({
          left: scrollLeft + width,
          behavior: "smooth",
        });
      }
      if (e.key === "ArrowLeft") {
        containerRef.current.scrollTo({
          left: scrollLeft - width,
          behavior: "smooth",
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Общая сумма в корзине
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Общее количество товаров
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Видеофон */}
      <div className="video-background fixed top-0 left-0 w-screen h-screen overflow-hidden -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter blur-sm scale-[1.05]"
          src="7000158_Stickers_Motion_Graphics_3840x2160.mp4"
        />
      </div>

      {/* Иконка корзины */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition relative"
          aria-label="Toggle cart"
        >
          <img src={CartIconGif} alt="Cart" className="h-6 w-6" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {/* Боковая панель корзины */}
      <CartSidebar
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        changeQuantity={changeQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Контейнер с горизонтальной прокруткой */}
      <div
        className="container scroll-snap-x-mandatory overflow-x-scroll overflow-y-hidden h-screen w-screen max-w-full -webkit-overflow-scrolling-touch"
        ref={containerRef}
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          className="horizontal-scroll flex flex-row h-screen w-max"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Секция 1 */}
          <section className="section w-screen h-screen flex justify-center items-center scroll-snap-align-start bg-transparent">
            <div className="text-center p-8">
              <h1 className="text-4xl font-bold text-white mb-6">Добро пожаловать</h1>
              <p className="text-xl text-white mb-8">Это магазин с горизонтальной прокруткой</p>
              <p className="text-white animate-bounce">← Прокрутите вправо →</p>
            </div>
          </section>

          {/* Секция 2 */}
          <section className="section w-screen h-screen flex justify-center items-center scroll-snap-align-start bg-transparent">
            <div className="text-center p-8 max-w-md">
              <h2 className="text-3xl font-bold text-white mb-6">О нас</h2>
              <p className="text-lg text-white">
                Мы предлагаем лучшие товары с нестандартной навигацией по магазину.
              </p>
            </div>
          </section>

          {/* Секция 3 - Товары */}
          <section className="section w-screen h-screen p-4 products-section flex flex-col items-center scroll-snap-align-start bg-transparent">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Наши товары</h2>

            <div
              className="products-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-4 overflow-y-auto max-h-[calc(100vh-6rem)] scrollbar-none"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {products === null && (
                <div className="col-span-2 text-center text-white">
                  <p className="text-lg">
                    Не удалось загрузить товары. Пожалуйста, попробуйте позже.
                  </p>
                </div>
              )}
              {products &&
                products.map((product, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-md p-5 flex flex-col transition duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-100 h-full"
                  >
                    {/* У тебя в оригинале класс для фона картинки с градиентом,
                    здесь вместо картинки вставим заглушку */}
                    <div className={`bg-gradient-to-br from-gray-200 to-gray-400 h-40 mb-3 rounded-sm flex items-center justify-center`}>
                      <span className="text-gray-400 text-xs uppercase tracking-wide">
                        Изображение
                      </span>
                    </div>

                    <h3 className="text-base font-medium text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 flex-grow">{product.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {product.price.toLocaleString()} ₽
                      </span>

                      <button
                        onClick={() => addToCart(product.name, product.price, 1)}
                        className="flex items-center gap-1 border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Секция 4 */}
          <section className="section w-screen h-screen flex justify-center items-center scroll-snap-align-start bg-transparent">
            <div className="text-center p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Контакты</h2>
              <p className="text-lg text-white mb-4">Email: shop@example.com</p>
              <p className="text-lg text-white">Телефон: +7 (123) 456-78-90</p>
            </div>
          </section>
        </div>
      </div>

      {/* Индикатор прогресса */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="w-3 h-3 rounded-full bg-white bg-opacity-50 cursor-pointer"
            aria-label={`Перейти к секции ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default App;

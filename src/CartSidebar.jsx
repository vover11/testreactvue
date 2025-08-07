// CartSidebar.jsx
import React from "react";
import CloseGif from "./assets/close.gif";

const CartSidebar = ({
    cart,
    isCartOpen,
    setIsCartOpen,
    changeQuantity,
    removeFromCart,
}) => {
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <aside
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-40 ${isCartOpen ? "translate-x-0" : "translate-x-full"
                }`}
            aria-label="Cart sidebar"
        >
            <div className="p-4 h-full flex flex-col text-black"> {/* Добавлен text-black */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-lg font-bold">Ваша корзина</h3>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close cart"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    {cart.length === 0 && (
                        <p className="text-gray-500 text-center py-10">Корзина пуста</p>
                    )}
                    {cart.map((item, i) => {
                        const itemTotal = item.price * item.quantity;
                        return (
                            <div
                                key={i}
                                className="cart-item flex justify-between items-center border-b py-3 transition-all duration-300 ease-in-out"
                            >
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <div className="flex items-center mt-1">
                                        <button
                                            onClick={() => changeQuantity(i, -1)}
                                            className="text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center border rounded"
                                            aria-label={`Уменьшить количество ${item.name}`}
                                        >
                                            –
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => changeQuantity(i, 1)}
                                            className="text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center border rounded"
                                            aria-label={`Увеличить количество ${item.name}`}
                                        >
                                            +
                                        </button>
                                        <span className="ml-4 font-medium">
                                            {itemTotal.toLocaleString()} ₽
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(i)}
                                    className="cart-item-remove ml-4 transition-opacity duration-200"
                                    aria-label={`Удалить ${item.name} из корзины`}
                                >
                                    <img
                                        src={CloseGif}
                                        alt="Удалить"
                                        className="h-5 w-5"
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="border-t pt-3">
                    <div className="flex justify-between font-bold mb-4">
                        <span>Итого:</span>
                        <span id="cart-total">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default CartSidebar;

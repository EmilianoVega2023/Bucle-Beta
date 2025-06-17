"use client"

import { useState } from "react"
import ProductCard from "./components/ProductCard"
import ShoppingCart from "./components/ShoppingCart"
import type { Product, CartItem } from "./types"

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Pizza Margherita",
    description: "Pizza clásica con tomate, mozzarella fresca y albahaca",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Hamburguesa Gourmet",
    description: "Carne angus, queso cheddar, lechuga, tomate y salsa especial",
    price: 15.5,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Ensalada César",
    description: "Lechuga romana, pollo grillado, crutones y aderezo césar",
    price: 12.75,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Pasta Carbonara",
    description: "Espaguetis con panceta, huevo, queso parmesano y pimienta negra",
    price: 16.25,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Salmón Grillado",
    description: "Filete de salmón con vegetales asados y salsa de limón",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Tacos de Pollo",
    description: "Tres tacos con pollo marinado, guacamole y pico de gallo",
    price: 13.5,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function RestaurantApp() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevItems, { product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
      )
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Restaurante Delicioso</h1>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Ver Carrito
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showCart ? (
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onBackToMenu={() => setShowCart(false)}
          />
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestro Menú</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

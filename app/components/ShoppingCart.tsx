"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import type { CartItem } from "../types"

interface ShoppingCartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onBackToMenu: () => void
}

export default function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onBackToMenu }: ShoppingCartProps) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const calculateSubtotal = (item: CartItem) => {
    return item.product.price * item.quantity
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrito de Compras</h2>
        <p className="text-gray-600 mb-6">Tu carrito está vacío</p>
        <Button onClick={onBackToMenu} className="bg-orange-500 hover:bg-orange-600 text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Menú
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header del carrito */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Carrito de Compras</h2>
          <Button onClick={onBackToMenu} variant="outline" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Menú
          </Button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
              {/* Imagen miniatura */}
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">{item.product.name}</h3>
                <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} c/u</p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>

                <Button
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Subtotal */}
              <div className="text-lg font-semibold text-gray-900 w-20 text-right">
                ${calculateSubtotal(item).toFixed(2)}
              </div>

              {/* Botón eliminar */}
              <Button
                onClick={() => onRemoveItem(item.product.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Total y botón de checkout */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between text-2xl font-bold text-gray-900 mb-6">
            <span>Total:</span>
            <span className="text-orange-600">${calculateTotal().toFixed(2)}</span>
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3"
            onClick={() => alert("Redirigiendo al proceso de pago...")}
          >
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  )
}

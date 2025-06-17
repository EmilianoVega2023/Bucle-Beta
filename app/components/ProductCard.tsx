"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen del producto */}
      <div className="relative h-48 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</span>

          <Button
            onClick={() => onAddToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  )
}

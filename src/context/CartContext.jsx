import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { calculateCartSummary } from '../utils/cartCalculations'
import { safeReadStorage, safeWriteStorage } from '../utils/storage'

const CartContext = createContext()

const STORAGE_KEY = 'novacart_cart'

const normalizeItem = (item) => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  price: Number(item.price || 0),
  originalPrice: Number(item.originalPrice || item.price || 0),
  image: item.image,
  stock: Number(item.stock || 0),
  quantity: Math.max(1, Number(item.quantity || 1)),
  variant: item.variant || null,
})

const getInitialCart = () => {
  const saved = safeReadStorage(STORAGE_KEY, [])
  if (!Array.isArray(saved)) return []
  return saved.filter(Boolean).map(normalizeItem)
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = normalizeItem(action.payload)
      const existingIndex = state.findIndex(
        (entry) => entry.id === item.id && JSON.stringify(entry.variant || null) === JSON.stringify(item.variant || null),
      )

      if (existingIndex >= 0) {
        const target = state[existingIndex]
        const nextQty = Math.min(target.quantity + item.quantity, item.stock || target.stock || 99)
        return state.map((entry, index) =>
          index === existingIndex ? { ...entry, quantity: nextQty } : entry,
        )
      }

      return [...state, item]
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => !(item.id === action.payload.id && JSON.stringify(item.variant || null) === JSON.stringify(action.payload.variant || null)))
    case 'UPDATE_QUANTITY': {
      const { id, variant, quantity } = action.payload
      return state.map((item) => {
        if (item.id !== id || JSON.stringify(item.variant || null) !== JSON.stringify(variant || null)) return item
        const limitedQty = Math.min(Math.max(quantity, 1), item.stock || 99)
        return { ...item, quantity: limitedQty }
      })
    }
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart)

  useEffect(() => {
    safeWriteStorage(STORAGE_KEY, cart)
  }, [cart])

  const summary = useMemo(() => calculateCartSummary(cart), [cart])

  const addItem = (product, quantity = 1, variant = null) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity,
        variant,
      },
    })
  }

  const removeItem = (productId, variant = null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: productId, variant } })
  }

  const updateQuantity = (productId, variant, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, variant, quantity } })
  }

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const value = useMemo(
    () => ({
      cart,
      cartCount: cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      summary,
    }),
    [cart, summary],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { safeReadStorage, safeWriteStorage } from '../utils/storage'

const WishlistContext = createContext()
const STORAGE_KEY = 'novacart_wishlist'

const getInitialWishlist = () => {
  const saved = safeReadStorage(STORAGE_KEY, [])
  return Array.isArray(saved) ? saved.filter(Boolean) : []
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const id = action.payload
      if (state.includes(id)) return state.filter((item) => item !== id)
      return [...state, id]
    }
    case 'REMOVE':
      return state.filter((item) => item !== action.payload)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], getInitialWishlist)

  useEffect(() => {
    safeWriteStorage(STORAGE_KEY, wishlist)
  }, [wishlist])

  const toggleWishlist = (productId) => dispatch({ type: 'TOGGLE', payload: productId })
  const removeFromWishlist = (productId) => dispatch({ type: 'REMOVE', payload: productId })
  const clearWishlist = () => dispatch({ type: 'CLEAR' })
  const isWishlisted = (productId) => wishlist.includes(productId)

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    }),
    [wishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}

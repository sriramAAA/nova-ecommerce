export const calculateCartSummary = (cartItems = []) => {
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0)
  const discount = cartItems.reduce(
    (sum, item) =>
      sum +
      Math.max(0, Number(item.originalPrice || item.price || 0) - Number(item.price || 0)) *
        Number(item.quantity || 0),
    0,
  )
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 149
  const total = Math.max(subtotal - discount + shipping, 0)

  return { subtotal, discount, shipping, total }
}

export const getFreeShippingProgress = (subtotal = 0) => Math.min((subtotal / 999) * 100, 100)

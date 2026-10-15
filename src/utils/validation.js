export const validateCheckoutForm = (values) => {
  const errors = {}

  if (!values.fullName?.trim()) errors.fullName = 'Full name is required.'
  if (!values.email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.phone?.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\s+/g, ''))) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (!values.address?.trim()) errors.address = 'Address is required.'
  if (!values.city?.trim()) errors.city = 'City is required.'
  if (!values.state?.trim()) errors.state = 'State is required.'
  if (!values.pinCode?.trim()) {
    errors.pinCode = 'PIN code is required.'
  } else if (!/^[1-9][0-9]{5}$/.test(values.pinCode)) {
    errors.pinCode = 'Enter a valid 6-digit Indian PIN code.'
  }

  if (!values.country?.trim()) errors.country = 'Country is required.'

  return errors
}

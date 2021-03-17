/* eslint-disable prettier/prettier */
export const checkDigetInputLng = (event: any) => {
  const num = event.target.value
  let errorMessage = ''
  let error = true

  if (num > 90) {
    errorMessage = 'zu groß'
  } else if (num < -90) {
    errorMessage = 'zu klein'
  } else if (
    num.match('\\D') &&
    !num.match('\\D').includes('.') &&
    !num.match('\\D').includes('-')
  ) {
    errorMessage = 'falsches Format'
  } else {
    error = false
  }

  return { error, errorMessage }
}

export const checkDigetInputLat = (event: any) => {
  const num = event.target.value
  let errorMessage = ''
  let error = true

  if (num > 180) {
    errorMessage = 'zu groß'
  } else if (num < -180) {
    errorMessage = 'zu klein'
  } else if (
    num.match('\\D') &&
    !num.match('\\D').includes('.') &&
    !num.match('\\D').includes('-')
  ) {
    errorMessage = 'falsches Format'
  } else {
    error = false
  }

  return { error, errorMessage }
}

export const getRoadtripImageLink = (firstNumberPostal: string) => {
  switch (firstNumberPostal) {
    case '1':
      return 'wien'
      break
    case '2' || '3':
      return 'niederösterreich'
      break
    case '4':
      return 'oberösterreich'
      break
    case '5':
      return 'salzburg'
      break
    case '6':
      return 'tirol'
      break
    case '7':
      return 'burgenland'
      break
    case '8':
      return 'steiermark'
      break
    case '9':
      return 'kärnten'
      break
    default:
      return 'austria'
      break
  }
}

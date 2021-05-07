import austria from '../../assets/roadtrips/austria.jpg'
import burgenland from '../../assets/roadtrips/burgenland.jpg'
import kärnten from '../../assets/roadtrips/kärnten.jpg'
import niederösterreich from '../../assets/roadtrips/niederösterreich.jpg'
import oberösterreich from '../../assets/roadtrips/oberösterreich.jpg'
import salzburg from '../../assets/roadtrips/salzburg.jpg'
import steiermark from '../../assets/roadtrips/steiermark.jpg'
import tirol from '../../assets/roadtrips/tirol.jpg'
import wien from '../../assets/roadtrips/wien.jpg'

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

const images: Record<string, string> = {
  wien,
  niederösterreich,
  oberösterreich,
  burgenland,
  salzburg,
  tirol,
  steiermark,
  kärnten,
  austria,
}

export const getImageByKey = (key: string) => {
  return images[key]
}

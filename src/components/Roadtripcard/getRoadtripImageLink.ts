import austria from '../../assets/roadtrips/austria-small.jpg'
import burgenland from '../../assets/roadtrips/burgenland-small.jpg'
import kärnten from '../../assets/roadtrips/kaernten-small.jpg'
import niederösterreich from '../../assets/roadtrips/niederoesterreich-small.jpg'
import oberösterreich from '../../assets/roadtrips/oberoesterreich-small.jpg'
import salzburg from '../../assets/roadtrips/salzburg-small.jpg'
import steiermark from '../../assets/roadtrips/steiermark-small.jpg'
import tirol from '../../assets/roadtrips/tirol-small.jpg'
import wien from '../../assets/roadtrips/wien-small.jpg'

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

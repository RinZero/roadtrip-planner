import { data } from './categories.json'

export const getFirstCategories = () => {
  const first = new Set<{ number: string; name: string }>()
  addEmptyOption(first)

  for (let i = 0; i < data.length; i++) {
    const s = data[i].attributes.id
    const sNum: number = +data[i].attributes.id

    if (sNum <= 999) {
      first.add({
        number: s,
        name: data[i].attributes.name,
      })
    }
  }
  return Array.from(first)
}

export const getSecondCategories = (first: string) => {
  const second = new Set<{ number: string; name: string }>()
  addEmptyOption(second)

  const subString = first.substring(0, 2)

  for (let i = 0; i < data.length; i++) {
    const idString = data[i].attributes.id
    let s = idString[0]
    let f = first[0]
    //Specialcase 350 -> check for first 2 digets
    if (subString === '35') {
      s = idString.substring(0, 2)
      f = first.substring(0, 2)
    }

    if (s === f && idString.length === 4) {
      // Specialcase 300 -> only 3100, etc not 3510
      if (first[0] === '3' && first[1] !== '5' && idString[1] === '5') {
        break
      }
      second.add({
        number: data[i].attributes.id,
        name: data[i].attributes.name,
      })
    }
  }
  return Array.from(second)
}

export const getThirdCategories = (first: string, second: string) => {
  const third = new Set<{ number: string; name: string }>()
  const start = first + '-' + second
  addEmptyOption(third)

  for (let i = 0; i < data.length; i++) {
    const s = data[i].attributes.id
    if (s.startsWith(start)) {
      third.add({
        number: data[i].attributes.id,
        name: data[i].attributes.name,
      })
    }
  }
  return Array.from(third)
}

const addEmptyOption = (set: any) => {
  set.add({
    number: '',
    name: '',
  })
}

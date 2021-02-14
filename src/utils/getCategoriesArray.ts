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

  if (first[1] === '5') {
    // when second number is 5 we need to check first two digets of id
    // Leisure & Outdoor    Natural & Geographical
    return getSecondCategoriesSpecial(first, second)
  } else {
    for (let i = 0; i < data.length; i++) {
      const idString = data[i].attributes.id
      if (
        idString[0] === first[0] &&
        idString.length === 4 &&
        idString[1] !== '5'
      ) {
        second.add({
          number: data[i].attributes.id,
          name: data[i].attributes.name,
        })
      }
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

const getSecondCategoriesSpecial = (
  first: string,
  second: Set<{ number: string; name: string }>
) => {
  const subString = first.substring(0, 2)
  for (let i = 0; i < data.length; i++) {
    const idString = data[i].attributes.id
    const s = idString.substring(0, 2)

    if (s === subString && idString.length === 4) {
      second.add({
        number: data[i].attributes.id,
        name: data[i].attributes.name,
      })
    }
  }
  return Array.from(second)
}

import { data } from './categories.json'

export const getFirstCategories = () => {
  let first = new Set()
  for (let i = 0; i < data.length; i++) {
    const s = data[i].attributes.id
    if (s <= 999) {
      first.add({
        number: data[i].attributes.id,
        name: data[i].attributes.name,
      })
    }
  }
  return Array.from(first)
}

export const getSecondCategories = (first) => {
  let second = new Set()
  for (let i = 0; i < data.length; i++) {
    const s = data[i].attributes.id
    if (s[0] === first[0] && s.length === 4) {
      second.add({
        number: data[i].attributes.id,
        name: data[i].attributes.name,
      })
    }
  }
  return Array.from(second)
}

export const getThirdCategories = (first, second) => {
  let third = new Set()
  const start = first + '-' + second
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

export const getNameByID = (id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].attributes.id === id) {
      const name = data[i].attributes.name
      return name
    }
  }
  return ''
}

export const valorMask = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/([0-9]{2})$/g, ",$1")
    .replace(/([0-9]{3}),([0-9]{2}$)/g, "$1.$2")
}


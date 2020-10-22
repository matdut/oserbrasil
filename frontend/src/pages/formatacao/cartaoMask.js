export const cartaoMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .match(/\d{1,4}/g).join('.')       
}
  
  


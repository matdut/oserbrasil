const umaletramaiusculaRegex = new RegExp("(?=.*?[A-Z])");
const umaletraminusculaRegex = new RegExp("(?=.*?[a-z])");
const minimooitocaracterRegex = new RegExp("{8,}");
const umnumeroRegex = new RegExp("(?=.*\d)[A-Za-z\d]");
const umncaracterespecialRegex = new RegExp("(?=.*?[#?!@$%^&*-])");

/*

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$"

"^  (?=.*\d)[a-zA-Z\d] "


    Pelo menos uma letra maiúscula letra em inglês(?=.*?[A-Z])
    e um numero (?=.*\d)[A-Za-z\d]
    Pelo menos uma letra inglesa minúscula, (?=.*?[a-z])
    Pelo menos um dígito, (?=.*?[0-9])
    Pelo menos um caractere especial, (?=.*?[#?!@$%^&*-])
    Mínimo oito de comprimento .{8,} (com as âncoras)


Mínimo de oito caracteres, pelo menos uma letra e um número:

"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

Mínimo de oito caracteres, pelo menos uma letra, um número e um caractere especial:

"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

Mínimo de oito caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, um número e um caractere especial:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

Mínimo oito e máximo 10 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"

*/
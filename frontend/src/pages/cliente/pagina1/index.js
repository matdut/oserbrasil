import React, { useState } from 'react'
import { cpfMask } from '../../formatacao/cpfmask';

export default () => {
  const [Cpf, setCpf] = useState('')
  const [Nome, setNome] = useState('')
  const [Data_nascimento, setData_nascimento] = useState('')

  return (
    <div>
      <div className='row'>
        <div className='six columns'>
          <label>CPF *</label>
          <input
            className='u-full-width'
            placeholder='First Name'
            type='text'
            onChange={e => setCpf(cpfMask(e.target.value))}
            value={Cpf}
            autoFocus
          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
          <label>Nome *</label>
          <input
            className='u-full-width'
            placeholder='Last Name'
            type='text'
            onChange={e => setNome(e.target.value)}
            value={Nome}
          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
          <label>Data de Nascimento  *</label>
          <input
            className='u-full-width'
            placeholder='Last Name'
            type='date'
            onChange={e => setData_nascimento(e.target.value)}
            value={Data_nascimento}
          />
        </div>
      </div>
    </div>
  )
}
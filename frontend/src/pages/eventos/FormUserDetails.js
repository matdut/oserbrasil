import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Label } from 'reactstrap';

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>          
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Favor entrar com os dados do evento" />
            <Label><strong>Criação do Evento</strong></Label>
            <TextField
              placeholder=""
              label="Ordem de Serviço"
              onChange={handleChange('ordemServico')}
              defaultValue={values.ordemServico}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder=""
              label="Nome do Evento"
              onChange={handleChange('nomeEvento')}
              defaultValue={values.nomeEvento}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder=" "
              label="Data do Evento"                            
              onChange={handleChange('dataEvento')}
              defaultValue={values.dataEvento}
              type="date"
              margin="normal"
              fullWidth
            />
            <TextField
              placeholder=""
              label="Tipo de Serviço"                            
              onChange={handleChange('tipoServico')}              
              defaultValue={values.tipoServico}
              margin="normal"
              fullWidth
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;
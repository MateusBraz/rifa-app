import React, { useEffect, useMemo, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Props as PropsNumber } from "../Number/index";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCota } from "../../hooks/cotas";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title: string;
  numberObject: PropsNumber;
  open: boolean;
  handleClose(value: boolean): void;
  // children: any;
}

const Modal: React.FC<Props> = function ({ title, open, handleClose, numberObject }) {
  const { save } = useCota();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('LIVRE');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const refreshForm = () => {
    setNome('');
    setTelefone('');
    setStatus('LIVRE');
    setPassword('');
    setShowPassword(false);
  }

  useEffect(() => {
    refreshForm();
    if (numberObject.nome !== undefined) {
      setNome(numberObject.nome !== undefined ? numberObject.nome : '');
      setTelefone(numberObject.telefone !== undefined ? numberObject.telefone : '');
      setStatus(numberObject.status);
    }
  }, [numberObject]);

  const submit = async () => {
    if (nome.trim() === '') {
      alert('Nome inválido');
      return;
    }

    if (telefone.trim() === '') {
      alert('Telefone inválido');
      return;
    }

    if (telefone.trim().length < 15) {
      alert('Telefone inválido, preencha todos os dígitos');
      return;
    }

    if (status.trim() === '') {
      alert('Status inválido');
      return;
    }

    if (password.trim() === '') {
      alert('Digite a senha!');
      return;
    }

    if (password !== 'rifaceiav12') {
      alert('Senha inválida');
      return;
    }

    if (status === 'ABERTO') {
      setNome('');
      setTelefone('');
    }

    try {
      const register = {
        nome,
        cota: numberObject.cota,
        telefone,
        status,
      }

      await save(register);

      refreshForm();
      alert('Salvo com sucesso!');
      handleClose(false);
    } catch (error: any) {
      alert(error);
    }

  }

  const mphone = (v: any) => {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }

  const disabledForm = useMemo(() => {
    if (numberObject.status === 'PAGO') {
      return true;
    }

    return false;
  }, [numberObject])

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: '#000' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClose(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <TextField
              style={{ width: '100%', margin: '0 0 10px 0' }}
              required
              id="nome"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value.toUpperCase())}
              disabled={disabledForm}
            />
            <TextField
              style={{ width: '100%', margin: '0 0 10px 0' }}
              required
              id="telefone"
              label="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(mphone(e.target.value))}
              disabled={disabledForm}
            />
            <FormControl fullWidth>
              <InputLabel>Situação</InputLabel>

              <Select
                style={{ width: '100%', margin: '0 0 10px 0' }}
                labelId="status"
                id="status"
                label="Situação"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={disabledForm}
              >
                <MenuItem value="LIVRE">LIVRE</MenuItem>
                <MenuItem value="RESERVADO">RESERVADO</MenuItem>
                <MenuItem value="PAGO">PAGO</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: '100%', margin: '0 0 10px 0' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={e => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              style={{ marginLeft: 'auto !important' }}
              onClick={() => submit()}
              variant="contained"
              disabled={disabledForm}
            >
              Salvar
            </Button>
          </div>
        </Box>
      </Dialog>
    </div >
  );
}

export default Modal;
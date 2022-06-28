import React, { useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Props as PropsNumber } from "../Number/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

const Modal: React.FC<Props> = function ({
  title,
  open,
  handleClose,
  numberObject,
}) {
  const { save, update, deleted } = useCota();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [status, setStatus] = useState("RESERVADO");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const refreshForm = () => {
    setNome("");
    setTelefone("");
    setStatus("RESERVADO");
    setPassword("");
    setShowPassword(false);
  };

  useEffect(() => {
    refreshForm();
    if (numberObject.id !== undefined) {
      setNome(numberObject.nome !== undefined ? numberObject.nome : "");
      setTelefone(
        numberObject.telefone !== undefined ? numberObject.telefone : ""
      );
      setStatus(numberObject.status);
    }
  }, [numberObject]);

  const submit = async () => {
    if (nome.trim() === "") {
      alert("Nome inválido");
      return;
    }

    if (telefone.trim() === "") {
      alert("Telefone inválido");
      return;
    }

    if (telefone.trim().length < 15) {
      alert("Telefone inválido, preencha todos os dígitos");
      return;
    }

    if (status.trim() === "") {
      alert("Status inválido");
      return;
    }

    if (password.trim() === "") {
      alert("Digite a senha!");
      return;
    }

    if (status === "ABERTO") {
      setNome("");
      setTelefone("");
    }

    try {
      const cotaSelected = {
        nome,
        cota: numberObject.cota,
        telefone,
        status,
      };

      if (numberObject.id === undefined) {
        await save(cotaSelected, password);
        alert("Salvo com sucesso!");
      } else {
        await update(cotaSelected, password);
        alert("Atualizado com sucesso!");
      }

      refreshForm();
      handleClose(false);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const excluir = async () => {
    try {
      if (password.trim() === "") {
        alert("Digite a senha!");
        return;
      }

      await deleted(numberObject.cota, password);
      alert("Excluído com sucesso!");
      refreshForm();
      handleClose(false);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

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
  };

  const disabledForm = useMemo(() => {
    if (numberObject.status === "PAGO") {
      return true;
    }

    return false;
  }, [numberObject]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#000" }}>
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
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <TextField
              style={{ width: "100%", margin: "0 0 10px 0" }}
              required
              id="nome"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value.toUpperCase())}
              disabled={disabledForm}
            />
            {numberObject.id === undefined && (
              <TextField
                style={{ width: "100%", margin: "0 0 10px 0" }}
                required
                id="telefone"
                label="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(mphone(e.target.value))}
                disabled={disabledForm}
              />
            )}
            <FormControl fullWidth>
              <InputLabel>Situação</InputLabel>

              <Select
                style={{ width: "100%", margin: "0 0 10px 0" }}
                labelId="status"
                id="status"
                label="Situação"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={disabledForm}
              >
                <MenuItem value="RESERVADO">RESERVADO</MenuItem>
                <MenuItem value="PAGO">PAGO</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{ width: "100%", margin: "0 0 10px 0" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabledForm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              {numberObject.id !== undefined && (
                <Button
                  onClick={() => excluir()}
                  disabled={disabledForm}
                  variant="contained"
                  color="error"
                >
                  <svg
                    style={{ width: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#fff"
                      d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                    />
                  </svg>
                </Button>
              )}

              <Button
                style={{ marginLeft: "auto" }}
                onClick={() => submit()}
                variant="contained"
                disabled={disabledForm}
              >
                Salvar
              </Button>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default Modal;

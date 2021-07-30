import { Box } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

const FormErrorBox = styled(Box)(({ theme }) => ({
  marginTop: `${theme.spacing(1)}`,
  color: "#f65157",
}));

type FormErrorProps = {
  error: string;
};

const FormError = (props: FormErrorProps) => {
  return <FormErrorBox>{props.error}</FormErrorBox>;
};

export default FormError;

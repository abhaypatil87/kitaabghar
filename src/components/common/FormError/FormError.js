import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: theme.spacing(1),
    color: "#f65157",
  },
}));

const FormError = (props) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.error}>
      {props.error}
    </Box>
  );
};

export default FormError;

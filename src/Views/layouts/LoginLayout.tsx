import { Link as RouterLink, Outlet } from "react-router-dom";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import Logo from "../../components/Sidebar/Logo";

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const LoginLayout = () => {
  return (
    <>
      <StyledHeader>
        <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo />
        </RouterLink>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default LoginLayout;

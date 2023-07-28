import { makeStyles } from "@fluentui/react-theme-provider";
import pageStyles from "../jss/styles";
const useStyles = makeStyles(pageStyles);
export const usePageStyles = () => {
  const classes = useStyles();
  return classes;
};

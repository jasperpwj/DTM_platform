import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  button: {
    marginTop: 20,
  },
}))

export default function NotFoundPage() {
  const classes = useStyles();

  return (
      <div>
          <h1>404: Page Not Found</h1>
          <p>Sorry, you are not allowed to access this page or the page does not exist</p>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            className={classes.button}
          >
              Back to Homepage
            <Home />
          </Button>
      </div>
  )
}
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  root: {
    height: '100vh',

    '& .MuiTextField-root': {
      margin: theme.spacing (1, 0),
      // maxWidth: "50ch",
      width: '100%',
    },
  },
  form: {
    // padding: theme.spacing(10, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  welcomeTxt: {
    margin: theme.spacing (2, 0, 3, 0),
  },
  formcontrol: {
    width: '100%',
    maxWidth: '450px',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    [theme.breakpoints.down ('sm')]: {
      padding: theme.spacing (0, 2.025),
    },
  },
  button: {
    margin: theme.spacing (3, 0, 2, 0),
    padding: theme.spacing (1.5),
  },
  backImg: {
    width: '100%',
    height: 'calc(100vh)',
    backgroundImage: ' url("/images/back2.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: 0.5,
  },
  overlay: {
    position: 'relative',
    zIndex: -1,
    backgroundColor: 'black',
    height: '100vh',
    '&::after': {
      content: '',
      top: 0,
      left: 0,
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'block',
    },
    [theme.breakpoints.down ('md')]: {
      display: 'none',
    },
  },
  formFooter: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    '& div': {
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
    },
  },
  logo: {
    '& img': {
      width: 150,
    },
  },
}));

export default useStyles;

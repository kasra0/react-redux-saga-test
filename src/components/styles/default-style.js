const style_0 = () => ({
    root: {
      flexGrow: 5,
      marginTop: 150,
    },
    paper: {
      padding: 16,
      textAlign: 'center', 
    },
  });

  const select_style = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 1,
    },
    button: {
      margin: theme.spacing.unit,
    },
    paper: {
      padding: 16,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  });

  export default {style_0,select_style}
  
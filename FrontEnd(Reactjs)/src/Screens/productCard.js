import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 345,
    margin:"1rem"
  },
});
export default function productCard(props) {
  const classes = useStyles();
  const dispatch=useDispatch();
  return (
    <Card className={classes.root}>
      <CardActionArea style={{outline:"none",outlineColor:"none"}}>
      <Link to={"/product/"+props.id}><CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={props.image}
          title={props.name}
        /></Link>
        <CardContent>
          <Typography className="d-flex justify-content-between align-item-center">
          <Link to={"/product/"+props.id} style={{textDecoration:"none"}}><strong style={{fontFamily:"Times New Roman"}}>{props.name}</strong></Link>
            <strong >Price : ${props.price}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Rating
            name="hover-feedback"
            precision={0.5}
            value={3.5}
            style={{color:"orangered"}}
            readOnly
            /><br/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to={"/product/"+props.id}><Button size="small" variant="contained" color="primary"style={{outline:"none",outlineColor:"none",fontFamily:"Times New Roman"}}>
        <strong>View</strong>
        </Button>
        </Link>
        <Button 
        onClick={()=>dispatch(addToCart(props.product,1))}
        size="small" variant="contained" color="secondary"style={{outline:"none",outlineColor:"none",fontFamily:"Times New Roman"}}>
        <strong>Add To Cart</strong>
        </Button>
      </CardActions>
    </Card>
  );
}

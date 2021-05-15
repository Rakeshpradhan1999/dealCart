import React from "react";
// import { styles } from './styles';
import useStyles from "./styles";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartAction } from "../../redux/actions/cartAction";
const MobileCart = ({ item, removeHandler, trashbtn = true }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let stock = 0;
  item.stock >= 10 ? (stock = 10) : (stock = item.stock);
  const count = [...Array(stock).keys()];

  const cartUpdate = (e) => {
    const qty = Number(e.target.value);
    dispatch(cartAction(item._id, qty));
  };
  const truncateText = (text, limit) => {
    if (item.name.length > limit) {
      return text.substring(0, limit) + "...";
    } else {
      return text;
    }
  };
  const cardText = truncateText(item.name, 40);

  return (
    <div className={`shadow card w-100 mb-4 ${classes.mobileCart} `}>
      <div className="row">
        <div className="col-12">
          <div className="row g-0 ">
            <div className="col-8">
              <div className="card-body">
                <h6 className="fs-6">{item.title}</h6>
                <p className="card-title">{cardText}</p>
                <p className="card-text">${item.price}.00</p>
              </div>
            </div>
            <div className="col-4">
              <div className={classes.imageWrapper}>
                <img
                  src={item.thumbnail}
                  className="img-fluid"
                  alt={item.name}
                />
              </div>
            </div>
          </div>
        </div>
        {trashbtn && (
          <div className="col-12">
            <div className="row g-0 py-3 align-items-center">
              <div className="col-6 border-end border-1 text-center">
                <span>Qty</span>
                <select
                  className="form-select-sm w-auto mx-auto border-0"
                  value={item.qty}
                  onChange={cartUpdate}
                >
                  {count.map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6 text-center ">
                <div className={classes.trash}>
                  <button onClick={() => removeHandler(item._id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileCart;

// <div className='col-2'>
// 					<img src={item.thumbnail} className='img-fluid' alt={item.name} />
// 				</div>
// 				<div className='col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6'>
// 					<div className='card-body'>
// 						<h6 className='card-title'>{item.title}</h6>
// 						<p className='card-text fs-6'>{item.name}</p>
// 						<span className='card-title'>
// 							<span className='fw-bold'> Rs</span> {item.price}
// 						</span>
// 					</div>
// 				</div>
// 				<div className={`col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ${classes.cardActions}`}>
// 					<div>
//
// 					</div>

//
// 				</div>

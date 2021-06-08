import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import {Loading} from '../../../components';

import DeleteIcon from '@material-ui/icons/Delete';
import {
  productDetailAction,
  productUpdate,
} from '../../../redux/actions/productAction';
import {PRODUCT_UPDATE_RESET} from '../../../redux/types/productType';
import {
  Grid,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import FormWrapper from '../FormWrapper';
import useStyles from '../styles';
import {getCategories} from '../../../redux/actions/categoryAction';

const EditProductScreen = ({match, history}) => {
  const productId = match.params.id;
  const [name, setName] = useState ('');
  const [description, setDescription] = useState ('');
  const [title, setTitle] = useState ('');
  const [price, setPrice] = useState (0);
  const [stock, setStock] = useState ('');
  const [brand, setBrand] = useState ('');
  const [category, setCategory] = useState ('');
  const [subCategory, setSubCategory] = useState ('');
  const [images, setImages] = useState ([]);
  const [uploading, setUploading] = useState (false);
  const [categoryList, setCategoryList] = useState ({});

  const dispatch = useDispatch ();
  const classes = useStyles ();

  const productDetails = useSelector (state => state.productDetails);
  const {product, loading, error} = productDetails;

  const updateProduct = useSelector (state => state.updateProduct);
  const {success, loading: updateLoading, error: updateError} = updateProduct;

  const {
    loading: cateListLoading,
    error: cateListerror,
    success: cateSuccess,
    categories,
  } = useSelector (state => state.categoryList);

  // if (categories) {
  //   setCategory (categories);
  // }
  categories && console.log (categories);
  useEffect (() => {
    dispatch (getCategories ());
    if (cateSuccess) {
      setCategoryList (categories);
    }
  }, []);
  useEffect (
    () => {
      if (success) {
        dispatch ({type: PRODUCT_UPDATE_RESET});
        history.push ('/admindash/products');
      } else {
        if (!product || product._id !== productId) {
          dispatch (productDetailAction (productId));
        } else {
          setName (product.name);
          setTitle (product.title);
          setBrand (product.brand);
          setPrice (product.price);
          setDescription (product.description);
          setStock (product.stock);
          setCategory (product.category);
          setSubCategory (product.subCategory);
          setImages (product.images);
        }
      }
    },
    [product, productId, dispatch, success, history]
  );

  const handleSubmit = e => {
    e.preventDefault ();
    dispatch (
      productUpdate ({
        _id: productId,
        name,
        title,
        stock,
        description,
        category,
        subCategory,
        brand,
        price,
        images,
      })
    );
  };

  const getSignature = async () => {
    const response = await fetch ('/api/upload');
    return await response.json ();
  };
  const onDrop = useCallback (acceptsFiles => {
    setUploading (true);
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;

    acceptsFiles.forEach (async acceptsFile => {
      const {signature, timestamp} = await getSignature ();
      const formData = new FormData ();
      formData.append ('file', acceptsFile);
      formData.append ('signature', signature);
      formData.append ('timestamp', timestamp);
      formData.append ('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
      const reponse = await fetch (url, {
        method: 'POST',
        body: formData,
      });

      const data = await reponse.json ();
      setImages (old => [...old, data.url]);
      setUploading (false);
    });
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone ({
    onDrop,
    accepts: 'images/*',
  });

  const removeImg = image => {
    setImages (images.filter ((img, i) => img !== image));
  };

  return loading || updateLoading
    ? <Loading />
    : <FormWrapper
        title={'Update Product'}
        link={'/adminDash/products'}
        btntxt={'Products'}
      >
        <form onSubmit={handleSubmit}>
          <Grid container className={classes.formContainer} spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={name}
                label={' Product Name'}
                onChange={e => setName (e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={title}
                label={' Product Title'}
                onChange={e => setTitle (e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                value={stock}
                label={' Product Stock'}
                onChange={e => setStock (e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                value={price}
                label={' Product Price'}
                onChange={e => setPrice (e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={brand}
                label={' Product Brand'}
                onChange={e => setBrand (e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                defaultValue={description}
                label={'Product Description'}
                onChange={e => setDescription (e.target.value)}
                multiline={true}
                rows={5}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category">Product Category</InputLabel>
                <Select
                  id="category"
                  value={category}
                  onChange={e => setCategory (e.target.value)}
                  label="Product Category"
                >
                  <MenuItem value={'Men'}>Men</MenuItem>
                  <MenuItem value={'Women'}>Women</MenuItem>
                  <MenuItem value={'Kids'}>Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                value={subCategory}
                label={'Product subcategory'}
                onChange={e => setSubCategory (e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                {...getRootProps ()}
                className={`${classes.dropzone}
                      ${isDragActive ? classes.active : null} `}
              >
                <input {...getInputProps ()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              {images.length !== 0 &&
                <Grid container spacing={2} className={classes.imageWrapper}>
                  {uploading
                    ? <CircularProgress size={24} />
                    : images.map ((file, index) => (
                        <Grid item xs={2} key={index}>
                          <div className={classes.image}>
                            <img src={file} alt="file" />
                            <IconButton
                              size="small"
                              className={classes.trash}
                              onClick={() => removeImg (file)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </Grid>
                      ))}
                </Grid>}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                color="primary"
                fullWidth
              >
                Save Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>;
};

export default EditProductScreen;

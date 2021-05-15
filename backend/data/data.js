import bcrypt from "bcryptjs";
export const data = {
  users: [
    {
      name: "John",
      email: "jhon@gmail.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
    },
    {
      name: "joy",
      email: "joy21@gmail.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
    {
      name: "Jane",
      email: "Jane@gmail.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
    {
      name: "Admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
    },
    {
      name: "test",
      email: "test@example.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      title: "HIGHLANDER",
      name: "Highlander Olive Green Slim Fit Casual Shirt",
      price: 579,
      stock: 0,
      category: "Men",
      subCategory: "shirt",
      brand: "HIGHLANDER",
      rating: 4.5,
      description:
        "Olive green casual shirt, has a mandarin collar, a full button placket, long sleeves, a patch pocket, and a curved hem",
      numOfReivews: 10,

      images: [
        "/images/menShirt1.jpg",
        "/images/menShirt1_1.jpg",
        "/images/menShirt1_2.jpg",
        "/images/menShirt1_3.jpg",
        "/images/menShirt1_4.jpg",
      ],
    },
    {
      title: "HIGHLANDER",
      name: "Men Navy Blue Slim Fit Printed Casual Shirt",
      price: 494,
      stock: 9,
      category: "Men",
      subCategory: "shirt",
      brand: "HIGHLANDER",
      rating: 4.2,
      description:
        "Navy Blue printed casual shirt, has a spread collar, short sleeves, button placket, curved hem, and 1 patch pocket",
      numOfReivews: 12,
      images: [
        "/images/menShirt2.jpg",
        "/images/menShirt2_1.jpg",
        "/images/menShirt2_2.jpg",
        "/images/menShirt2_3.jpg",
        "/images/menShirt2_4.jpg",
      ],
    },
    {
      title: "Bene Kleed",
      name: "Men Off-White & Blue Slim Fit Printed Casual Shirt",
      price: 671,
      stock: 100,
      category: "Men",
      subCategory: "shirt",
      brand: "HIGHLANDER",
      rating: 4.2,
      description:
        "Off-White and blue printed casual shirt, has a spread collar, long sleeves, curved hem,",
      numOfReivews: 12,
      images: [
        "/images/menShirt3.jpg",
        "/images/menShirt3_1.jpg",
        "/images/menShirt3_2.jpg",
        "/images/menShirt3_3.jpg",
        "/images/menShirt3_4.jpg",
      ],
    },
    {
      title: "WROGN",
      name: "Men Black Slim Fit Solid Casual Linen Shirt",
      price: 899,
      stock: 100,
      category: "women",
      subCategory: "shirt",
      brand: "WROGN",
      rating: 4.6,
      description:
        "Black solid casual shirt, has a spread collar, long sleeves, button placket, curved hem, and 1 patch pocket,",
      numOfReivews: 10,
      images: [
        "/images/menShirt4.jpg",
        "/images/menShirt4_1.jpg",
        "/images/menShirt4_2.jpg",
        "/images/menShirt4_3.jpg",
        "/images/menShirt4_4.jpg",
      ],
    },
    {
      title: "Campus Sutra",
      name: "Men Navy Blue & Grey Standard Fit Colourblocked Casual Shirt",
      price: 674,
      stock: 100,
      category: "Men",
      subCategory: "shirt",
      brand: "Campus Sutra",
      rating: 4.6,
      description:
        "Navy blue and grey colourblocked casual shirt, has a spread collar, long sleeves, button placket, and curved hem",
      numOfReivews: 10,
      images: [
        "/images/menShirt5.jpg",
        "/images/menShirt5_1.jpg",
        "/images/menShirt5_2.jpg",
        "/images/menShirt5_3.jpg",
        "/images/menShirt5_4.jpg",
      ],
    },
    {
      title: "HIGHLANDER",
      name: "Highlander Blue Slim Washed Denim Casual Shirt",
      price: 679,
      stock: 100,
      category: "Men",
      subCategory: "shirt",
      brand: "HIGHLANDER",
      rating: 4.6,
      description:
        "Blue washed denim casual shirt, has a mandarin collar, a full button placket, long sleeves, a patch pocket, curved hem",
      numOfReivews: 10,
      images: [
        "/images/menShirt6.jpg",
        "/images/menShirt6_1.jpg",
        "/images/menShirt6_2.jpg",
        "/images/menShirt6_3.jpg",
        "/images/menShirt6_4.jpg",
      ],
    },
    {
      title: "Roadster",
      name: "Men Blue Slim Fit Faded Casual Denim Shirt",
      price: 959,
      stock: 100,
      category: "Men",
      subCategory: "shirt",
      brand: "Roadster",
      rating: 4.6,
      description:
        "Blue faded casual denim shirt, has a spread collar, button placket, 2 pockets, long sleeves, curved hem",
      numOfReivews: 10,
      images: [
        "/images/menShirt7.jpg",
        "/images/menShirt7_1.jpg",
        "/images/menShirt7_2.jpg",
        "/images/menShirt7_3.jpg",
        "/images/menShirt7_4.jpg",
      ],
    },
    {
      title: "Levis",
      name: "Men Blue & White Regular Fit Checked Casual Shirt",
      price: 959,
      stock: 100,
      category: "Men",
      subCategory: "shirt",
      brand: "Levis",
      rating: 4.6,
      description:
        "Blue and White checked casual shirt, has a spread collar, short sleeves, button placket, curved hem, and 1 patch pocket",
      numOfReivews: 10,

      images: [
        "/images/menShirt8.jpg",
        "/images/menShirt8_1.jpg",
        "/images/menShirt8_2.jpg",
        "/images/menShirt8_3.jpg",
        "/images/menShirt8_4.jpg",
      ],
    },
  ],
};

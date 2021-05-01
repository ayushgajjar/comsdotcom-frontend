export const addItemToCart = (item,count1, next) => {
    let cart = [];
    let temp=0;
    let count=count1;
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === item._id ) {
          if(count==0){
          count=product.count
          count++;
        }
          cart.splice(i, 1);
          temp=i;
        }
      });
      if(count==0)
      {count=1;}
      cart.splice(temp,0,{
        ...item,
        count: count
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  
  export const loadCart = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
      else
      {
        let cart=[];
        localStorage.setItem("cart", JSON.stringify(cart));
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
  };
  
  export const removeItemFromCart = productId => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === productId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const cartEmpty = next => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      let cart=[]
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  }
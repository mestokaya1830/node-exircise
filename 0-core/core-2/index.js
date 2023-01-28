const express = require('express');
const cookieSession = require('cookie-session');
const productsRouter = require('./routes/productsRoute');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const cartsRouter = require('./routes/cartsRoute');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ['lkasld235j']
  })
);

app.use(productsRouter);
app.use(authRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log('Listening');
});

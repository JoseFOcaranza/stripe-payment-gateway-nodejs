// Aquí hay que cambiar la llave publicable por la suya
const stripe = require("stripe")("YOUR_SECRET_KEY");

const express = require("express");

const app = express();

app.use(express.static("."));

const URL = "http://localhost:8080";

app.post("/create-checkout-session", async (req, res) => {
  const product = await stripe.products.create({
    name: "Asus Tarjeta Gráfica Nvidia GeForce RTX 3060 TUF-RTX3060-O12G",
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/81pvDYeb%2BqL._AC_SX522_.jpg",
    ],
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 150000,
    currency: "usd",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${URL}/success.html`,
    cancel_url: `${URL}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(8080, () => console.log("Running on port 8080"));

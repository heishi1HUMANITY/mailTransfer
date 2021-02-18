const gmailSend = require('gmail-send');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/mailserver/', (req, res) => {
  const body = req.body;
  console.log(body);

  let html = `
    <p>${body.user[0]}様</p><br />
    <p>この度はJugareのご利用誠にありがとうございます。</p>
    <p>以下の注文が完了したことをお知らせ致します。</p></br>
  `;
  for (const c of body.cart) {
    html += `<p>${c.item}x${c.quantity}:&yen;${(Number(c.price) * Number(c.quantity)).toLocaleString()}</p>`;
  }
  html += `
    <br />
    <p>商品は以下にお届け致します。</p>
    <p>${body.user[2]}${body.user[3]}${body.user[4]}</p>
  `;

  const send = gmailSend({
    user: process.env.MAIL_TRANSFER_USER,
    pass: process.env.MAIL_TRANSFER_PASSWORD,
    to: body.mail,
    subject: '購入完了のお知らせ'
  });
  send({ html: html })
    .then(() => {
      res.json({
        status: 200,
        message: 'done'
      });
    })
    .catch(err => {
      res.json({
        status: 400,
        message: err
      });
    });
});

app.listen(3000, () => console.log(':3000'));
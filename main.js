const send = require('gmail-send')({
  user: 'nostime.project@gmail.com',
  pass: '',
  to: 's1821094@s.do-johodai.ac.jp',
  subject: 'test'
});

send({
  text: 'test'
},
(error, result, fullResult) => {
  if(error) console.error(error);
  console.log(result);
});
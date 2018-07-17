const request = require('superagent');

const mailToken = ({ email, token }, callback) => {
  request
    .post('https://api.sendgrid.com/v3/mail/send')
    .set('Authorization', `Bearer ${process.env.SENDGRID_API_KEY}`)
    .send({
      personalizations: [{
        to: [{ email }],
        subject: 'hello world'
      }],
      from: {
        email: 'app@jobapi.com'
      },
      content: [{
        type: 'text/html',
        value: `<p>Your Job API token - <strong>${token}</strong></p>`
      }]
    })
    .then((res) => {
      callback('done')
    }).catch(error => {
      console.log('error', error)
    })
}

module.exports = mailToken;

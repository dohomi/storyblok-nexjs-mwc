const {json} = require('micro')
const {parse} = require('querystring')

function parseRequest (req) {
  return new Promise((resolve, reject) => {

    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      resolve(parse(body))
    })
    req.on('error', (e) => {
      reject(e)
    })
  })
}


const forwardMail = async function (req, res) {
  try {
    console.log(req.headers)
    const data = await parseRequest(req)
    console.log(data)
    return res.end('Data is logged')

  } catch (e) {
    console.log(e)
  }
}
module.exports = {forwardMail}

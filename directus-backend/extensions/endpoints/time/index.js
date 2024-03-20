module.exports = function register (router, { services, exceptions, logger }) {
  router.get('/getCurrentTime', function (req, res) {
    res.send('Time Server')
  })
}
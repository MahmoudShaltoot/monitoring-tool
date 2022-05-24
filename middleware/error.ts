
const error = (err, req, res, next) => {
  res.status(500).send('Something failed.');
}

export = error
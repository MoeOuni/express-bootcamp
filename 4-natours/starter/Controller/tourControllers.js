const fs = require('fs');
const app = require('../app');

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

//------ Middleware : -----------
exports.checkId = (req, res, next, val) => {
  console.log(val);
  if (val > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Id not found',
    });
  }
  next();
};

//-------------------------------
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};
//-------------------------------
exports.getTourById = (req, res) => {
  //console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  //console.log(tour);
  if (!tour) {
    res.status(404).json({
      status: 'Fail',
      message: 'Id not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
//---------------------------------
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.duration || !req.body.difficulty) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid parametres',
    });
  }
  next();
};
//---------------------------------

exports.addNewTour = (req, res) => {
  //console.log(req.body);
  //res.send('done');
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return 'ERROR';
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
//---------------------------------
exports.updateTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '< tour updated ... >',
  });
};
//---------------------------------
exports.deleteTourById = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: null,
  });
};

const isEmpty = require('is-empty');
const { validateObjectID } = require('../helpers/inputValidation');
const { Page } = require('../models/page')


const addPage = async (req, res) => {
  if (req.user.body.Writer === true) {
    const { title, body } = req.body;

    if (isEmpty(title)) {
      res.status(400).json({ message: "Page title can't be empty", success: false })
    } else {
      const dbPage = new Page({
        title: title,
        body: body || '',
        _UID: req.user.id
      });

      dbPage.save()
        .then(() => {
          res.status(201).json({ message: 'Page created successfully', success: true });
        })
        .catch((err) => {
          res.status(400).json({ message: `Failed: ${err}`, success: false })
          console.log(`An error occurred while storing the page in the database: ${err}`)
        });
    }
  }
  else {
    return res.status(401).json({ message: `Unauthorized`, success: false })
  }
}
const deletePage = async (req, res) => {
  if (req.user.Writer == true) {
    const { pageID } = req.body;
    const { errors, isValid } = validateObjectID(pageID);

    if (!isValid) {
      res.status(400).json({ ...errors, success: false });
    } else {
      Page.deleteOne({ _id: pageID, _UID: req.user.id })
        .then((info) => {
          if (info.deletedCount === 0) {
            res.status(400).json({ message: 'Cannot delete this document', success: false })
          } else {
            res.status(200).json({ message: 'Page deleted successfully', success: true })
          }
        })
        .catch((err) => {
          res.status(400).json({ message: `Error occurred while searching for page : ${err}`, success: false })
        })

    }
  }
  else {
    res.status(401).json({ message: `Unauthorized `, success: false })
  }
}


const getPages = (req, res) => {
  Page.find({ _UID: req.user.id }, { __v: 0, _UID: 0 })
    .then(pages => {
      res.status(200).json({ pages })
    })
    .catch(err => {
      res.status(400).json({ message: `Error occurred while searching for pages : ${err}`, success: false })
    })
}

const updatePage = (req, res) => {
  if (req.user.Writer == true) {
    const { title, body, pageID } = req.body;
    const { errors, isValid } = validateObjectID(pageID);

    if (!isValid) {
      res.status(400).json({ ...errors, success: false });
    } else if (isEmpty(title)) {
      res.status(400).json({ message: "Page title can't be empty", success: false })
    } else {
      Page.findOne({ _id: pageID, _UID: req.user.id })
        .then((dbPage) => {
          if (dbPage) {
            dbPage.title = title;
            dbPage.body = body || '';

            dbPage.save()
              .then(() => {
                res.status(201).json({ message: 'Page modified successfully', success: true });
              })
              .catch((err) => {
                res.status(400).json({ message: `Failed: ${err}`, success: false })
                console.log(`An error occurred while storing the page in the database: ${err}`)
              });
          } else {
            res.status(400).json({
              message: `Page of id ${pageID} is undefined for user ${req.user.id}`,
              success: false
            })
          }
        })
        .catch((err) => {
          res.status(400).json({ message: `Error occurred while searching for Page: ${err}`, success: false })
        });
    }
  }
  else {
    res.status(401).json({ message: `Unauthorized `, success: false })
  }
}


module.exports = {
  addPage,
  getPages,
  updatePage,
  deletePage
}
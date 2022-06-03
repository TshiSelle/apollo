const isEmpty = require('is-empty');
const { Page } = require('../models/page');
const { validateSearchInput } = require('../helperFunctions/inputValidation');

const searchPages = async (req, res) => {
  let { searchString, pageNum, title } = req.query;
  const pagesPerPage = 12;
  pageNum = isEmpty(pageNum) || pageNum < 1 ? 1 : pageNum;
  const { errors, isValid } = validateSearchInput(req.query);

  if (isEmpty(searchString)) {
    searchString = '';
  }

  if (!isValid) {
    return res.status(400).json({ ...errors, success: false });
  } else {
    try {
      const query = {
        $or: [
          { $text: { $search: searchString } },
        ],
        $and: [
          {
            title: {
              $regex: title ? '.*' + title + '.*' : /.*/,
              $options: 'i',
            },
          },
        ],
      };

      const searchResults = await Pa.find(query, {
        __v: 0,
        score: { $meta: 'textScore' },
      })
        .limit(pagesPerPage)
        .skip((pageNum - 1) * pagesPerPage)
        .sort({ score: { $meta: 'textScore' }, ...(isEmpty(searchString) && { _id: -1 }) });

      const numOfResults = await Page.countDocuments(query);

      if (numOfResults > 0 && pageNum > Math.ceil(numOfResults / pagesPerPage)) {
        return res.status(400).json({
          message: 'Page number too large.',
          success: false,
          numOfResults,
        });
      }

      return res.status(200).json({
        numOfResults,
        numOfPages: Math.ceil(numOfResults / pagesPerPage),
        success: true,
        searchResults,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: `Error occurred while searching for pages`,
        success: false,
        error: error,
      });
    }
  }
};

module.exports = { searchPages };
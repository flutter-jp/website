exports.search = (req, res) => {
  res.json({
    books: [
      {
        goodreadsId: 1,
        title: "React development in depth",
        author: "Ry",
        covers: [
          "http://file.ituring.com.cn/SmallCover/1801f1225f01b2147c42",
          "http://file.ituring.com.cn/SmallCover/01003fa5eb1edf681355"
        ],
        page: 123
      },
      {
        goodreadsId: 2,
        title: "node development in depth",
        author: "zh",
        covers: [
          "http://file.ituring.com.cn/SmallCover/17084390f8568f81f013",
          "http://file.ituring.com.cn/SmallCover/01003d1824cf5b99340b"
        ],
        page: 231
      }
    ]
  });
};

class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          title: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryObj = { ...this.querystr };
    // console.log(queryCopy)
    const removeField = ["sort", "keyword", "limit", "page"];
    removeField.forEach((el) => delete queryObj[el]); //delet from querystring
    //Advance filters
    let querystring = JSON.stringify(queryObj);
    querystring = querystring.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // console.log(querystr)

    this.query = this.query.find(JSON.parse(querystring));
    return this;
  }
  sorting() {
    if (this.querystr.sort) {
      const sortby = this.querystr.sort.split(",").join(" ");
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagination() {
    const currentPage = Number(this.querystr.page) || 1;
    const limit = Number(this.querystr.limit) || 6;
    const skip = limit * (currentPage - 1);
    this.query = this.query.limit(limit).skip(skip);

    return this;
  }
}

export default ApiFeatures;

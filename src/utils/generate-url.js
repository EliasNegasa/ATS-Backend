const generateUrl = (page, limit, sort = '') => {
  return `/api/jobs?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`;
};

export default generateUrl;

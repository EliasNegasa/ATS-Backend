import asyncHandler from 'express-async-handler';
import Job from '../models/jobs';

const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  res.status(200).json(job);
});

const getJobs = asyncHandler(async (req, res) => {
  console.log('QUERY', req.query);

  const excludeQueries = ['page', 'limit', 'sort'];

  const queries = { ...req.query };

  for (const query of excludeQueries) {
    delete queries[query];
  }

  console.log(queries);

  let query = Job.find(queries);

  if (req.query.sort) {
    console.log('SORT', req.query.sort);
    query = query.sort(req.query.sort);
  } else {
    query = query.sort('-createdAt');
  }

  const total = await Job.countDocuments();

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    if (skip >= total) {
      throw new Error('Page not Found');
    }
  }

  const jobs = await query;

  res.status(200).json({
    metadata: {
      total,
      page,
      limit,
    },
    links: {
      prev: 'url',
      self: 'url',
      next: 'url',
    },
    data: jobs,
  });
});

const createJob = asyncHandler(async (req, res) => {
  // const { company, position, role, level, contract, location } = req.body;

  const job = await Job.create(req.body);

  res.status(201).json(job);
});

//patch
const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const job = await Job.findById(id);

  // if (!job) {
  //   res.status(400);
  //   throw new Error('Job not Found');
  // }

  const options = {
    new: true,
    runValidators: true,
  };

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, options);

  res.status(200).json(updatedJob);
});

const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndDelete(id);

  // if (!job) {
  //   res.status(400);
  //   throw new Error('Job not Found');
  // }

  res.status(204).json({ id });
});

export { getJobById, getJobs, createJob, updateJob, deleteJob };

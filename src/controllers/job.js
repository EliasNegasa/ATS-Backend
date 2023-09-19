import asyncHandler from 'express-async-handler';
import Job from '../models/job';
import generateUrl from '../utils/generate-url';

const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    res.status(404);
    throw new Error('Job not Found');
  }

  res.json(job);
});

const getJobs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort, ...filterQueries } = req.query;

  const total = await Job.countDocuments(filterQueries);

  if (page > Math.ceil(total / limit) && total > 0) {
    throw new Error('Page not Found');
  }

  const jobs = await Job.find(filterQueries)
    .collation({ locale: 'en', strength: 2 })
    .sort(sort || '-createdAt')
    .skip((page - 1) * limit)
    .limit(+limit);

  res.status(200).json({
    metadata: {
      total,
      page: +page,
      limit: +limit,
    },
    links: {
      prev: page > 1 ? generateUrl(page - 1, limit, sort, 'jobs') : null,
      self: req.originalUrl,
      next:
        page * limit < total
          ? generateUrl(+page + 1, limit, sort, 'jobs')
          : null,
    },
    data: jobs,
  });
});

const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);

  res.status(201).json(job);
});

const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const options = {
    new: true,
    runValidators: true,
  };

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, options);

  if (!updatedJob) {
    res.status(404);
    throw new Error('Job not Found');
  }

  res.status(200).json(updatedJob);
});

const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    res.status(404);
    throw new Error('Job not Found');
  }

  res.status(204).json({ message: 'Job Deleted' });
});

export { getJobById, getJobs, createJob, updateJob, deleteJob };

import expressAsyncHandler from 'express-async-handler';
import Job from '../models/jobs';

const getJobById = (req, res) => {
  res.status(200).json('GET JOB');
};

const getJobs = expressAsyncHandler(async (req, res) => {
  const jobs = await Job.find();

  res.status(200).json(jobs);
});

const createJob = expressAsyncHandler(async (req, res) => {
  const job = await Job.create({
    company: req.body.company,
  });

  res.status(200).json(job);
});

const updateJob = expressAsyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(400);
    throw new Error('Job not Found');
  }

  const updatedJob = await findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedJob);
});

const deleteJob = expressAsyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(400);
    throw new Error('Job not Found');
  }

  await job.remove();

  res.status(200).json({ id: req.params.id });
});

export { getJobById, getJobs, createJob, updateJob, deleteJob };

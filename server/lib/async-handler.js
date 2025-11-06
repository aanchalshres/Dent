export const asyncHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    console.log(`The error is: ${err}`);
    next(err);
  }
};

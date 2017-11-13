export const ASYNC_OPERATION_STARTED = 'ASYNC_OPERATION_STARTED';
export const ASYNC_OPERATION_FINISHED = 'ASYNC_OPERATION_FINISHED';

export const requestingItems = () => ({
  type: ASYNC_OPERATION_STARTED,
  isFetching: true,
});

export const receivedItems = () => ({
  type: ASYNC_OPERATION_FINISHED,
  isFetching: false,
});

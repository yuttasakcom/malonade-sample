import {
  Worker,
  ITask,
  ITaskResponse,
  TaskStates,
} from '@melonade/melonade-client'

const kafkaServers = 'localhost:29092'
const namespace = 'docker-compose'

const TASK_NAME = 't2'
const TASK_CALLBACK = async (task: ITask): Promise<ITaskResponse> => {
  return Promise.reject('Test Compensate')
}
const COMPENSATE_CALLBACK = async (task: ITask): Promise<ITaskResponse> => {
  return {
    status: TaskStates.Failed,
    output: `${task.taskName} fail`,
  }
}

export default new Worker(TASK_NAME, TASK_CALLBACK, COMPENSATE_CALLBACK, {
  kafkaServers,
  namespace,
})

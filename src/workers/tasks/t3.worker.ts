import {
  Worker,
  ITask,
  ITaskResponse,
  TaskStates,
} from '@melonade/melonade-client'

const kafkaServers = 'localhost:29092'
const namespace = 'docker-compose'

const TASK_NAME = 't3'
const TASK_CALLBACK = async (task: ITask): Promise<ITaskResponse> => {
  return {
    status: TaskStates.Completed,
    output: {
      message: `input:${task.input.hello} => ${task.taskName}`,
    },
  }
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

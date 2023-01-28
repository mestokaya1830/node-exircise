import amqp from 'amqplib'

const queueName = process.argv[2] || 'jobsQueue'
/*
  open multiple consumer with queue name like
  npm run consumer queue1 && npm run consumer queue2
*/

const connect_rabbitmq = async () => {
  try {
    const con = await amqp.connect('amqp://localhost:5672')
    const channel = await con.createChannel()
    const assert = await channel.assertQueue(queueName)

    channel.consume(queueName, (result) => {
      console.log(result.content.toString())
      channel.ack(result)//mark as readed
    })

  } catch (error) {
    console.error(error)
  }
}
connect_rabbitmq()
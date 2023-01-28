import amqp from 'amqplib'

const queueName = process.argv[2] || 'jobsQueue'
/*
  open multiple publisher with queue name like
  npm run publisher queue1 && npm run publisher queue2
*/

const connect_rabbitmq = async () => {
  try {
    const con = await amqp.connect('amqp://localhost:5672')
    const channel = await con.createChannel()
    const assert = await channel.assertQueue(queueName)

    let counter = 0
    setInterval(() => {
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(counter++)))
      console.log('Sent message')
    }, 1000)
    
  } catch (error) {
    console.error(error)
  }
}
connect_rabbitmq()
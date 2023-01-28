import amqp from 'amqplib'

const connect_rabbitmq = async () => {
  try {
    const con = await amqp.connect('amqp://localhost:5672')
    const channel = await con.createChannel()
    const assert = await channel.assertQueue('jobsQueue')

    let counter = 0
    setInterval(() => {
      channel.sendToQueue('jobsQueue', Buffer.from(JSON.stringify(counter++)))
      console.log('Sent message')
    }, 1000)
    
  } catch (error) {
    console.error(error)
  }
}
connect_rabbitmq()
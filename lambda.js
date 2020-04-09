const SNS = require('aws-sdk/clients/sns');
const sns = new SNS();


module.exports.publishToTopic = async (event) => {
    console.log(JSON.stringify(event));

    const message = event.message;
    const customer_id = event.customer_id;
   const channel = JSON.stringify(event.channel);
   
   
    // 1. Validate
    //if (!TopicArn) return false;
    //let TopicArn='arn:aws:sns:us-east-1:670200067549:mphasisdemotopic';

    // 2. Publish push notification to topic
    //let data = {data: payload, type: 'lead'};

    // todo: add support for FCM
    //let key = process.env.STAGE == 'beta' || process.env.STAGE == 'prod' ? 'APNS' : 'APNS_SANDBOX';

    /*let Message = {
        default: 'This is default message to test'
    };*/

   /*Message[key] = JSON.stringify({
        aps: {
            alert: {
                title,
                body
            },
            sound: 'default'
        },
        data
    });*/
    var payload = {
    default: message,
    APNS: {
      aps: {
        alert: 'hello dummy message',
        sound: 'default',
        badge: 1
      }
    }
  };
 
    // first have to stringify the inner APNS object...
    payload.APNS = JSON.stringify(payload.APNS);
    // then have to stringify the entire message payload
    payload = JSON.stringify(payload);

   // Message = JSON.stringify(payload);
    var endpointArn='arn:aws:sns:us-east-1:570254315960:MyAWSSNSTopic2';
    
    let params = {
        Message: payload,
        MessageStructure: 'json',
        TargetArn: endpointArn,
        "MessageAttributes": {
            "customer_id": {
                "DataType": "String",
                "StringValue": customer_id
            },
            "channel": {
                "DataType": "String.Array",
                "StringValue": channel
            }      
        }
    };

    //console.log(`Message: ${Message}`);

    return sns
        .publish(params)
        .promise()
        .then(() => {
            console.log('Successfully, published a push notifiation to topic');
            return true;
        })
        .catch(error => {
            console.error(JSON.stringify(error));
            return false;
        });
};
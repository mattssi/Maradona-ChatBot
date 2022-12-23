const dialogflow = require('@google-cloud/dialogflow');
const scanf = require('scanf');
const uuid = require('uuid');
const colors =require('colors');
const _clock = require('cronometerjs')
 const clock = new _clock()



 clock.start();
 

 
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
 console.clear();
 let getInfo=()=>{
  console.log("----------------------")
  console.log("Ingrese su mensaje: ");
  var msg = scanf("%S");
  return msg;

}




async function ChatBot(projectId = 'insert your ID') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
  const aux=true;

  
 


  

  // Create a new session
  try{
  const sessionClient = new dialogflow.SessionsClient({keyFilename: "insert your API"});

  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  
 

  // The text query request.

  do{
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        
        // The query to send to the dialogflow agent
        text: (getInfo()),
        // The language used by the client (en-US)
        languageCode: 'es',
      },
    },
  };

 
    
   
  // Send request and log result
  
  const responses = await sessionClient.detectIntent(request);
  console.log('\nDetected intent'.bgYellow);
  var result = responses[0].queryResult;
  console.log('\nQuery:'.yellow, ` ${result.queryText}`);
  console.log('\nMaradona:'.blue,` ${result.fulfillmentText}`);
  
  if (result.intent) {
    console.log(`  \nIntent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.'.red);
  }

  if(result.intent.displayName=='despedida'){
    console.log('Charla Finalizada :)')
    process.exit();
  
  }
 
  if(timer.ms()==5000){process.exit()};
}

while(aux);
  }
catch(e){
    console.log("\terror".red);
}


}
 
ChatBot();




  

/**
 * class that represent server working
 */
class server{
  /**
   * this function is handeling calls that arrived to the server from the network
   * @param FXMLhttpRequest the request to the server
   * @param onReady the call back function 
   */
  UseServer = (FXMLhttpRequest, onReady) => {
    var resource = FXMLhttpRequest.url
    var body = FXMLhttpRequest.body
    var method = FXMLhttpRequest.method
    var response = {}

    switch(method){
      case 'GET':
      {
        if(resource === "/SignIn"){
          var user = Database.getUser(body.username, body.password)
          // if user exists
          if (user !== null) {
              console.log('user exists', user)
              response = {status: 200,
                  user: user}
                  onReady(response);
          } else {
              console.log('server: user does not exist')
              response = {status: 404,
                  user: null}
                  onReady(response);
          }
          // call onReady when done
        } else {
          var Tasks = Database.getMissions(body.userId);
          if (Tasks !== null) {
              var tasks_list = []
              for (var i = 0; i < Tasks.length; i++){
                  tasks_list.push({title : Tasks[i].text, id : Tasks[i].id, done : Tasks[i].done});
              }
              response = {status: 200, userId : body.userId,
                  tasks : tasks_list }
                  onReady(response);
          }
          // call onReady when done
        }
      }
      case 'POST':
      {
        if(resource === "/SignUp"){
          var user = Database.getUser(body.username, body.password)
          // if user exists
          if (user !== null) {
              console.log('user already exists')
              response = {status: 404,
                  user: null}
          } else {
              console.log('user does not exist, signing up')
              var user = new User(body.username, body.password, body.fname, body.lname);
              Database.addUser(user);
              var user = Database.getUser(body.username, body.password)
              console.log(user)
              response = {status: 200,
                  user: {username : user.username,
                      password : user.password,
                        id : user.id,
                        fname : user.fname,
                          lname : user.lname}}
          }
          // call onReady when done
          onReady(response);
        } else {
          var mission = Database.addMission(body.userId, body.title);
          if (mission !== null) {
              response = {status: 200, userId : body.userId,
                  task : {title : mission.text, id : mission.id, done : mission.done} }
          }else{
              response = {status: 404, userId : body.userId,
                  task : null }
          }
          onReady(response);
        }
      }
      case 'PUT':
      {
        var mission = Database.restoreMission(body.taskId);
        if (mission !== null) {
          response = {status: 200, userId : body.userId, task : {title : mission.text, id : mission.id, done : mission.done} }
        } else {
            response = {status: 404, userId : body.userId, task : null }
        }
        onReady(response);
      }
      case 'DELETE':
      {
        var mission = Database.removeMission(body.taskId);
        if (mission !== null) {
          response = {status: 200, task : {title : mission.title, id : mission.id, done : mission.done} }
        }
        else {
          response = {status: 404 , task : null }
        }
        onReady(response);
      }
    }
  }
}
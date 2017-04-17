export function containsRoute(string, routes){
    let found = -1;
    for (var i=0; i<routes.length; i++){
        if(routes[i]['title'] == string){
            found = i;
            break;
        }
    }
    return found;
}

export function gotoRoute(string, nav){
    let routes = nav.getCurrentRoutes();
    let index = containsRoute(string, routes);
    if (index>=0){
        nav.jumpTo(routes[index]);
    }
    else{
        nav.push({title: string});
    }
}

//Function to get LoginToken & execution (or existing auth token)
export function getCASLT(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);

    request.onload = function() {
      if (request.status === 200) {
          console.log("resolving");
        resolve(request.response);
      } else {
        reject(Error('Failed to connect to CAS - Error:' + request.statusText));
      }
    };

    request.onerror = function() {
        reject(Error('There was a network error.'));
    };

    console.log("send request");
    request.send();
  });
}

//Function for POSTing CAS login details and parsing the response
export function casLogPost(url, username, password, logtok, execution){
    //XHR req to get access to response headers
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var params = 'username='+username+'&password='+password+'&lt='+logtok+"&execution="+execution+"&_eventId=submit&submit=LOGIN";

        console.log("attemptingAuth");
        //parse the headers to Headers() or reject
        request.onload = function(){
            console.log(request.status);
            if (request.status === 200){
                var head = new Headers();
                var pairs = request.getAllResponseHeaders().trim().split('\n');
                pairs.forEach((header) =>{
                    var split = header.trim().split(':');
                    var key = split.shift().trim();
                    var value = split.join(':').trim();
                    head.append(key, value);
                })
                resolve(head);
            }
            else{
                reject(Error('Failed to authenticate - Error:'+request.statusText));
            }
        };

        request.onerror = function() {
            reject(Error('There was a network error during authentication.'));
        }

        request.send(params);
    });
}

//IF XHR doesn't work out..
// fetch("https://cas-auth.rpi.edu/cas/login", {
//     method: 'post',
//     headers: {
//         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//     },
//     body: 'username='+username+'&password='+password+'&lt='+logtok+"&execution="+execution+"&_eventId=submit&submit=LOGIN"
// }).then(json)
// .then((data) => {
//     console.log("Request succeeded, here's stuff :)")
// })

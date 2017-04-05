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

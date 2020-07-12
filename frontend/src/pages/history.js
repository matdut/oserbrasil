import createBrowserHistory from 'createBrowserHistory';
const history = createBrowserHistory();
let browseTo=function(somepath){
    history.push({pathname: somepath})
};
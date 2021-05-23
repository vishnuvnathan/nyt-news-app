import React,{useState,useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';

const AuthRouter = ({ component: Component, ...rest }) => {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
	let isLoggedIn = localStorage.getItem('isLoggedIn');
	if(isLoggedIn){
		if(JSON.parse(isLoggedIn)){
		console.log("test");
		setIsAuthenticated(true);
		setLoading(false);
		}
	}
	else{
		setLoading(false)
	}
}, []);

useEffect(() => {
	console.log("---",isAuthenticated,loading);
}, [isAuthenticated])


	if(!loading)
		return (
			<Route
				{...rest}
				render={props => (!isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />)}
			/>
		)
	else	
		return <Loading/>
}

export default AuthRouter

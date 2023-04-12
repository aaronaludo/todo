import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import GuestRoute from './components/routes/GuestRoute';
import PageNotFound from './components/PageNotFound';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect from={'/'} to={'/login'} exact />
				{routes.map(route => {
                        if(route.type === 'authenticated') {
                            return <AuthenticatedRoute {...route} key={route.path} />;
                        }
						
                        if(route.type === 'guest') {
                            return <GuestRoute {...route} key={route.path} />;
                        }
                        
                        return <Route {...route} key={route.path} />;
                    }
                )}
				<Route component={PageNotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;

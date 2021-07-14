// modules
const { useEffect, useState } = require('react');
// functions
const { fetchData } = require('./controllers/apiRoute');
// components
const { Loading } = require('./components/Loading');
const { DataTable } = require('./components/DataTable');
// styles
require('./App.css');
require('semantic-ui-css/semantic.min.css');

export const App = () => {

	const [data, setData] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData().then(res => {
			setData(res);
			setLoading(false);
		});
	}, []);

	return (
		<div className='App'>
			{
				!loading
					? <DataTable data={data} />
					: <Loading />
			}
		</div>
	)
}